import React from 'react';
import { getConsultationServices, getBookings } from '@/app/actions/konsultasiActions';
import KonsultasiClient from '@/components/admin/KonsultasiClient';

export default async function AdminKonsultasiPage() {
  const [services, bookings] = await Promise.all([
    getConsultationServices(),
    getBookings()
  ]);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Manajemen Layanan Konsultasi</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Jadwalkan dan kelola sesi konsultasi pertanian Anda.</p>
      </div>

      <KonsultasiClient initialServices={services} initialBookings={bookings} />
    </div>
  );
}
