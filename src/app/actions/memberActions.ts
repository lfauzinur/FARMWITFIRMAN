'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import bcrypt from 'bcryptjs';

// Middleware to check admin session
async function checkAdmin() {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

// ---------------------------------------------------------------------------
// GET ALL MEMBERS
// ---------------------------------------------------------------------------

export async function getMembers() {
  return prisma.user.findMany({
    where: { role: 'USER' },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { orders: true, bookings: true } }
    }
  });
}

// ---------------------------------------------------------------------------
// CREATE MEMBER (Admin-side)
// ---------------------------------------------------------------------------

export async function createMember(formData: FormData) {
  await checkAdmin();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const farmingType = formData.get('farmingType') as string;
  const landArea = formData.get('landArea') as string;

  if (!name || !email || !password) {
    throw new Error('Nama, email dan password wajib diisi.');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('Email sudah terdaftar.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const memberNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      address: address || null,
      farmingType: farmingType || null,
      landArea: landArea || null,
      role: 'USER',
      memberNumber,
      points: 0,
      level: 'Pemula',
    },
  });

  revalidatePath('/id/admin/member');
  revalidatePath('/id/admin');
}

// ---------------------------------------------------------------------------
// UPDATE MEMBER
// ---------------------------------------------------------------------------

export async function updateMember(id: string, formData: FormData) {
  await checkAdmin();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const farmingType = formData.get('farmingType') as string;
  const landArea = formData.get('landArea') as string;
  const points = parseInt(formData.get('points') as string, 10) || 0;
  const level = formData.get('level') as string;

  await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      phone: phone || null,
      address: address || null,
      farmingType: farmingType || null,
      landArea: landArea || null,
      points,
      level: level || 'Pemula',
    },
  });

  revalidatePath('/id/admin/member');
  revalidatePath('/id/admin');
}

// ---------------------------------------------------------------------------
// DELETE MEMBER
// ---------------------------------------------------------------------------

export async function deleteMember(id: string) {
  await checkAdmin();
  await prisma.user.delete({ where: { id } });
  revalidatePath('/id/admin/member');
  revalidatePath('/id/admin');
}

// ---------------------------------------------------------------------------
// ORDERS MANAGEMENT
// ---------------------------------------------------------------------------

export async function getOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      items: { include: { product: true } },
    }
  });
}

export async function updateOrderStatus(id: string, status: string) {
  await checkAdmin();
  await prisma.order.update({
    where: { id },
    data: { status },
  });
  revalidatePath('/id/admin/pesanan');
  revalidatePath('/id/admin');
}

export async function deleteOrder(id: string) {
  await checkAdmin();
  // Delete order items first
  await prisma.orderItem.deleteMany({ where: { orderId: id } });
  await prisma.order.delete({ where: { id } });
  revalidatePath('/id/admin/pesanan');
  revalidatePath('/id/admin');
}
