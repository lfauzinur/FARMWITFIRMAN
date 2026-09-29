import React from 'react';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { User, Phone, MapPin, Mail, Sprout, Map, ChevronRight, Settings, ShieldCheck } from 'lucide-react';
import LogoutButton from '@/components/member/LogoutButton';
import Link from 'next/link';

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isId = lang === 'id';
  const session = await auth();

  if (!session || !session.user.id) {
    redirect(`/${lang}/login`);
  }

  // Fetch user data
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect(`/${lang}/login`);
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%', paddingBottom: '2rem' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: '#10b981', padding: '2rem 1.5rem 4rem 1.5rem', color: 'white', borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem', position: 'relative' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', textAlign: 'center' }}>
          {isId ? 'Profil Saya' : 'My Profile'}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>{user.name}</h2>
            <p style={{ fontSize: '0.875rem', opacity: 0.9, margin: 0 }}>{user.email}</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div style={{ padding: '0 1.5rem', marginTop: '-2rem', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Personal Info */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={16} color="#10b981" />
            {isId ? 'Data Pribadi' : 'Personal Data'}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <Phone size={14} />
              </div>
              <div style={{ flex: 1, borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.625rem', color: '#64748b', marginBottom: '0.25rem' }}>WhatsApp</p>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', margin: 0 }}>{user.phone || '-'}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <MapPin size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.625rem', color: '#64748b', marginBottom: '0.25rem' }}>{isId ? 'Alamat' : 'Address'}</p>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', margin: 0, lineHeight: 1.4 }}>{user.address || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Farming Info */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sprout size={16} color="#10b981" />
            {isId ? 'Profil Pertanian' : 'Farming Profile'}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <Sprout size={14} />
              </div>
              <div style={{ flex: 1, borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.625rem', color: '#64748b', marginBottom: '0.25rem' }}>{isId ? 'Jenis Tani' : 'Farming Type'}</p>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', margin: 0 }}>{user.farmingType || '-'}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <Map size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.625rem', color: '#64748b', marginBottom: '0.25rem' }}>{isId ? 'Luas Lahan' : 'Land Area'}</p>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', margin: 0 }}>{user.landArea || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <Link href="#" style={{ display: 'flex', alignItems: 'center', padding: '1.25rem 1.5rem', textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>
            <Settings size={20} color="#64748b" style={{ marginRight: '1rem' }} />
            <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{isId ? 'Pengaturan Akun' : 'Account Settings'}</span>
            <ChevronRight size={18} color="#cbd5e1" />
          </Link>
          <Link href="#" style={{ display: 'flex', alignItems: 'center', padding: '1.25rem 1.5rem', textDecoration: 'none' }}>
            <ShieldCheck size={20} color="#64748b" style={{ marginRight: '1rem' }} />
            <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{isId ? 'Keamanan & Kata Sandi' : 'Security & Password'}</span>
            <ChevronRight size={18} color="#cbd5e1" />
          </Link>
        </div>

        {/* Logout */}
        <div style={{ marginTop: '1rem' }}>
          <LogoutButton lang={lang} isId={isId} />
        </div>

      </div>
    </div>
  );
}
