import React from 'react';
import { getArticles, deleteArticle } from '@/app/actions/articleActions';
import AdminArtikelClient from './AdminArtikelClient';
import { auth } from '@/auth';
import { Trash2, Image as ImageIcon } from 'lucide-react';

export default async function AdminArtikelPage() {
  const session = await auth();
  const articles = await getArticles();

  return (
    <div style={{ padding: '1rem' }}>
      
      {/* New Article Editor matching the design */}
      <AdminArtikelClient 
        articles={JSON.parse(JSON.stringify(articles))} 
        authorId={session?.user?.id || ''} 
      />

      {/* Existing Articles Table (kept for functionality) */}
      <div style={{ marginTop: '4rem', maxWidth: '1200px', margin: '4rem auto 0 auto' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Existing Articles</h2>
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', width: '50px' }}>Img</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Judul</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tanggal</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#f1f5f9', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {article.imageUrl ? (
                        <img src={article.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <ImageIcon size={16} color="#94a3b8" />
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: '500' }}>
                    {article.titleId}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                    {new Date(article.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <form action={async () => { 'use server'; await deleteArticle(article.id); }}>
                      <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', backgroundColor: '#fef2f2', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.375rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>Belum ada artikel.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
