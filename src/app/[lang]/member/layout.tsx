'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, ShoppingCart, FileText, User, Users } from 'lucide-react';

const NAV_ITEMS = [
  { key: 'home', path: '', icon: Home, label: 'Home' },
  { key: 'katalog', path: '/katalog', icon: Store, label: 'Katalog' },
  { key: 'pesanan', path: '/pesanan', icon: ShoppingCart, label: 'Pesanan' },
  { key: 'artikel', path: '/artikel', icon: FileText, label: 'Artikel' },
  { key: 'komunitas', path: '/komunitas', icon: Users, label: 'Komunitas' },
  { key: 'profil', path: '/profil', icon: User, label: 'Profil' },
];

export default function MemberLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const pathname = usePathname();
  const basePath = `/${lang}/member`;

  const isActive = (navPath: string) => {
    if (navPath === '') {
      return pathname === basePath || pathname === `${basePath}/`;
    }
    return pathname.includes(navPath);
  };

  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', fontFamily: 'var(--font-inter), sans-serif' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#fafafa', minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ flex: 1, paddingBottom: '80px', overflowY: 'auto' }}>
          {children}
        </div>

        {/* ═══════════════ BOTTOM NAV ═══════════════ */}
        <div style={{
          position: 'fixed',
          bottom: '0.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 1.5rem)',
          maxWidth: '456px',
          backgroundColor: 'white',
          borderRadius: '9999px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.375rem',
          zIndex: 50,
        }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            
            return active ? (
              <Link
                key={item.key}
                href={`${basePath}${item.path}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Icon size={18} strokeWidth={2.5} />
                <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>{item.label}</span>
              </Link>
            ) : (
              <Link
                key={item.key}
                href={`${basePath}${item.path}`}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={20} />
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
