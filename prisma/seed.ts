import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Admin User
  const adminEmail = 'admin@farmwitfirman.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user created successfully.');
  }

  // 2. Categories
  const category1 = await prisma.category.upsert({
    where: { slug: 'pertanian-fisik' },
    update: {},
    create: {
      slug: 'pertanian-fisik',
      nameId: 'Pertanian Fisik',
      nameEn: 'Physical Agriculture',
    },
  });

  await prisma.videoTestimonial.deleteMany({});
  
  await prisma.videoTestimonial.createMany({
    data: [
      {
        platform: 'TIKTOK',
        videoUrl: 'https://tiktok.com/@senimanpertanian/video/7380...',
        thumbnailUrl: 'https://images.unsplash.com/photo-1592982537447-6f296d1947b0?q=80&w=600',
        category: 'TESTIMONI',
        titleId: 'Testimoni Petani: Metode Buku Sakti',
        titleEn: 'Farmer Testimonial: Magic Book Method',
      },
      {
        platform: 'TIKTOK',
        videoUrl: 'https://tiktok.com',
        thumbnailUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=600',
        category: 'FOR YOU PAGE',
        titleId: 'Lahan Cabai Terlebat',
        titleEn: 'Thickest Chili Field',
      },
      {
        platform: 'TIKTOK',
        videoUrl: 'https://tiktok.com',
        thumbnailUrl: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=600',
        category: 'LAHAN',
        titleId: 'Uji Nyali Tanam Cabai di Daerah Endemik!',
        titleEn: 'Brave Chili Planting in Endemic Areas!',
      },
      {
        platform: 'YOUTUBE',
        videoUrl: 'https://youtube.com',
        thumbnailUrl: 'https://images.unsplash.com/photo-1598442037996-2489e27c1cb0?q=80&w=600',
        category: 'PAK KYAI',
        titleId: 'Pak Kyai Tanam Cabai dengan Metode Buku Sakti',
        titleEn: 'Pak Kyai Plants Chili with Magic Book Method',
      }
    ]
  });

  console.log('✅ Categories, Products, and Videos seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
