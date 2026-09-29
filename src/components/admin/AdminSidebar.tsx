'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Store, 
  Files, 
  Users, 
  Briefcase,
  LogOut,
  Leaf,
  Info,
  ChevronDown
} from 'lucide-react';

interface AdminSidebarProps {
  lang: string;
}

export default function AdminSidebar({ lang }: AdminSidebarProps) {
  const pathname = usePathname();

  // Consistent icons for main categories
  const navGroups = [
    {
      groupName: 'Dashboard',
      items: [
        { name: 'Ringkasan', href: `/${lang}/admin`, icon: LayoutDashboard, exact: true },
      ]
    },
    {
      groupName: 'Manajemen Web',
      items: [
        { name: 'Tentang Kami', href: `/${lang}/admin/tentang`, icon: Info, exact: false },
        { name: 'Portofolio', href: `/${lang}/admin/portofolio`, icon: Briefcase, exact: false },
        { name: 'Blog & Artikel', href: `/${lang}/admin/artikel`, icon: Files, exact: false },
        { name: 'Testimoni', href: `/${lang}/admin/testimoni`, icon: Files, exact: false },
      ]
    },
    {
      groupName: 'E-Commerce',
      items: [
        { name: 'Produk', href: `/${lang}/admin/produk`, icon: Store, exact: false },
        { name: 'Kategori', href: `/${lang}/admin/kategori`, icon: Store, exact: false },
        { name: 'Pesanan', href: `/${lang}/admin/pesanan`, icon: Store, exact: false },
      ]
    },
    {
      groupName: 'Layanan',
      items: [
        { name: 'Konsultasi', href: `/${lang}/admin/konsultasi`, icon: Briefcase, exact: false },
      ]
    },
    {
      groupName: 'Pengguna',
      items: [
        { name: 'Member', href: `/${lang}/admin/member`, icon: Users, exact: false },
      ]
    }
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href) && (pathname === href || pathname.charAt(href.length) === '/');
  };

  return (
    <aside style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Logo */}
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
        <Leaf size={28} color="#10b981" />
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>FarmWit CMS</span>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {navGroups.map((group, idx) => (
          <div key={idx} style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>
              {group.groupName}
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      color: active ? '#10b981' : '#4b5563',
                      backgroundColor: active ? '#ecfdf5' : 'transparent',
                      fontWeight: active ? '600' : '500',
                      transition: 'all 0.2s',
                    }}
                  >
                    <item.icon size={18} color={active ? '#10b981' : '#9ca3af'} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
        <form action="/api/auth/signout" method="POST">
          <button 
            type="submit" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              background: '#fef2f2', 
              border: 'none', 
              color: '#ef4444', 
              fontWeight: '600',
              cursor: 'pointer',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              width: '100%',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={18} />
            Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
