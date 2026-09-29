'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

// Middleware to check admin session
async function checkAdmin() {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------

export async function getCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { products: true } } }
  });
}

export async function createCategory(formData: FormData) {
  await checkAdmin();
  
  const nameId = formData.get('nameId') as string;
  const nameEn = formData.get('nameEn') as string;
  const slug = nameId.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  await prisma.category.create({
    data: { nameId, nameEn, slug },
  });

  revalidatePath('/id/admin/kategori');
  revalidatePath('/id/produk');
}

export async function deleteCategory(id: string) {
  await checkAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePath('/id/admin/kategori');
  revalidatePath('/id/produk');
}

// ---------------------------------------------------------------------------
// PRODUCTS
// ---------------------------------------------------------------------------

export async function getProducts() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function createProduct(formData: FormData) {
  await checkAdmin();
  
  const nameId = formData.get('nameId') as string;
  const nameEn = formData.get('nameEn') as string;
  const descriptionId = formData.get('descriptionId') as string;
  const descriptionEn = formData.get('descriptionEn') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);
  const categoryId = formData.get('categoryId') as string;
  const imageUrl = formData.get('imageUrl') as string;
  
  const slug = nameId.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  await prisma.product.create({
    data: {
      nameId, nameEn, descriptionId, descriptionEn, price, stock,
      categoryId: categoryId || null,
      imageUrl: imageUrl || null,
      slug
    },
  });

  revalidatePath('/id/admin/produk');
  revalidatePath('/id/produk');
}

export async function deleteProduct(id: string) {
  await checkAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath('/id/admin/produk');
  revalidatePath('/id/produk');
}

// ---------------------------------------------------------------------------
// VIDEO TESTIMONIALS
// ---------------------------------------------------------------------------

export async function getVideoTestimonials() {
  return prisma.videoTestimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createVideoTestimonial(formData: FormData) {
  await checkAdmin();
  
  const titleId = formData.get('titleId') as string;
  const titleEn = formData.get('titleEn') as string;
  const platform = formData.get('platform') as string;
  const videoUrl = formData.get('videoUrl') as string;
  
  await prisma.videoTestimonial.create({
    data: { titleId, titleEn, platform, videoUrl },
  });

  revalidatePath('/id/admin/testimoni');
  revalidatePath('/id');
}

export async function deleteVideoTestimonial(id: string) {
  await checkAdmin();
  await prisma.videoTestimonial.delete({ where: { id } });
  revalidatePath('/id/admin/testimoni');
  revalidatePath('/id');
}
