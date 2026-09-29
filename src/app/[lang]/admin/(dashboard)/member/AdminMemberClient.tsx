'use client';

import React, { useState } from 'react';
import { createMember, updateMember, deleteMember } from '@/app/actions/memberActions';
import { useRouter } from 'next/navigation';
import { Plus, Search, Edit, Trash2, X, Users, Phone, MapPin, Sprout, Mail, Shield } from 'lucide-react';

interface Member {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  farmingType: string | null;
  landArea: string | null;
  memberNumber: string | null;
  points: number;
  level: string;
  createdAt: string;
  _count: { orders: number; bookings: number };
}

export default function AdminMemberClient({ members }: { members: Member[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [search, setSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase();
    return (
      (m.name || '').toLowerCase().includes(q) ||
      (m.email || '').toLowerCase().includes(q) ||
      (m.phone || '').includes(q) ||
      (m.memberNumber || '').includes(q)
    );
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await createMember(formData);
      setShowForm(false);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Gagal menambah member');
    }
    setIsSubmitting(false);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingMember) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await updateMember(editingMember.id, formData);
      setEditingMember(null);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Gagal mengupdate member');
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, name: string | null) => {
    if (!confirm(`Hapus member "${name || 'Tanpa Nama'}"? Data pesanan terkait juga akan terhapus.`)) return;
    try {
      await deleteMember(id);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus member');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', backgroundColor: '#f9fafb',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: '#374151', marginBottom: '0.375rem',
  };

  // Form Modal
  const renderForm = (isEdit: boolean) => (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '2rem' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '1rem', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
            {isEdit ? 'Edit Member' : 'Tambah Member Baru'}
          </h2>
          <button onClick={() => { setShowForm(false); setEditingMember(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
            <X size={20} color="#6b7280" />
          </button>
        </div>
        <form onSubmit={isEdit ? handleUpdate : handleCreate} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Nama *</label>
              <input name="name" required defaultValue={editingMember?.name || ''} style={inputStyle} placeholder="Nama lengkap" />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input name="email" type="email" required defaultValue={editingMember?.email || ''} style={inputStyle} placeholder="email@example.com" />
            </div>
          </div>
          
          {!isEdit && (
            <div>
              <label style={labelStyle}>Password *</label>
              <input name="password" type="password" required minLength={6} style={inputStyle} placeholder="Min. 6 karakter" />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>No. WhatsApp</label>
              <input name="phone" defaultValue={editingMember?.phone || ''} style={inputStyle} placeholder="08xxxxxxxxx" />
            </div>
            <div>
              <label style={labelStyle}>Jenis Tani</label>
              <input name="farmingType" defaultValue={editingMember?.farmingType || ''} style={inputStyle} placeholder="Padi, Sayur, dll" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Alamat</label>
            <textarea name="address" defaultValue={editingMember?.address || ''} rows={2} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Alamat lengkap + Provinsi" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Luas Lahan</label>
              <input name="landArea" defaultValue={editingMember?.landArea || ''} style={inputStyle} placeholder="Contoh: 2 Hektar" />
            </div>
            {isEdit && (
              <div>
                <label style={labelStyle}>Points</label>
                <input name="points" type="number" defaultValue={editingMember?.points || 0} style={inputStyle} />
              </div>
            )}
          </div>

          {isEdit && (
            <div>
              <label style={labelStyle}>Level</label>
              <select name="level" defaultValue={editingMember?.level || 'Pemula'} style={inputStyle}>
                <option value="Pemula">Pemula</option>
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
            <button type="button" onClick={() => { setShowForm(false); setEditingMember(null); }} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Member')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Manajemen Member</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>{members.length} member terdaftar</p>
        </div>
        <button onClick={() => { setEditingMember(null); setShowForm(true); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>
          <Plus size={18} /> Tambah Member
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama, email, no. HP, atau no. member..."
          style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white' }}
        />
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #f3f4f6', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#6b7280', fontWeight: '600' }}>Member</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#6b7280', fontWeight: '600' }}>WhatsApp</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#6b7280', fontWeight: '600' }}>Alamat</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center', color: '#6b7280', fontWeight: '600' }}>Pesanan</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center', color: '#6b7280', fontWeight: '600' }}>Points</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center', color: '#6b7280', fontWeight: '600' }}>Level</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#6b7280', fontWeight: '600' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                    <Users size={32} style={{ margin: '0 auto 0.5rem auto', opacity: 0.5 }} />
                    <p>Tidak ada member ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontWeight: 'bold', fontSize: '0.875rem', flexShrink: 0 }}>
                          {(member.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontWeight: '600', color: '#111827', margin: '0 0 0.125rem 0' }}>{member.name || '-'}</p>
                          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{member.email}</p>
                          <p style={{ fontSize: '0.6875rem', color: '#9ca3af', margin: 0 }}>#{member.memberNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{member.phone || '-'}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151', maxWidth: '200px' }}>
                      <p style={{ margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.8125rem' }}>{member.address || '-'}</p>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <span style={{ padding: '0.25rem 0.625rem', backgroundColor: member._count.orders > 0 ? '#ecfdf5' : '#f3f4f6', color: member._count.orders > 0 ? '#059669' : '#9ca3af', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                        {member._count.orders}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: '600', color: '#6366f1' }}>{member.points}</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <span style={{ padding: '0.25rem 0.625rem', backgroundColor: '#fef3c7', color: '#d97706', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                        {member.level}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => { setEditingMember(member); setShowForm(false); }} style={{ padding: '0.375rem', backgroundColor: '#eff6ff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }}>
                          <Edit size={16} color="#3b82f6" />
                        </button>
                        <button onClick={() => handleDelete(member.id, member.name)} style={{ padding: '0.375rem', backgroundColor: '#fef2f2', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }}>
                          <Trash2 size={16} color="#ef4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && renderForm(false)}
      {editingMember && renderForm(true)}
    </div>
  );
}
