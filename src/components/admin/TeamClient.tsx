'use client';

import React, { useState } from 'react';
import { createTeamMember, updateTeamMember, deleteTeamMember } from '@/app/actions/aboutActions';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TeamClient({ initialTeams, lang }: { initialTeams: any[], lang: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOpenModal = (team: any = null) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTeam(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (editingTeam) {
        await updateTeamMember(editingTeam.id, formData);
      } else {
        await createTeamMember(formData);
      }
      handleCloseModal();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus anggota tim ini?')) {
      setIsLoading(true);
      try {
        await deleteTeamMember(id);
        router.refresh();
      } catch (error) {
        console.error(error);
        alert('Gagal menghapus');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => handleOpenModal()}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          <Plus size={18} /> Tambah Anggota
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Nama</th>
              <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Peran (ID)</th>
              <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
              <th style={{ padding: '1rem', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {initialTeams.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>Belum ada anggota tim</td>
              </tr>
            ) : (
              initialTeams.map(team => (
                <tr key={team.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{team.name}</td>
                  <td style={{ padding: '1rem', color: '#4b5563' }}>{team.roleId}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', backgroundColor: team.isActive ? '#d1fae5' : '#fee2e2', color: team.isActive ? '#059669' : '#dc2626', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                      {team.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => handleOpenModal(team)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', marginRight: '1rem' }} disabled={isLoading}>
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(team.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }} disabled={isLoading}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '1rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative' }}>
            <button onClick={handleCloseModal} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} color="#6b7280" />
            </button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>{editingTeam ? 'Edit Tim' : 'Tambah Tim'}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Nama</label>
                <input required name="name" defaultValue={editingTeam?.name} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Peran (ID)</label>
                  <input required name="roleId" defaultValue={editingTeam?.roleId} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Role (EN)</label>
                  <input required name="roleEn" defaultValue={editingTeam?.roleEn} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Bio (ID)</label>
                  <textarea required name="bioId" defaultValue={editingTeam?.bioId} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', minHeight: '100px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Bio (EN)</label>
                  <textarea required name="bioEn" defaultValue={editingTeam?.bioEn} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', minHeight: '100px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="isActive" defaultChecked={editingTeam ? editingTeam.isActive : true} />
                  <span>Aktif (Tampilkan di halaman)</span>
                </label>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: '0.75rem 1.5rem', border: '1px solid #d1d5db', background: 'white', borderRadius: '0.5rem', cursor: 'pointer' }}>Batal</button>
                <button type="submit" disabled={isLoading} style={{ padding: '0.75rem 1.5rem', border: 'none', background: '#10b981', color: 'white', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
                  {isLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
