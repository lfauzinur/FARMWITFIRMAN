import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { constructMetadata } from '@/lib/metadata';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { formatDate } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import blogData from '@/data/blog-posts.json';
import styles from './articleDetail.module.css';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const isId = locale === 'id';

  // Check static data first
  const staticPost = blogData.find((p) => p.slug === slug);
  if (staticPost) {
    const title = isId ? staticPost.title.id : staticPost.title.en;
    const desc = isId ? staticPost.excerpt.id : staticPost.excerpt.en;
    return constructMetadata({ title, description: desc, locale: lang });
  }

  // Check DB
  const dbArticle = await prisma.article.findUnique({ where: { slug } });
  if (dbArticle) {
    const title = isId ? dbArticle.titleId : dbArticle.titleEn;
    return constructMetadata({ title, description: title, locale: lang });
  }

  return constructMetadata({ title: dict.blog.sectionLabel, description: '', locale: lang });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const isId = locale === 'id';
  const dict = await getDictionary(locale);

  // Try static data first
  const staticPost = blogData.find((p) => p.slug === slug);

  if (staticPost) {
    const postTitle = isId ? staticPost.title.id : staticPost.title.en;
    const postCategory = isId ? staticPost.category.id : staticPost.category.en;
    const postExcerpt = isId ? staticPost.excerpt.id : staticPost.excerpt.en;

    const content = isId ? `
      <p>${postExcerpt}</p>
      <h2>Mengapa Ini Penting?</h2>
      <p>Dalam dunia pertanian modern, pendekatan yang tepat sangat krusial. Teknologi dan metode baru terus berkembang untuk memastikan hasil yang optimal bagi para petani. FARMWITFIRMAN selalu berusaha menghadirkan yang terbaik untuk sektor pertanian Indonesia.</p>
      <p>Dengan menggabungkan pengalaman lapangan bertahun-tahun dan riset terbaru, kami percaya bahwa setiap petani berhak mendapatkan akses ke teknologi dan pengetahuan modern.</p>
      <blockquote>Inovasi pertanian bukan hanya tentang teknologi, tetapi juga tentang memberdayakan manusia di baliknya.</blockquote>
      <h2>Langkah-Langkah Implementasi</h2>
      <p>Berikut adalah beberapa langkah yang dapat Anda terapkan segera:</p>
      <ul>
        <li>Lakukan audit kondisi lahan dan tanah secara berkala</li>
        <li>Manfaatkan data cuaca dan analitik untuk perencanaan tanam</li>
        <li>Gunakan pupuk organik berkualitas untuk menjaga kesuburan tanah</li>
        <li>Ikuti pelatihan dan workshop untuk update skill pertanian</li>
      </ul>
      <h2>Kesimpulan</h2>
      <p>Pertanian modern membutuhkan kombinasi antara pengalaman tradisional dan inovasi teknologi. Dengan pendekatan yang tepat, produktivitas dapat meningkat secara signifikan sambil menjaga kelestarian lingkungan.</p>
      <p>Terima kasih telah membaca artikel ini. Jangan ragu untuk membagikan informasi ini kepada rekan-rekan petani lainnya.</p>
    ` : `
      <p>${postExcerpt}</p>
      <h2>Why is This Important?</h2>
      <p>In modern agriculture, the right approach is crucial. New technologies and methods continue to evolve to ensure optimal results for farmers. FARMWITFIRMAN always strives to bring the best for Indonesia's agricultural sector.</p>
      <p>By combining years of field experience and the latest research, we believe every farmer deserves access to modern technology and knowledge.</p>
      <blockquote>Agricultural innovation is not just about technology, but also about empowering the people behind it.</blockquote>
      <h2>Implementation Steps</h2>
      <p>Here are some steps you can implement right away:</p>
      <ul>
        <li>Conduct regular land and soil condition audits</li>
        <li>Leverage weather data and analytics for planting planning</li>
        <li>Use quality organic fertilizers to maintain soil fertility</li>
        <li>Attend training and workshops to update farming skills</li>
      </ul>
      <h2>Conclusion</h2>
      <p>Modern agriculture requires a combination of traditional experience and technological innovation. With the right approach, productivity can increase significantly while preserving the environment.</p>
      <p>Thank you for reading this article. Feel free to share this information with your fellow farmers.</p>
    `;

    return (
      <>
        <Navbar dict={dict} locale={locale} />

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: `url(${staticPost.image})` }} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <span className={styles.categoryBadge}>{postCategory}</span>
            <h1 className={styles.heroTitle}>{postTitle}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.metaItem}><User size={14} /> {staticPost.author}</span>
              <span className={styles.metaDot} />
              <span className={styles.metaItem}><Calendar size={14} /> {formatDate(staticPost.date, locale)}</span>
              <span className={styles.metaDot} />
              <span className={styles.metaItem}><Clock size={14} /> {staticPost.readTime} {dict.blog.minRead}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.articleContainer}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link href={`/${lang}`} className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href={`/${lang}/blog`} className={styles.breadcrumbLink}>Blog</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{postTitle}</span>
          </div>

          {/* Article */}
          <article className={styles.article}>
            <div
              className={styles.articleBody}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Author Footer */}
            <div className={styles.articleFooter}>
              <div className={styles.authorInfo}>
                <div className={styles.authorAvatar}>
                  <User size={20} />
                </div>
                <div>
                  <div className={styles.authorName}>{staticPost.author}</div>
                  <div className={styles.authorRole}>FARMWITFIRMAN Team</div>
                </div>
              </div>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
                {formatDate(staticPost.date, locale)}
              </span>
            </div>
          </article>

          {/* Back */}
          <div className={styles.backWrap}>
            <Link href={`/${lang}/blog`} className={styles.backLink}>
              <ArrowLeft size={16} />
              {isId ? 'Kembali ke Artikel' : 'Back to Articles'}
            </Link>
          </div>
        </div>

        <Footer dict={dict} locale={locale} />
      </>
    );
  }

  // === DB Article ===
  const dbArticle = await prisma.article.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!dbArticle) {
    notFound();
  }

  const articleTitle = isId ? dbArticle.titleId : dbArticle.titleEn;
  const articleContent = isId ? dbArticle.contentId : dbArticle.contentEn;
  const readTime = Math.max(1, Math.ceil(articleContent.split(/\s+/).length / 200));

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      {/* Hero */}
      <div className={styles.hero}>
        {dbArticle.imageUrl && (
          <div className={styles.heroBg} style={{ backgroundImage: `url(${dbArticle.imageUrl})` }} />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.categoryBadge}>
            {isId ? 'Artikel' : 'Article'}
          </span>
          <h1 className={styles.heroTitle}>{articleTitle}</h1>
          <div className={styles.heroMeta}>
            <span className={styles.metaItem}><User size={14} /> {dbArticle.author.name}</span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}><Calendar size={14} /> {formatDate(dbArticle.createdAt.toISOString(), locale)}</span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}><Clock size={14} /> {readTime} {dict.blog.minRead}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.articleContainer}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href={`/${lang}`} className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href={`/${lang}/blog`} className={styles.breadcrumbLink}>Blog</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{articleTitle}</span>
        </div>

        {/* Article */}
        <article className={styles.article}>
          <div className={styles.articleBody}>
            {articleContent.split('\n').map((paragraph, i) => (
              paragraph.trim() ? <p key={i}>{paragraph.trim()}</p> : null
            ))}
          </div>

          {/* Author Footer */}
          <div className={styles.articleFooter}>
            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar}>
                <User size={20} />
              </div>
              <div>
                <div className={styles.authorName}>{dbArticle.author.name}</div>
                <div className={styles.authorRole}>{dbArticle.author.email}</div>
              </div>
            </div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
              {formatDate(dbArticle.createdAt.toISOString(), locale)}
            </span>
          </div>
        </article>

        {/* Back */}
        <div className={styles.backWrap}>
          <Link href={`/${lang}/blog`} className={styles.backLink}>
            <ArrowLeft size={16} />
            {isId ? 'Kembali ke Artikel' : 'Back to Articles'}
          </Link>
        </div>
      </div>

      <Footer dict={dict} locale={locale} />
    </>
  );
}
