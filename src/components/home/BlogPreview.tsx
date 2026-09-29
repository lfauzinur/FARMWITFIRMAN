import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '../ui/SectionHeader';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import styles from './BlogPreview.module.css';
import { Locale } from '@/i18n/config';
import { formatDate } from '@/lib/utils';
import blogData from '@/data/blog-posts.json';

interface BlogPreviewProps {
  dict: any;
  locale: Locale;
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({ dict, locale }) => {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <SectionHeader
            label={dict.blog.sectionLabel}
            title={dict.blog.title}
            subtitle={dict.blog.subtitle}
          />
        </ScrollReveal>

        <div className={styles.grid}>
          {blogData.map((post, index) => (
            <ScrollReveal key={post.slug} direction="up">
              <div style={{ animationDelay: `${index * 150}ms` }}>
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
                    <h3 className={styles.title}>
                      {post.title[locale] || post.title.id}
                    </h3>
                    <p className={styles.excerpt}>
                      {post.excerpt[locale] || post.excerpt.id}
                    </p>
                    <div className={styles.footer}>
                      <span className={styles.author}>{post.author}</span>
                      <span className={styles.readTime}>{post.readTime} {dict.blog.minRead}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Button href={`/${locale}/blog`} variant="outline">
            {dict.blog.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};
