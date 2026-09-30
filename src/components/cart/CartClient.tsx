'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { ShoppingBag } from 'lucide-react';

export default function CartClient({ lang }: { lang: string }) {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isId = lang === 'id';

  if (!mounted) return null;

  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-alt)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 2rem' }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          <Link href={`/${lang}`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--color-text)' }}>{isId ? 'Keranjang Belanja' : 'Shopping Cart'}</span>
        </div>

        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontFamily: 'var(--font-heading)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShoppingBag size={36} color="var(--color-primary)" /> {isId ? 'Keranjang Belanja' : 'Shopping Cart'}
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <ShoppingBag size={64} color="var(--color-text-secondary)" strokeWidth={1} style={{ display: 'block', margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Keranjang Anda masih kosong' : 'Your cart is empty'}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
              {isId ? 'Yuk mulai belanja produk pertanian terbaik!' : 'Start shopping for the best agricultural products!'}
            </p>
            <Link
              href={`/${lang}/produk`}
              style={{
                display: 'inline-block', padding: '0.75rem 2rem',
                backgroundColor: 'var(--color-primary)', color: 'white',
                borderRadius: 'var(--border-radius-md)', textDecoration: 'none', fontWeight: 'bold',
              }}
            >
              {isId ? 'Lihat Katalog Produk' : 'Browse Product Catalog'}
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>

            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Table header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                padding: '1rem 1.5rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--border-radius-md)',
                fontWeight: 'bold', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)',
              }}>
                <span>{isId ? 'Produk' : 'Product'}</span>
                <span style={{ textAlign: 'center' }}>{isId ? 'Harga' : 'Price'}</span>
                <span style={{ textAlign: 'center' }}>{isId ? 'Jumlah' : 'Qty'}</span>
                <span style={{ textAlign: 'right' }}>Subtotal</span>
                <span />
              </div>

              {items.map((item) => (
                <div key={item.id} style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', alignItems: 'center',
                  padding: '1.5rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--border-radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  {/* Product */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '60px', height: '60px', backgroundColor: 'var(--color-neutral-100)',
                      borderRadius: 'var(--border-radius-sm)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0,
                    }}>📦</div>
                    <div>
                      <Link href={`/${lang}/produk/${item.slug}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: 'var(--color-text)' }}>
                        {isId ? item.nameId : item.nameEn}
                      </Link>
                    </div>
                  </div>

                  {/* Price */}
                  <span style={{ textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>

                  {/* Quantity */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{
                      width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--color-border)',
                      backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>−</button>
                    <span style={{ fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{
                      width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--color-border)',
                      backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>+</button>
                  </div>

                  {/* Subtotal */}
                  <span style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </span>

                  {/* Remove */}
                  <button onClick={() => removeItem(item.id)} style={{
                    background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer',
                    fontSize: '1.25rem', padding: '0.25rem 0.5rem',
                  }}>✕</button>
                </div>
              ))}

              {/* Clear cart */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <Link href={`/${lang}/produk`} style={{
                  color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '500', fontSize: 'var(--font-size-sm)',
                }}>
                  ← {isId ? 'Lanjut Belanja' : 'Continue Shopping'}
                </Link>
                <button onClick={clearCart} style={{
                  background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 'var(--font-size-sm)', fontWeight: '500',
                }}>
                  {isId ? 'Kosongkan Keranjang' : 'Clear Cart'}
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div style={{
              backgroundColor: 'var(--color-bg)', padding: '2rem', borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-md)', position: 'sticky', top: '6rem',
            }}>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                {isId ? 'Ringkasan Pesanan' : 'Order Summary'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} {isId ? 'item' : 'items'})</span>
                  <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{isId ? 'Ongkos Kirim' : 'Shipping'}</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{isId ? 'Dihitung saat checkout' : 'Calculated at checkout'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 'var(--font-size-lg)', padding: '1rem 0', borderTop: '2px solid var(--color-border)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--color-primary)' }}>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
              </div>

              <Link href={`/${lang}/checkout`} style={{
                display: 'block', textAlign: 'center', width: '100%', padding: '1rem', backgroundColor: 'var(--color-primary)', color: 'white',
                border: 'none', borderRadius: 'var(--border-radius-md)', fontWeight: 'bold', fontSize: '1rem',
                textDecoration: 'none', marginTop: '1rem',
              }}>
                {isId ? 'Lanjut ke Pembayaran' : 'Proceed to Checkout'}
              </Link>

              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  isId
                    ? `Halo, saya ingin memesan:\n${items.map((i) => `- ${i.nameId} x${i.quantity}`).join('\n')}\n\nTotal: Rp ${getTotalPrice().toLocaleString('id-ID')}`
                    : `Hello, I would like to order:\n${items.map((i) => `- ${i.nameEn} x${i.quantity}`).join('\n')}\n\nTotal: Rp ${getTotalPrice().toLocaleString('id-ID')}`
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block', textAlign: 'center', width: '100%', padding: '0.875rem',
                  backgroundColor: '#25D366', color: 'white', borderRadius: 'var(--border-radius-md)',
                  textDecoration: 'none', fontWeight: 'bold', fontSize: '0.875rem', marginTop: '0.75rem',
                }}
              >
                {isId ? 'Pesan via WhatsApp' : 'Order via WhatsApp'}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
