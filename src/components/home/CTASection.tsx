import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import styles from './CTASection.module.css';
import { Locale } from '@/i18n/config';

interface CTASectionProps {
  dict: any;
  locale: Locale;
}

export const CTASection: React.FC<CTASectionProps> = ({ dict, locale }) => {
  return (
    <section className={styles.cta}>
      <div className={`container ${styles.ctaContainer}`}>
        <ScrollReveal direction="scale">
          <div className={styles.card}>
            <div className={styles.decor1}></div>
            <div className={styles.decor2}></div>
            <div className={styles.content}>
              <h2 className={styles.title}>{dict.cta.title}</h2>
              <p className={styles.subtitle}>{dict.cta.subtitle}</p>
              <div className={styles.actions}>
                <Button href={`/${locale}/kontak`} size="lg" variant="secondary">
                  {dict.cta.ctaPrimary}
                </Button>
                <Button
                  href="https://wa.me/6221123456789"
                  variant="outline"
                  size="lg"
                >
                  {dict.cta.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
