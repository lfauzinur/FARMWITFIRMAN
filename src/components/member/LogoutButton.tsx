'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logoutMember } from '@/app/actions/authActions';

export default function LogoutButton({ lang, isId }: { lang: string, isId: boolean }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutMember();
      router.push(`/${lang}/login`);
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLoggingOut(false);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoggingOut}
      style={{ 
        width: '100%', 
        padding: '1rem', 
        backgroundColor: '#fef2f2', 
        color: '#ef4444', 
        border: 'none', 
        borderRadius: '0.75rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '0.5rem', 
        fontSize: '0.875rem', 
        fontWeight: 'bold',
        cursor: isLoggingOut ? 'not-allowed' : 'pointer',
        opacity: isLoggingOut ? 0.7 : 1
      }}
    >
      <LogOut size={18} />
      <span>{isLoggingOut ? (isId ? 'Keluar...' : 'Logging out...') : (isId ? 'Keluar Akun' : 'Log Out')}</span>
    </button>
  );
}
