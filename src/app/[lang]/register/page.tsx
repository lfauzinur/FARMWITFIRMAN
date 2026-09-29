'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerMember } from '@/app/actions/authActions';
import { Leaf, User, Mail, Lock, Phone, MapPin, Sprout, Map } from 'lucide-react';

export default function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
  const router = useRouter();
  const { lang } = React.use(params);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await registerMember(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push(`/${lang}/login?registered=true`);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f7f6', padding: '1rem' }}>
      <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', width: '100%', maxWidth: '400px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: '#ecfdf5', borderRadius: '50%', marginBottom: '1rem' }}>
            <Leaf size={24} color="#10b981" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Daftar Member</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>Bergabung untuk kumpulkan poin & reward.</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Nama Lengkap</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" name="name" required style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} placeholder="John Doe" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="email" name="email" required style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} placeholder="john@example.com" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="password" name="password" required style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} placeholder="••••••••" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>No. WhatsApp</label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" name="phone" required style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} placeholder="081234567890" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Alamat Lengkap (Beserta Provinsi)</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <textarea name="address" required rows={3} style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem', resize: 'vertical' }} placeholder="Jl. Sudirman No. 1, Jawa Barat..."></textarea>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Bertani Apa? <span style={{ color: '#9ca3af', fontWeight: 'normal' }}>(Opsional)</span></label>
              <div style={{ position: 'relative' }}>
                <Sprout size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="text" name="farmingType" style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} placeholder="Padi, Cabai, dll" />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Luas Lahan <span style={{ color: '#9ca3af', fontWeight: 'normal' }}>(Opsional)</span></label>
              <div style={{ position: 'relative' }}>
                <Map size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="text" name="landArea" style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} placeholder="1 Hektar" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#10b981', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
          Sudah punya akun? <Link href={`/${lang}/login`} style={{ color: '#10b981', fontWeight: '600', textDecoration: 'none' }}>Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
}
