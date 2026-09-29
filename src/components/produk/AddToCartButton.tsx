'use client';

import React from 'react';
import { useCartStore, CartItem } from '@/stores/cartStore';

interface AddToCartButtonProps {
  productId: string;
  slug: string;
  nameId: string;
  nameEn: string;
  price: number;
  imageUrl: string | null;
  isId: boolean;
}

export default function AddToCartButton({
  productId,
  slug,
  nameId,
  nameEn,
  price,
  imageUrl,
  isId,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({ id: productId, slug, nameId, nameEn, price, imageUrl });
  };

  return (
    <button
      onClick={handleAdd}
      style={{
        flex: 1,
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        padding: '1rem',
        borderRadius: 'var(--border-radius-md)',
        border: 'none',
        fontSize: 'var(--font-size-md)',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
    >
      {isId ? '🛒 Tambah ke Keranjang' : '🛒 Add to Cart'}
    </button>
  );
}
