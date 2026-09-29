import React from 'react';
import { getCategories, createCategory, deleteCategory } from '@/app/actions/adminActions';
import { Plus, Trash2 } from 'lucide-react';

export default async function AdminKategoriPage() {
  const categories = await getCategories();

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Manajemen Kategori</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Kelola kategori produk pertanian Anda.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem', alignItems: 'start' }}>
        {/* Create Form Card */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.25rem', color: '#111827' }}>Tambah Kategori</h2>
          <form action={createCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Nama (Indonesia)</label>
              <input type="text" name="nameId" required style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Nama (Inggris)</label>
              <input type="text" name="nameEn" required style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
            </div>
            <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: '#10b981', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>
              <Plus size={18} />
              Simpan Kategori
            </button>
          </form>
        </div>

        {/* Data Table Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>Daftar Kategori</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID Kategori (Slug)</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nama (ID / EN)</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Jml Produk</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>{cat.slug}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#111827' }}>{cat.nameId} <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>/ {cat.nameEn}</span></td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
                    <span style={{ backgroundColor: '#ecfdf5', color: '#047857', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: '600' }}>
                      {cat._count.products}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <form action={async () => { 'use server'; await deleteCategory(cat.id); }}>
                      <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', backgroundColor: '#fef2f2', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.375rem', transition: 'background-color 0.2s' }}>
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>Belum ada kategori.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
