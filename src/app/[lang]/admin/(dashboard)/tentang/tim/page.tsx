import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getTeamMembers } from '@/app/actions/aboutActions';
import TeamClient from '@/components/admin/TeamClient';

export default async function TeamManagerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const teamMembers = await getTeamMembers();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href={`/${lang}/admin/tentang`} style={{ color: '#6b7280', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Manajemen Tim</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Kelola anggota tim Anda</p>
        </div>
      </div>

      <TeamClient initialTeams={teamMembers} lang={lang} />
    </div>
  );
}
