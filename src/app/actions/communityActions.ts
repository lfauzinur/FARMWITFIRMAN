'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitCommunityRegistration(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const commodity = formData.get('commodity') as string;
  const avgHarvestPerSeason = formData.get('avgHarvestPerSeason') as string;
  const harvestUnit = formData.get('harvestUnit') as string;
  const totalLandArea = formData.get('totalLandArea') as string;
  const landUnit = formData.get('landUnit') as string;

  // Collect checkbox values
  const marketingChannels: string[] = [];
  if (formData.get('tengkulak')) marketingChannels.push('Tengkulak');
  if (formData.get('pasar_tradisional')) marketingChannels.push('Pasar Tradisional');
  if (formData.get('koperasi_kud')) marketingChannels.push('Koperasi/KUD');
  if (formData.get('dikonsumsi_sendiri')) marketingChannels.push('Dikonsumsi Sendiri');

  if (!fullName || !phone || !address || !commodity || !avgHarvestPerSeason || !totalLandArea) {
    throw new Error('Semua kolom wajib diisi');
  }

  if (marketingChannels.length === 0) {
    throw new Error('Pilih minimal satu sistem pemasaran');
  }

  await prisma.communityRegistration.create({
    data: {
      fullName,
      phone,
      address,
      commodity,
      avgHarvestPerSeason,
      harvestUnit: harvestUnit || 'Ton',
      marketingChannels: marketingChannels.join(','),
      totalLandArea,
      landUnit: landUnit || 'Ha',
    }
  });

  revalidatePath('/[lang]/admin/konsultasi', 'page');
  
  return { success: true };
}

export async function getCommunityRegistrations() {
  return prisma.communityRegistration.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateRegistrationStatus(id: string, status: string) {
  await prisma.communityRegistration.update({
    where: { id },
    data: { status }
  });
  revalidatePath('/[lang]/admin/konsultasi', 'page');
}

export async function deleteRegistration(id: string) {
  await prisma.communityRegistration.delete({ where: { id } });
  revalidatePath('/[lang]/admin/konsultasi', 'page');
}
