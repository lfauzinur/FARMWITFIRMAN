import React from 'react';

export default function AdminKonsultasiPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Manajemen Layanan Konsultasi</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Jadwalkan dan kelola sesi konsultasi pertanian Anda.</p>
      </div>

      <div style={{ backgroundColor: 'white', padding: '3rem 2rem', borderRadius: '0.75rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', backgroundColor: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <span style={{ fontSize: '2rem' }}>📅</span>
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>Sedang dalam Pengembangan</h2>
        <p style={{ color: '#6b7280', maxWidth: '400px', margin: '0 auto' }}>
          Fitur kalender interaktif untuk mengatur jadwal layanan konsultasi dan integrasi booking online akan hadir pada pembaruan sistem berikutnya.
        </p>
      </div>
    </div>
  );
}
