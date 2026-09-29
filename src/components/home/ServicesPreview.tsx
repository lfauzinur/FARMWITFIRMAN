import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import styles from './ServicesPreview.module.css';
import { Locale } from '@/i18n/config';

interface ServicesPreviewProps {
  dict: any;
  locale: Locale;
}

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({ dict, locale }) => {
  const services = [
    {
      id: 'products',
      icon: '🌾',
      title: dict.services.service1Title,
      description: dict.services.service1Desc,
      link: `/${locale}/produk`
    },
    {
      id: 'consulting',
      icon: '🤝',
      title: dict.services.service2Title,
      description: dict.services.service2Desc,
      link: `/${locale}/layanan#konsultasi`
    },
    {
      id: 'training',
      icon: '🎓',
      title: dict.services.service3Title,
      description: dict.services.service3Desc,
      link: `/${locale}/layanan#pelatihan`
    }
  ];

  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <SectionHeader 
            label={dict.services.sectionLabel}
            title={dict.services.title}
            subtitle={dict.services.subtitle}
          />
        </ScrollReveal>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <ScrollReveal key={service.id} direction="up" className="stagger">
              <div style={{ animationDelay: `${index * 150}ms` }}>
                <Card hoverable className={styles.card}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>{service.icon}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>
                  <Button href={service.link} variant="ghost" className={styles.cardLink}>
                    {dict.services.learnMore} &rarr;
                  </Button>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
