import React from 'react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { constructMetadata } from '@/lib/metadata';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/home/CTASection';
import styles from './services.module.css';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return constructMetadata({ title: dict.servicesPage.title, description: dict.servicesPage.subtitle, locale: lang });
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const services = [
    {
      id: 'produk',
      icon: '🌾',
      title: dict.services.service1Title,
      description: dict.services.service1Desc,
      features: [
        'Bibit unggul bersertifikat',
        'Pupuk organik premium',
        'Alat pertanian modern',
        'E-book & digital guides'
      ]
    },
    {
      id: 'konsultasi',
      icon: '🤝',
      title: dict.services.service2Title,
      description: dict.services.service2Desc,
      features: [
        'Audit lahan & tanah',
        'Perencanaan agribisnis',
        'Strategi pemasaran hasil tani',
        'Analisis data pertanian'
      ]
    },
    {
      id: 'pelatihan',
      icon: '🎓',
      title: dict.services.service3Title,
      description: dict.services.service3Desc,
      features: [
        'Workshop hands-on',
        'Pelatihan IoT & drone',
        'Sertifikasi kompetensi',
        'Program magang pertanian'
      ]
    }
  ];

  const whyUs = [
    { icon: '🏆', title: dict.servicesPage.why1Title, description: dict.servicesPage.why1Desc },
    { icon: '💡', title: dict.servicesPage.why2Title, description: dict.servicesPage.why2Desc },
    { icon: '📈', title: dict.servicesPage.why3Title, description: dict.servicesPage.why3Desc },
    { icon: '🤝', title: dict.servicesPage.why4Title, description: dict.servicesPage.why4Desc },
  ];

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <ScrollReveal>
            <span className={styles.label}>{dict.services.sectionLabel}</span>
            <h1 className={styles.pageTitle}>{dict.servicesPage.title}</h1>
            <p className={styles.pageSubtitle}>{dict.servicesPage.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section">
        <div className="container">
          <div className={styles.servicesList}>
            {services.map((service, index) => (
              <ScrollReveal key={service.id} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div id={service.id} className={`${styles.serviceRow} ${index % 2 !== 0 ? styles.serviceRowReversed : ''}`}>
                  <div className={styles.serviceIcon}>
                    <span>{service.icon}</span>
                  </div>
                  <div className={styles.serviceContent}>
                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                    <p className={styles.serviceDesc}>{service.description}</p>
                    <ul className={styles.featureList}>
                      {service.features.map((feature, i) => (
                        <li key={i} className={styles.featureItem}>
                          <span className={styles.checkIcon}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button href={`/${locale}/kontak`} variant="primary" size="md">
                      {dict.services.learnMore}
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              label={dict.servicesPage.whyTitle}
              title={dict.servicesPage.whyTitle}
              subtitle=""
            />
          </ScrollReveal>
          <div className={styles.whyGrid}>
            {whyUs.map((item, i) => (
              <ScrollReveal key={i} direction="up">
                <div className={styles.whyCard}>
                  <div className={styles.whyIcon}>{item.icon}</div>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyDesc}>{item.description}</p>
                </div>
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
