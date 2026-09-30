'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '../ui/Button';
import CartIconButton from '@/components/cart/CartIconButton';
import CartDrawer from '@/components/cart/CartDrawer';
import styles from './Navbar.module.css';

interface NavbarProps {
  dict: any;
  locale: Locale;
}

export const Navbar: React.FC<NavbarProps> = ({ dict, locale }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/tentang`, label: dict.nav.about },
    { href: `/${locale}/layanan`, label: dict.nav.services },
    { href: `/${locale}/portofolio`, label: dict.nav.portfolio },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/kontak`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Logo */}
        <Link href={`/${locale}`} className={styles.logo}>
          <span className={styles.logoIcon}>🍃</span>
          <span className={styles.logoText}>FARMWITFIRMAN</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.desktopActions}>
            <CartIconButton lang={locale} />
            <LanguageSwitcher currentLocale={locale} />
            <Button href={`/${locale}/komunitas`} variant="primary" size="sm">
              {dict.nav.cta}
            </Button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <LanguageSwitcher currentLocale={locale} />
        </div>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileActive : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileMenuFooter}>
          <Button href={`/${locale}/komunitas`} variant="primary" fullWidth onClick={() => setIsMobileMenuOpen(false)}>
            {dict.nav.cta}
          </Button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer lang={locale} />
    </header>
  );
};
