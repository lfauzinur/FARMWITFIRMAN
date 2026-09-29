import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Leaf, Clock } from 'lucide-react';

export default async function MemberArticlesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isId = lang === 'id';

  // Fetch articles
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: true,
    }
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%', paddingBottom: '2rem' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
          {isId ? 'Artikel & Blog' : 'Articles & Blog'}
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
          {isId ? 'Info spesial dan panduan pertanian' : 'Special info and farming guides'}
        </p>
      </div>

      {/* Article List */}
      <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#94a3b8' }}>
            <Leaf size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <p style={{ fontSize: '0.875rem' }}>{isId ? 'Belum ada artikel.' : 'No articles yet.'}</p>
          </div>
        ) : (
          articles.map((article) => (
            <Link key={article.id} href={`/${lang}/member/artikel/${article.slug}`} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', height: '160px', backgroundColor: '#f1f5f9', position: 'relative' }}>
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt={isId ? article.titleId : article.titleEn} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <Leaf size={40} />
                  </div>
                )}
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', color: '#64748b', fontSize: '0.75rem' }}>
                  <Clock size={14} />
                  <span>{new Date(article.createdAt).toLocaleDateString(isId ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
                  {isId ? article.titleId : article.titleEn}
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {isId ? article.contentId : article.contentEn}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

    </div>
  );
}
