'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';

interface CartDrawerProps {
  lang: string;
}

export default function CartDrawer({ lang }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();
  const isId = lang === 'id';

  // Prevent hydration mismatch — only render after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '420px',
          maxWidth: '90vw',
          backgroundColor: 'white',
          zIndex: 999,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
            🛒 {isId ? 'Keranjang Belanja' : 'Shopping Cart'} ({items.length})
          </h2>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--color-text-secondary)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {items.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--color-text-secondary)',
                gap: '1rem',
              }}
            >
              <span style={{ fontSize: '3rem' }}>🛒</span>
              <p>{isId ? 'Keranjang masih kosong' : 'Your cart is empty'}</p>
              <button
                onClick={closeCart}
                style={{
                  padding: '0.5rem 1.5rem',
                  border: '1px solid var(--color-primary)',
                  borderRadius: 'var(--border-radius-md)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                {isId ? 'Lanjut Belanja' : 'Continue Shopping'}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    backgroundColor: 'var(--color-bg-alt)',
                    borderRadius: 'var(--border-radius-md)',
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      backgroundColor: 'var(--color-neutral-200)',
                      borderRadius: 'var(--border-radius-sm)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      color: 'var(--color-neutral-400)',
                    }}
                  >
                    📦
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        margin: '0 0 0.25rem 0',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {isId ? item.nameId : item.nameEn}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-primary)',
                        fontWeight: 'bold',
                        margin: 0,
                      }}
                    >
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>

                    {/* Quantity controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: '0.875rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                        }}
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                        }}
                      >
                        {isId ? 'Hapus' : 'Remove'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {isId ? 'Total' : 'Total'}
              </span>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  color: 'var(--color-primary)',
                }}
              >
                Rp {getTotalPrice().toLocaleString('id-ID')}
              </span>
            </div>

            <Link
              href={`/${lang}/keranjang`}
              onClick={closeCart}
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.875rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                borderRadius: 'var(--border-radius-md)',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              {isId ? 'Lihat Keranjang & Checkout' : 'View Cart & Checkout'}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
