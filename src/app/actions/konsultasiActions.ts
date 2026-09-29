'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

async function checkAdmin() {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

// --- Consultation Services ---

export async function getConsultationServices() {
  return prisma.consultationService.findMany({
    orderBy: { price: 'asc' }
  });
}

export async function createConsultationService(formData: FormData) {
  await checkAdmin();
  
  const titleId = formData.get('titleId') as string;
  const slug = titleId.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  await prisma.consultationService.create({
    data: {
      slug,
      titleId,
      titleEn: formData.get('titleEn') as string,
      descriptionId: formData.get('descriptionId') as string,
      descriptionEn: formData.get('descriptionEn') as string,
      durationMinutes: parseInt(formData.get('durationMinutes') as string),
      price: parseFloat(formData.get('price') as string),
    }
  });

  revalidatePath('/[lang]/admin/konsultasi', 'page');
  revalidatePath('/[lang]/layanan', 'page');
}

export async function updateConsultationService(id: string, formData: FormData) {
  await checkAdmin();
  
  await prisma.consultationService.update({
    where: { id },
    data: {
      titleId: formData.get('titleId') as string,
      titleEn: formData.get('titleEn') as string,
      descriptionId: formData.get('descriptionId') as string,
      descriptionEn: formData.get('descriptionEn') as string,
      durationMinutes: parseInt(formData.get('durationMinutes') as string),
      price: parseFloat(formData.get('price') as string),
    }
  });

  revalidatePath('/[lang]/admin/konsultasi', 'page');
  revalidatePath('/[lang]/layanan', 'page');
}

export async function deleteConsultationService(id: string) {
  await checkAdmin();
  // Check if there are bookings
  const bookings = await prisma.booking.count({ where: { serviceId: id } });
  if (bookings > 0) {
    throw new Error('Cannot delete service with existing bookings');
  }
  
  await prisma.consultationService.delete({ where: { id } });
  revalidatePath('/[lang]/admin/konsultasi', 'page');
  revalidatePath('/[lang]/layanan', 'page');
}

// --- Bookings ---

export async function getBookings() {
  return prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true, phone: true }
      },
      service: {
        select: { titleId: true }
      }
    }
  });
}

export async function updateBookingStatus(id: string, status: string, meetLink?: string) {
  await checkAdmin();
  
  await prisma.booking.update({
    where: { id },
    data: { 
      status,
      ...(meetLink !== undefined ? { meetLink } : {})
    }
  });

  revalidatePath('/[lang]/admin/konsultasi', 'page');
}
