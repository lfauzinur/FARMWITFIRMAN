'use client';

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { ShoppingBag } from 'lucide-react';

interface CartIconButtonProps {
  lang: string;
}

export default function CartIconButton({ lang }: CartIconButtonProps) {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const items = useCartStore((s) => s.items);

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <button
      onClick={toggleCart}
      aria-label="Shopping Cart"
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ShoppingBag size={22} color="var(--color-primary)" strokeWidth={2} />
      {mounted && totalItems > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-8px',
            backgroundColor: '#ef4444',
            color: 'white',
            fontSize: '0.65rem',
            fontWeight: 'bold',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  );
}

