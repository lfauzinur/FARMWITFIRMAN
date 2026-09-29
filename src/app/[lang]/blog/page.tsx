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

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      <section className={styles.pageHeader}>
        <div className="container">
          <ScrollReveal>
            <span className={styles.label}>{dict.blog.sectionLabel}</span>
            <h1 className={styles.pageTitle}>{dict.blog.title}</h1>
            <p className={styles.pageSubtitle}>{dict.blog.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {blogData.map((post, index) => (
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

      <Footer dict={dict} locale={locale} />
    </>
  );
}
