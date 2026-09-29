import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { constructMetadata } from '@/lib/metadata';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { ArrowRight, FileText, Clock, User } from 'lucide-react';
import blogData from '@/data/blog-posts.json';
import styles from './blog.module.css';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return constructMetadata({ title: dict.blog.sectionLabel, description: dict.blog.subtitle, locale: lang });
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const isId = locale === 'id';

  // Fetch articles from database
  const dbArticles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  // First blog post = featured
  const featured = blogData[0];
  const otherPosts = blogData.slice(1);

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <ScrollReveal>
            <span className={styles.label}>{dict.blog.sectionLabel}</span>
            <h1 className={styles.pageTitle}>{dict.blog.title}</h1>
            <p className={styles.pageSubtitle}>{dict.blog.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Article */}
      <div className="container">
        <div className={styles.featured}>
          <ScrollReveal>
            <Link href={`/${locale}/blog/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredImage}>
                <Image
                  src={featured.image}
                  alt={featured.title[locale] || featured.title.id}
                  fill
                  className={styles.featuredImg}
                />
              </div>
              <div className={styles.featuredContent}>
                <span className={styles.featuredBadge}>
                  {featured.category[locale] || featured.category.id}
                </span>
                <h2 className={styles.featuredTitle}>
                  {featured.title[locale] || featured.title.id}
                </h2>
                <p className={styles.featuredExcerpt}>
                  {featured.excerpt[locale] || featured.excerpt.id}
                </p>
                <div className={styles.featuredMeta}>
                  <span>{featured.author}</span>
                  <span className={styles.metaDivider} />
                  <span>{formatDate(featured.date, locale)}</span>
                  <span className={styles.metaDivider} />
                  <span>{featured.readTime} {dict.blog.minRead}</span>
                </div>
                <span className={styles.featuredCta}>
                  {dict.blog.readMore} <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* Static Blog Posts */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>
              {isId ? 'Artikel Terbaru' : 'Latest Articles'}
            </h2>
          </ScrollReveal>
          <div className={styles.grid}>
            {otherPosts.map((post) => (
              <ScrollReveal key={post.slug} direction="up">
                <Link href={`/${locale}/blog/${post.slug}`} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={post.image}
                      alt={post.title[locale] || post.title.id}
                      fill
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.content}>
                    <div className={styles.meta}>
                      <Badge variant="outline">{post.category[locale] || post.category.id}</Badge>
                      <span className={styles.date}>{formatDate(post.date, locale)}</span>
                    </div>
                    <h2 className={styles.cardTitle}>{post.title[locale] || post.title.id}</h2>
                    <p className={styles.excerpt}>{post.excerpt[locale] || post.excerpt.id}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.author}>{post.author}</span>
                      <span className={styles.readTime}>{post.readTime} {dict.blog.minRead}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Database Articles Section */}
      {dbArticles.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <ScrollReveal>
              <h2 className={styles.sectionTitle}>
                {isId ? 'Artikel dari Tim Kami' : 'Articles from Our Team'}
              </h2>
            </ScrollReveal>
            <div className={styles.grid}>
              {dbArticles.map((article) => (
                <ScrollReveal key={article.id} direction="up">
                  <Link href={`/${locale}/blog/${article.slug}`} className={article.imageUrl ? styles.card : styles.dbCard}>
                    {article.imageUrl ? (
                      <>
                        <div className={styles.imageWrapper}>
                          <Image
                            src={article.imageUrl}
                            alt={isId ? article.titleId : article.titleEn}
                            fill
                            className={styles.image}
                          />
                        </div>
                        <div className={styles.content}>
                          <h2 className={styles.cardTitle}>
                            {isId ? article.titleId : article.titleEn}
                          </h2>
                          <p className={styles.excerpt}>
                            {(isId ? article.contentId : article.contentEn).substring(0, 150)}...
                          </p>
                          <div className={styles.cardFooter}>
                            <span className={styles.author}>{article.author.name}</span>
                            <span className={styles.readTime}>
                              {formatDate(article.createdAt.toISOString(), locale)}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.dbIcon}>
                          <FileText size={24} />
                        </div>
                        <h3 className={styles.dbTitle}>
                          {isId ? article.titleId : article.titleEn}
                        </h3>
                        <p className={styles.dbExcerpt}>
                          {(isId ? article.contentId : article.contentEn).substring(0, 150)}...
                        </p>
                        <div className={styles.dbMeta}>
                          <User size={14} />
                          <span>{article.author.name}</span>
                          <span className={styles.metaDivider} />
                          <Clock size={14} />
                          <span>{formatDate(article.createdAt.toISOString(), locale)}</span>
                        </div>
                      </>
                    )}
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer dict={dict} locale={locale} />
    </>
  );
}
