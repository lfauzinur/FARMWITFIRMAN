import React, { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const session = await auth();

  // Basic auth check
  if (!session || session.user.role !== 'ADMIN') {
    redirect(`/${lang}/admin/login`);
  }

  return (
    <AdminLayoutClient 
      sidebar={<AdminSidebar lang={lang} />}
      topbar={<AdminTopbar userName={session.user.name} />}
    >
      {children}
    </AdminLayoutClient>
  );
}
