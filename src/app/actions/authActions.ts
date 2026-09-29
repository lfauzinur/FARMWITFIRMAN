'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn, signOut } from '@/auth';

export async function registerMember(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const farmingType = formData.get('farmingType') as string;
  const landArea = formData.get('landArea') as string;

  if (!name || !email || !password || !phone || !address) {
    return { error: 'Semua kolom wajib diisi (kecuali opsi Opsional).' };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'Email sudah terdaftar.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const memberNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10 digit random number

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        farmingType,
        landArea,
        role: 'USER',
        memberNumber,
        points: 0,
        level: 'Pemula',
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { error: `Kesalahan sistem: ${error?.message || 'Gagal mendaftar'}` };
  }
}

export async function loginMember(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Attempt sign in via NextAuth
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    
    // signIn will throw on successful navigation if redirect is true,
    // but with redirect: false it returns the result (or throws an AuthError on failure)
    
    return { success: true };
  } catch (error: any) {
    // If it's a valid redirect (Next.js NEXT_REDIRECT error), allow it to propagate
    if (error.message === 'NEXT_REDIRECT') {
      throw error; 
    }
    return { error: 'Email atau password salah.' };
  }
}

export async function logoutMember() {
  await signOut({ redirect: false });
}
