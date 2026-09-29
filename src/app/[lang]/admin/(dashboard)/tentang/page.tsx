import React from 'react';
import Link from 'next/link';
import { getCompanyProfile, getTeamMembers } from '@/app/actions/aboutActions';
import CompanyProfileForm from '@/components/admin/CompanyProfileForm';

export const metadata = {
  title: 'CMS - Tentang Kami',
};

export default async function AdminTentangPage({ params }: { params: Promise<{ lang: string }> }) {
  await params; // Await params to avoid dynamic route errors
  const profileRaw = await getCompanyProfile();
  const profile = JSON.parse(JSON.stringify(profileRaw)); // Ensure it's a plain JSON object
  const teamMembers = await getTeamMembers();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Profil Perusahaan</h1>
        <p style={{ color: '#6b7280' }}>Kelola konten untuk halaman Tentang Kami (About Us).</p>
      </div>

      <CompanyProfileForm profile={profile} />

      {/* Placeholder untuk Team Management (Bisa dikembangkan nanti) */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Manajemen Tim</h2>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Saat ini tim berjumlah {teamMembers.length} orang. Fitur tambah/edit tim dapat ditambahkan di sini.</p>
        <Link 
          href={`/${lang}/admin/tentang/tim`}
          style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem', 
            background: '#e5e7eb', 
            color: '#111827',
            borderRadius: '0.5rem', 
            border: 'none', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
        >
          + Manajemen Tim
        </Link>
      </div>
    </div>
  );
}
