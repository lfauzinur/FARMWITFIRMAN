'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import styles from './Footer.module.css';

interface FooterProps {
  dict: any;
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ dict, locale }) => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <Link href={`/${locale}`} className={styles.logo}>
            <span className={styles.logoIcon}>🍃</span>
            <span className={styles.logoText}>FARMWITFIRMAN</span>
          </Link>
          <p className={styles.description}>
            {dict.footer.description}
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>IG</a>
            <a href="#" aria-label="LinkedIn" className={styles.socialLink}>IN</a>
            <a href="#" aria-label="YouTube" className={styles.socialLink}>YT</a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>FB</a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>{dict.footer.quickLinks}</h4>
          <ul className={styles.linkList}>
            <li><Link href={`/${locale}/tentang`} className={styles.link}>{dict.nav.about}</Link></li>
            <li><Link href={`/${locale}/layanan`} className={styles.link}>{dict.nav.services}</Link></li>
            <li><Link href={`/${locale}/portofolio`} className={styles.link}>{dict.nav.portfolio}</Link></li>
            <li><Link href={`/${locale}/blog`} className={styles.link}>{dict.nav.blog}</Link></li>
            <li><Link href={`/${locale}/produk`} className={styles.link}>{dict.nav.products}</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>{dict.footer.contactInfo}</h4>
          <ul className={styles.linkList}>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span>{dict.contact.address}</span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <span>{dict.contact.phone}</span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <span>{dict.contact.emailAddress}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className={styles.newsletterCol}>
          <h4 className={styles.colTitle}>{dict.footer.newsletter}</h4>
          <p className={styles.newsletterDesc}>{dict.footer.newsletterDesc}</p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={dict.footer.newsletterPlaceholder} 
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              {dict.footer.subscribe}
            </button>
          </form>
        </div>

      </div>
      
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomContent}`}>
          <p className={styles.copyright}>{dict.footer.copyright}</p>
          <div className={styles.legalLinks}>
            <Link href={`/${locale}/privacy`} className={styles.legalLink}>{dict.footer.privacy}</Link>
            <Link href={`/${locale}/terms`} className={styles.legalLink}>{dict.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
