import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Construction } from 'lucide-react';

export default async function TeamManagerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

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

      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '1rem', 
        padding: '4rem 2rem', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1px dashed #d1d5db'
      }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Construction size={40} color="#9ca3af" />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Fitur Sedang Dalam Pengembangan</h2>
        <p style={{ color: '#6b7280', maxWidth: '400px' }}>
          Modul untuk menambah, mengedit, dan menghapus anggota tim sedang dibangun. Silakan cek kembali pada pembaruan berikutnya!
        </p>
        <Link 
          href={`/${lang}/admin/tentang`}
          style={{ 
            marginTop: '2rem', 
            padding: '0.5rem 1.5rem', 
            backgroundColor: 'var(--color-primary)', 
            color: 'white', 
            borderRadius: '0.5rem', 
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          Kembali ke Pengaturan
        </Link>
      </div>
    </div>
  );
}
