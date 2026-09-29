'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    
    // Replace the current locale in the pathname with the new one
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className={styles.switcher}>
      <button 
        onClick={() => switchLanguage('id')}
        className={`${styles.langBtn} ${currentLocale === 'id' ? styles.active : ''}`}
        aria-label="Switch to Indonesian"
      >
        ID
      </button>
      <span className={styles.divider}>|</span>
      <button 
        onClick={() => switchLanguage('en')}
        className={`${styles.langBtn} ${currentLocale === 'en' ? styles.active : ''}`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};
