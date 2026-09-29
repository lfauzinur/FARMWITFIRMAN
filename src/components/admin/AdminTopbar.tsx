'use client';

import React from 'react';
import { Search, Bell } from 'lucide-react';

interface AdminTopbarProps {
  userName?: string | null;
}

export default function AdminTopbar({ userName }: AdminTopbarProps) {
  const firstName = userName ? userName.split(' ')[0] : 'Admin';

  return (
    <header style={{
      height: '80px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
        <h1 style={{ fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.5rem)', fontWeight: 'bold', color: '#111827', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Hey {firstName} 👋
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Search */}
        <div style={{ position: 'relative', display: 'var(--search-display, block)' }}>
          <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{
              padding: '0.5rem 1rem 0.5rem 2.5rem',
              borderRadius: '9999px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              outline: 'none',
              width: '100%',
              maxWidth: '200px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        {/* Notifications */}
        <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
          <Bell size={24} color="#6b7280" />
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '6px',
            width: '8px',
            height: '8px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            border: '2px solid white'
          }}></span>
        </button>

        {/* Profile Avatar */}
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
          {firstName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
