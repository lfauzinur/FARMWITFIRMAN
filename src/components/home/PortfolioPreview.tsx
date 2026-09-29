import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '../ui/SectionHeader';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import styles from './PortfolioPreview.module.css';
import { Locale } from '@/i18n/config';
import portfolioData from '@/data/portfolio.json';

interface PortfolioPreviewProps {
  dict: any;
  locale: Locale;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ dict, locale }) => {
  // Take only the first 3 items for preview
  const previewItems = portfolioData.slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <SectionHeader 
              label={dict.portfolio.sectionLabel}
              title={dict.portfolio.title}
              subtitle={dict.portfolio.subtitle}
              alignment="left"
            />
            <div className={styles.headerAction}>
              <Button href={`/${locale}/portofolio`} variant="outline">
                {dict.portfolio.viewAll}
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {previewItems.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" className="stagger">
              <div style={{ animationDelay: `${index * 150}ms` }} className={styles.cardWrapper}>
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
                      <Badge variant="primary">{item.category[locale] || item.category.id}</Badge>
                    </div>
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.title}>{item.title[locale] || item.title.id}</h3>
                    <p className={styles.client}>{item.client}</p>
                  </div>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        {/* Mobile-only view all button */}
        <div className={styles.mobileAction}>
          <Button href={`/${locale}/portofolio`} variant="outline" fullWidth>
            {dict.portfolio.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};
