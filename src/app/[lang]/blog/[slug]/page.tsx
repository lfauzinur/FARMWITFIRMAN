import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import blogData from '@/data/blog-posts.json';

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isId = lang === 'id';

  // Find the blog post based on slug
  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postTitle = isId ? post.title.id : post.title.en;
  const postCategory = isId ? post.category.id : post.category.en;
  const postExcerpt = isId ? post.excerpt.id : post.excerpt.en;
  
  // Dummy content generation for visual purposes since we don't have full content in JSON
  const dummyContent = isId ? `
    <p>Ini adalah contoh konten artikel. Dalam implementasi nyatanya, konten ini akan diambil dari database atau CMS. ${postExcerpt}</p>
    <h2>Mengapa Ini Penting?</h2>
    <p>Dalam dunia pertanian modern, pendekatan yang tepat sangat krusial. Teknologi dan metode baru terus berkembang untuk memastikan hasil yang optimal bagi para petani. FarmWitFirman selalu berusaha menghadirkan yang terbaik.</p>
    <p>Terima kasih telah membaca artikel ini. Jangan ragu untuk membagikan informasi ini kepada rekan-rekan petani lainnya.</p>
  ` : `
    <p>This is a sample article content. In a real implementation, this content will be fetched from a database or CMS. ${postExcerpt}</p>
    <h2>Why is this Important?</h2>
    <p>In the modern agricultural world, the right approach is crucial. New technologies and methods continue to evolve to ensure optimal results for farmers. FarmWitFirman always strives to bring the best.</p>
    <p>Thank you for reading this article. Feel free to share this information with your fellow farmers.</p>
  `;

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '4rem' }}>
      {/* Hero Header */}
      <div style={{ position: 'relative', height: '400px', backgroundColor: 'var(--color-neutral-800)', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ 
          position: 'absolute', inset: 0, 
          backgroundImage: `url(${post.image})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          opacity: 0.6 
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: 'white', paddingBottom: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
              {postCategory}
            </span>
          </div>
          <h1 style={{ fontSize: 'var(--font-size-4xl)', fontFamily: 'var(--font-heading)', lineHeight: 1.2, marginBottom: '1rem' }}>
            {postTitle}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.875rem', opacity: 0.8 }}>
            <span>{post.date}</span>
            <span>By {post.author}</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem', marginTop: '-2rem', position: 'relative', zIndex: 2 }}>
        
        {/* Breadcrumb */}
        <div style={{ backgroundColor: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem', fontSize: 'var(--font-size-sm)', display: 'flex', gap: '0.5rem' }}>
          <Link href={`/${lang}`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--color-neutral-300)' }}>/</span>
          <Link href={`/${lang}/blog`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Blog</Link>
          <span style={{ color: 'var(--color-neutral-300)' }}>/</span>
          <span style={{ color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{postTitle}</span>
        </div>

        {/* Article Body */}
        <article style={{ backgroundColor: 'white', padding: '3rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div 
            className="article-content"
            style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text)' }}
            dangerouslySetInnerHTML={{ __html: dummyContent }} 
          />
        </article>

        {/* Back Link */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link 
            href={`/${lang}/blog`}
            style={{ display: 'inline-block', padding: '0.75rem 2rem', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: '2rem', textDecoration: 'none', fontWeight: 'bold' }}
          >
            {isId ? 'Kembali ke Artikel' : 'Back to Articles'}
          </Link>
        </div>

      </div>
    </div>
  );
}
