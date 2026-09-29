'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getArticles() {
  return await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });
}

export async function createArticle(formData: FormData) {
  const titleId = formData.get('titleId') as string;
  const titleEn = formData.get('titleEn') as string;
  const contentId = formData.get('contentId') as string;
  const contentEn = formData.get('contentEn') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const authorId = formData.get('authorId') as string;

  const slug = titleId.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  await prisma.article.create({
    data: {
      titleId,
      titleEn,
      contentId,
      contentEn,
      imageUrl,
      slug,
      authorId
    }
  });

  revalidatePath('/[lang]/admin/artikel', 'page');
  revalidatePath('/[lang]/member', 'page');
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({
    where: { id }
  });

  revalidatePath('/[lang]/admin/artikel', 'page');
  revalidatePath('/[lang]/member', 'page');
}
