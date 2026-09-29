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
import { CTASection } from '@/components/home/CTASection';
import portfolioData from '@/data/portfolio.json';
import styles from './portfolio.module.css';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return constructMetadata({ title: dict.portfolio.sectionLabel, description: dict.portfolio.subtitle, locale: lang });
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      <section className={styles.pageHeader}>
        <div className="container">
          <ScrollReveal>
            <span className={styles.label}>{dict.portfolio.sectionLabel}</span>
            <h1 className={styles.pageTitle}>{dict.portfolio.title}</h1>
            <p className={styles.pageSubtitle}>{dict.portfolio.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {portfolioData.map((item, index) => (
              <ScrollReveal key={item.id} direction="up">
                <Link href={`/${locale}/portofolio/${item.id}`} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.image}
                      alt={item.title[locale] || item.title.id}
                      fill
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      <span className={styles.overlayText}>{dict.portfolio.viewProject}</span>
                    </div>
                    <div className={styles.badgeWrapper}>
                      <Badge>{item.category[locale] || item.category.id}</Badge>
                    </div>
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>{item.title[locale] || item.title.id}</h3>
                    <p className={styles.cardDesc}>{item.description[locale] || item.description.id}</p>
                    <div className={styles.cardMeta}>
                      <span>{item.client}</span>
                      <span>{item.year}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </>
  );
}
