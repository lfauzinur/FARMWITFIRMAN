import React, { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'var(--font-inter), sans-serif' }}>
      
      <AdminSidebar lang={lang} />
      
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <AdminTopbar userName={session.user.name} />
        
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </div>

    </div>
  );
}
