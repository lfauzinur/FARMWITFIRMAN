import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Leaf, Clock, User } from 'lucide-react';

export default async function MemberArticleDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isId = lang === 'id';

  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!article) {
    notFound();
  }

  const title = isId ? article.titleId : article.titleEn;
  const content = isId ? article.contentId : article.contentEn;

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100%', paddingBottom: '3rem' }}>
      
      {/* Header / Back Button */}
      <div style={{ position: 'fixed', top: 0, width: '100%', maxWidth: '480px', padding: '1rem 1.5rem', zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href={`/${lang}/member/artikel`} style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', color: '#0f172a' }}>
          <ChevronLeft size={24} />
        </Link>
      </div>

      {/* Hero Image */}
      <div style={{ width: '100%', height: '250px', backgroundColor: '#f1f5f9', position: 'relative' }}>
        {article.imageUrl ? (
          <img src={article.imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            <Leaf size={60} />
          </div>
        )}
      </div>

      {/* Article Content */}
      <div style={{ padding: '1.5rem', marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 -10px 25px rgba(0,0,0,0.05)' }}>
          
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 1rem 0', lineHeight: 1.3 }}>
            {title}
          </h1>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {article.author && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#64748b', fontSize: '0.75rem' }}>
                <User size={14} />
                <span>{article.author.name}</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#64748b', fontSize: '0.75rem' }}>
              <Clock size={14} />
              <span>{new Date(article.createdAt).toLocaleDateString(isId ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', marginBottom: '1.5rem' }}></div>

          <div style={{ 
            fontSize: '1rem', 
            color: '#334155', 
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap'
          }}>
            {content}
          </div>
          
        </div>
      </div>

    </div>
  );
}
