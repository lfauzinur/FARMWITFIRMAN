'use client';

import React from 'react';
import { useCartStore } from '@/stores/cartStore';

interface QuickAddButtonProps {
  id: string;
  slug: string;
  nameId: string;
  nameEn: string;
  price: number;
  imageUrl: string | null;
  isId: boolean;
}

export default function QuickAddButton({
  id, slug, nameId, nameEn, price, imageUrl, isId,
}: QuickAddButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({ id, slug, nameId, nameEn, price, imageUrl });
      }}
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--border-radius-md)',
        border: 'none',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
      }}
    >
      🛒 {isId ? 'Beli' : 'Buy'}
    </button>
  );
}
