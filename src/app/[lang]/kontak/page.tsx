import React from 'react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { constructMetadata } from '@/lib/metadata';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ContactForm } from '@/components/contact/ContactForm';
import styles from './contact.module.css';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return constructMetadata({ title: dict.contact.title, description: dict.contact.subtitle, locale: lang });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      <section className={styles.pageHeader}>
        <div className="container">
          <ScrollReveal>
            <span className={styles.label}>{dict.contact.sectionLabel}</span>
            <h1 className={styles.pageTitle}>{dict.contact.title}</h1>
            <p className={styles.pageSubtitle}>{dict.contact.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {/* Form Column */}
            <ScrollReveal direction="left">
              <div className={styles.formCard}>
                <ContactForm dict={dict} />
              </div>
            </ScrollReveal>

            {/* Info Column */}
            <ScrollReveal direction="right">
              <div className={styles.infoCol}>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>📍</div>
                  <h3 className={styles.infoTitle}>{dict.contact.addressTitle}</h3>
                  <p className={styles.infoText}>{dict.contact.address}</p>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>📞</div>
                  <h3 className={styles.infoTitle}>{dict.contact.phoneTitle}</h3>
                  <p className={styles.infoText}>{dict.contact.phone}</p>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>✉️</div>
                  <h3 className={styles.infoTitle}>{dict.contact.emailTitle}</h3>
                  <p className={styles.infoText}>{dict.contact.emailAddress}</p>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>🕐</div>
                  <h3 className={styles.infoTitle}>{dict.contact.hoursTitle}</h3>
                  <p className={styles.infoText}>{dict.contact.hours}</p>
                </div>

                <a href="https://wa.me/6221123456789" className={styles.whatsappBtn}>
                  💬 {dict.contact.whatsapp}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer dict={dict} locale={locale} />
    </>
  );
}
