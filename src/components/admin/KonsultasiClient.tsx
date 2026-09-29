'use client';

import React, { useState } from 'react';
import { createConsultationService, updateConsultationService, deleteConsultationService, updateBookingStatus } from '@/app/actions/konsultasiActions';
import { Plus, Edit2, Trash2, Calendar, Link as LinkIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function KonsultasiClient({ 
  initialServices, 
  initialBookings 
}: { 
  initialServices: any[], 
  initialBookings: any[] 
}) {
  const [activeTab, setActiveTab] = useState<'SERVICES' | 'BOOKINGS'>('SERVICES');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<any>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // --- Services Handlers ---
  const handleOpenServiceModal = (service: any = null) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleCloseServiceModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleServiceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (editingService) {
        await updateConsultationService(editingService.id, formData);
      } else {
        await createConsultationService(formData);
      }
      handleCloseServiceModal();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus layanan ini? Pastikan tidak ada booking aktif.')) {
      setIsLoading(true);
      try {
        await deleteConsultationService(id);
        router.refresh();
      } catch (error: any) {
        alert(error.message || 'Gagal menghapus');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // --- Bookings Handlers ---
  const handleOpenBookingModal = (booking: any) => {
    setEditingBooking(booking);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const status = formData.get('status') as string;
    const meetLink = formData.get('meetLink') as string;
    
    try {
      await updateBookingStatus(editingBooking.id, status, meetLink);
      setIsBookingModalOpen(false);
      setEditingBooking(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Gagal memperbarui status');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { color: string; bg: string; label: string }> = {
      'PENDING': { color: '#ca8a04', bg: '#fef9c3', label: 'Menunggu' },
      'CONFIRMED': { color: '#2563eb', bg: '#dbeafe', label: 'Dikonfirmasi' },
      'COMPLETED': { color: '#059669', bg: '#d1fae5', label: 'Selesai' },
      'CANCELLED': { color: '#dc2626', bg: '#fee2e2', label: 'Batal' },
    };
    return map[status] || { color: '#6b7280', bg: '#f3f4f6', label: status };
  };

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setActiveTab('SERVICES')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'SERVICES' ? '2px solid #10b981' : '2px solid transparent',
            color: activeTab === 'SERVICES' ? '#10b981' : '#6b7280',
            fontWeight: activeTab === 'SERVICES' ? '600' : '500',
            cursor: 'pointer'
          }}
        >
          Paket Layanan
        </button>
        <button 
          onClick={() => setActiveTab('BOOKINGS')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'BOOKINGS' ? '2px solid #10b981' : '2px solid transparent',
            color: activeTab === 'BOOKINGS' ? '#10b981' : '#6b7280',
            fontWeight: activeTab === 'BOOKINGS' ? '600' : '500',
            cursor: 'pointer'
          }}
        >
          Daftar Booking
        </button>
      </div>

      {activeTab === 'SERVICES' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <button 
              onClick={() => handleOpenServiceModal()}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
            >
              <Plus size={18} /> Tambah Layanan
            </button>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #e5e7eb', overflow: 'hidden', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Layanan</th>
                  <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Durasi</th>
                  <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Harga</th>
                  <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {initialServices.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>Belum ada layanan</td></tr>
                ) : (
                  initialServices.map(svc => (
                    <tr key={svc.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem', fontWeight: '500' }}>{svc.titleId}</td>
                      <td style={{ padding: '1rem', color: '#4b5563' }}>{svc.durationMinutes} Menit</td>
                      <td style={{ padding: '1rem', color: '#10b981', fontWeight: '600' }}>Rp {svc.price.toLocaleString('id-ID')}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button onClick={() => handleOpenServiceModal(svc)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', marginRight: '1rem' }} disabled={isLoading}>
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleServiceDelete(svc.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }} disabled={isLoading}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'BOOKINGS' && (
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #e5e7eb', overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Klien</th>
                <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Layanan</th>
                <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Jadwal</th>
                <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
                <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {initialBookings.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>Belum ada booking</td></tr>
              ) : (
                initialBookings.map(b => {
                  const badge = getStatusBadge(b.status);
                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem' }}>
                        <p style={{ margin: 0, fontWeight: '600' }}>{b.user?.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{b.user?.phone || b.user?.email}</p>
                      </td>
                      <td style={{ padding: '1rem', color: '#4b5563' }}>{b.service?.titleId}</td>
                      <td style={{ padding: '1rem', color: '#4b5563' }}>
                        {new Date(b.dateTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.25rem 0.75rem', backgroundColor: badge.bg, color: badge.color, borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                          {badge.label}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleOpenBookingModal(b)} 
                          style={{ padding: '0.375rem 0.75rem', backgroundColor: '#eef2ff', color: '#4f46e5', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                        >
                          Kelola
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Layanan */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '1rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative' }}>
            <button type="button" onClick={handleCloseServiceModal} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} color="#6b7280" />
            </button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>{editingService ? 'Edit Layanan' : 'Tambah Layanan'}</h2>
            
            <form onSubmit={handleServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Judul (ID)</label>
                  <input required name="titleId" defaultValue={editingService?.titleId} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Judul (EN)</label>
                  <input required name="titleEn" defaultValue={editingService?.titleEn} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Durasi (Menit)</label>
                  <input required type="number" name="durationMinutes" defaultValue={editingService?.durationMinutes || 60} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Harga (Rp)</label>
                  <input required type="number" name="price" defaultValue={editingService?.price} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Deskripsi (ID)</label>
                  <textarea required name="descriptionId" defaultValue={editingService?.descriptionId} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', minHeight: '100px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Deskripsi (EN)</label>
                  <textarea required name="descriptionEn" defaultValue={editingService?.descriptionEn} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', minHeight: '100px' }} />
                </div>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={handleCloseServiceModal} style={{ padding: '0.75rem 1.5rem', border: '1px solid #d1d5db', background: 'white', borderRadius: '0.5rem', cursor: 'pointer' }}>Batal</button>
                <button type="submit" disabled={isLoading} style={{ padding: '0.75rem 1.5rem', border: 'none', background: '#10b981', color: 'white', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
                  {isLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Booking */}
      {isBookingModalOpen && editingBooking && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '1rem', width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative' }}>
            <button type="button" onClick={() => setIsBookingModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} color="#6b7280" />
            </button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Kelola Booking</h2>
            
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem' }}><strong>Klien:</strong> {editingBooking.user?.name} ({editingBooking.user?.phone})</p>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem' }}><strong>Layanan:</strong> {editingBooking.service?.titleId}</p>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem' }}><strong>Jadwal:</strong> {new Date(editingBooking.dateTime).toLocaleString('id-ID')}</p>
              {editingBooking.notes && <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>Catatan:</strong> {editingBooking.notes}</p>}
            </div>

            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Status</label>
                <select name="status" defaultValue={editingBooking.status} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: 'white' }}>
                  <option value="PENDING">Menunggu (PENDING)</option>
                  <option value="CONFIRMED">Dikonfirmasi (CONFIRMED)</option>
                  <option value="COMPLETED">Selesai (COMPLETED)</option>
                  <option value="CANCELLED">Dibatalkan (CANCELLED)</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Link Meeting (Opsional)</label>
                <input name="meetLink" defaultValue={editingBooking.meetLink || ''} placeholder="https://meet.google.com/..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setIsBookingModalOpen(false)} style={{ padding: '0.75rem 1.5rem', border: '1px solid #d1d5db', background: 'white', borderRadius: '0.5rem', cursor: 'pointer' }}>Batal</button>
                <button type="submit" disabled={isLoading} style={{ padding: '0.75rem 1.5rem', border: 'none', background: '#10b981', color: 'white', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
                  {isLoading ? 'Menyimpan...' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
