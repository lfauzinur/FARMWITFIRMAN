import React from 'react';
import { getProducts, getCategories, createProduct, deleteProduct } from '@/app/actions/adminActions';
import Image from 'next/image';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export default async function AdminProdukPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Manajemen Produk</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Kelola inventaris dan katalog produk toko Anda.</p>
      </div>

      {/* Create Form Card */}
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>Tambah Produk Baru</h2>
        <form action={createProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Nama Produk (Indonesia)</label>
              <input type="text" name="nameId" required style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Deskripsi (Indonesia)</label>
              <textarea name="descriptionId" rows={3} required style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem', resize: 'vertical' }}></textarea>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Kategori</label>
              <select name="categoryId" style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', backgroundColor: 'white', outline: 'none', fontSize: '0.875rem' }}>
                <option value="">Pilih Kategori...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nameId}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Product Name (English)</label>
              <input type="text" name="nameEn" required style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Description (English)</label>
              <textarea name="descriptionEn" rows={3} required style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem', resize: 'vertical' }}></textarea>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Harga (Rp)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '0.875rem' }}>Rp</span>
                  <input type="number" name="price" required min="0" style={{ width: '100%', padding: '0.625rem 0.875rem 0.625rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Stok</label>
                <input type="number" name="stock" required min="0" style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
              </div>
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>URL Gambar Produk (Opsional)</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input type="url" name="imageUrl" placeholder="https://example.com/image.png" style={{ flex: 1, padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.875rem' }} />
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
            <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#10b981', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}>
              <Plus size={18} />
              Simpan Produk
            </button>
          </div>
        </form>
      </div>

      {/* Data Table Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>Daftar Produk</h2>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', width: '60px' }}>Img</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Produk</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kategori</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Harga</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Stok</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', overflow: 'hidden', position: 'relative', border: '1px solid #e5e7eb' }}>
                    {prod.imageUrl ? (
                      <Image src={prod.imageUrl} alt={prod.nameId} fill style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageIcon size={20} color="#9ca3af" />
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                  <div style={{ fontWeight: '600', color: '#111827' }}>{prod.nameId}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>{prod.slug}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                  <span style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500' }}>
                    {prod.category?.nameId || 'Tanpa Kategori'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                  Rp {prod.price.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
                  <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: prod.stock > 0 ? '#ecfdf5' : '#fef2f2', color: prod.stock > 0 ? '#047857' : '#b91c1c', fontSize: '0.75rem', fontWeight: '600' }}>
                    {prod.stock}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <form action={async () => { 'use server'; await deleteProduct(prod.id); }}>
                    <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', backgroundColor: '#fef2f2', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.375rem', transition: 'background-color 0.2s' }}>
                      <Trash2 size={16} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>Belum ada produk.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
