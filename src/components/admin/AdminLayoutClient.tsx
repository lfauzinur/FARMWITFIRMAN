'use client';

import React, { useState } from 'react';
import styles from '@/app/[lang]/admin/(dashboard)/adminLayout.module.css';
import { Menu, X } from 'lucide-react';

export default function AdminLayoutClient({ 
  sidebar, 
  topbar,
  children 
}: { 
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.adminLayout}>
      
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayOpen : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar Wrapper */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        {sidebar}
      </div>
      
      <div className={styles.mainContent}>
        {/* Topbar Wrapper with Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', width: '100%', boxSizing: 'border-box' }}>
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle Menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div style={{ flex: 1 }}>
            {topbar}
          </div>
        </div>
        
        <main className={styles.mainContentPad}>
          {children}
        </main>
      </div>

    </div>
  );
}
