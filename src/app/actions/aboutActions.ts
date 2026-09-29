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

export async function getCompanyProfile() {
  let profile = await prisma.companyProfile.findFirst();
  if (!profile) {
    profile = await prisma.companyProfile.create({
      data: {}
    });
  }
  return profile;
}

export async function updateCompanyProfile(formData: FormData) {
  await checkAdmin();
  
  const id = formData.get('id') as string;
  const data = {
    storyTitleId: formData.get('storyTitleId') as string,
    storyTitleEn: formData.get('storyTitleEn') as string,
    storyP1Id: formData.get('storyP1Id') as string,
    storyP1En: formData.get('storyP1En') as string,
    storyP2Id: formData.get('storyP2Id') as string,
    storyP2En: formData.get('storyP2En') as string,
    visionId: formData.get('visionId') as string,
    visionEn: formData.get('visionEn') as string,
    mission1Id: formData.get('mission1Id') as string,
    mission1En: formData.get('mission1En') as string,
    mission2Id: formData.get('mission2Id') as string,
    mission2En: formData.get('mission2En') as string,
    mission3Id: formData.get('mission3Id') as string,
    mission3En: formData.get('mission3En') as string,
    mission4Id: formData.get('mission4Id') as string,
    mission4En: formData.get('mission4En') as string,
  };

  await prisma.companyProfile.update({
    where: { id },
    data
  });

  revalidatePath('/[lang]/tentang', 'page');
  revalidatePath('/[lang]/admin/tentang', 'page');
}

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createTeamMember(formData: FormData) {
  await checkAdmin();
  
  await prisma.teamMember.create({
    data: {
      name: formData.get('name') as string,
      roleId: formData.get('roleId') as string,
      roleEn: formData.get('roleEn') as string,
      bioId: formData.get('bioId') as string,
      bioEn: formData.get('bioEn') as string,
      isActive: formData.get('isActive') === 'on',
    }
  });

  revalidatePath('/[lang]/tentang', 'page');
  revalidatePath('/[lang]/admin/tentang', 'page');
}

export async function updateTeamMember(id: string, formData: FormData) {
  await checkAdmin();
  
  await prisma.teamMember.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      roleId: formData.get('roleId') as string,
      roleEn: formData.get('roleEn') as string,
      bioId: formData.get('bioId') as string,
      bioEn: formData.get('bioEn') as string,
      isActive: formData.get('isActive') === 'on',
    }
  });

  revalidatePath('/[lang]/tentang', 'page');
  revalidatePath('/[lang]/admin/tentang', 'page');
}

export async function deleteTeamMember(id: string) {
  await checkAdmin();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath('/[lang]/tentang', 'page');
  revalidatePath('/[lang]/admin/tentang', 'page');
}
