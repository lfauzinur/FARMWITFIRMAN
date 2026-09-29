import React from 'react';
import { getVideoTestimonials, createVideoTestimonial, deleteVideoTestimonial } from '@/app/actions/adminActions';
import { Plus, Trash2, PlaySquare, Camera, Video as VideoIcon } from 'lucide-react';

export default async function AdminTestimoniPage() {
  const testimonials = await getVideoTestimonials();

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YOUTUBE': return <PlaySquare size={16} color="#ef4444" />;
      case 'INSTAGRAM': return <Camera size={16} color="#d946ef" />;
      default: return <VideoIcon size={16} color="#000000" />; // TikTok placeholder
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Manajemen Video Testimoni</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Kelola galeri video ulasan dari pelanggan Anda.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem', alignItems: 'start' }}>
        {/* Create Form Card */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.25rem', color: '#111827' }}>Tambah Video Baru</h2>
          <form action={createVideoTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Judul (Indonesia)</label>
              <input type="text" name="titleId" required style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Judul (Inggris)</label>
              <input type="text" name="titleEn" required style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Platform</label>
              <select name="platform" style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', backgroundColor: 'white', outline: 'none', fontSize: '0.875rem' }}>
                <option value="YOUTUBE">YouTube</option>
                <option value="TIKTOK">TikTok</option>
                <option value="INSTAGRAM">Instagram</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>URL Video / ID Embed</label>
              <input type="text" name="videoUrl" required placeholder="https://www.youtube.com/embed/..." style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.375rem', lineHeight: 1.4 }}>Untuk YouTube, gunakan link embed. (contoh: https://www.youtube.com/embed/dQw4w9WgXcQ)</p>
            </div>
            <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: '#10b981', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem', transition: 'background-color 0.2s' }}>
              <Plus size={18} />
              Simpan Video
            </button>
          </form>
        </div>

        {/* Data Table Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>Daftar Video</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Judul Video</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>URL</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testi) => (
                <tr key={testi.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', borderRadius: '9999px', backgroundColor: '#f3f4f6', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>
                      {getPlatformIcon(testi.platform)}
                      {testi.platform}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>{testi.titleId}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <a href={testi.videoUrl} target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: '500' }}>Buka Link ↗</a>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <form action={async () => { 'use server'; await deleteVideoTestimonial(testi.id); }}>
                      <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', backgroundColor: '#fef2f2', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.375rem', transition: 'background-color 0.2s' }}>
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>Belum ada video testimoni.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
