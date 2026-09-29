'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';

export default function CheckoutClient({ lang }: { lang: string }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const isId = lang === 'id';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  useEffect(() => {
    setMounted(true);
    if (items.length === 0) {
      router.push(`/${lang}/produk`);
    }
  }, [items, lang, router]);

  if (!mounted || items.length === 0) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Build Order Text
    let orderText = isId 
      ? `*Pesanan Baru (FarmWitFirman)*\n\n*Data Pembeli:*\nNama: ${formData.name}\nNo. HP: ${formData.phone}\nAlamat: ${formData.address}\nCatatan: ${formData.notes || '-'}\n\n*Detail Pesanan:*\n`
      : `*New Order (FarmWitFirman)*\n\n*Buyer Data:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nNotes: ${formData.notes || '-'}\n\n*Order Details:*\n`;

    items.forEach((item, index) => {
      const itemName = isId ? item.nameId : item.nameEn;
      orderText += `${index + 1}. ${itemName} (x${item.quantity}) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });

    orderText += `\n*Total: Rp ${getTotalPrice().toLocaleString('id-ID')}*\n\n`;
    orderText += isId ? `Mohon segera diproses, terima kasih!` : `Please process this order, thank you!`;

    // 2. Open WhatsApp
    const encodedText = encodeURIComponent(orderText);
    const waUrl = `https://wa.me/6281234567890?text=${encodedText}`;
    window.open(waUrl, '_blank');

    // 3. Clear Cart & Redirect to Home
    clearCart();
    router.push(`/${lang}?order=success`);
  };

  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-alt)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          <Link href={`/${lang}`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link href={`/${lang}/keranjang`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>{isId ? 'Keranjang' : 'Cart'}</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--color-text)' }}>Checkout</span>
        </div>

        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>
          {isId ? 'Pengiriman & Pembayaran' : 'Shipping & Payment'}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem', alignItems: 'start' }}>
          
          {/* Checkout Form */}
          <div style={{ backgroundColor: 'var(--color-bg)', padding: '2.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
              {isId ? 'Informasi Pengiriman' : 'Shipping Information'}
            </h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {isId ? 'Nama Lengkap' : 'Full Name'} <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-border)', fontSize: '1rem' }} 
                />
              </div>

              <div>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {isId ? 'Nomor WhatsApp' : 'WhatsApp Number'} <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-border)', fontSize: '1rem' }} 
                />
              </div>

              <div>
                <label htmlFor="address" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {isId ? 'Alamat Pengiriman Lengkap' : 'Full Shipping Address'} <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea 
                  id="address" 
                  name="address" 
                  rows={4}
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-border)', fontSize: '1rem', resize: 'vertical' }} 
                />
              </div>

              <div>
                <label htmlFor="notes" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {isId ? 'Catatan Pesanan (Opsional)' : 'Order Notes (Optional)'}
                </label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-border)', fontSize: '1rem', resize: 'vertical' }} 
                />
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div style={{ backgroundColor: 'var(--color-bg)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '6rem' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
              {isId ? 'Ringkasan Pesanan' : 'Order Summary'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{isId ? item.nameId : item.nameEn}</span>
                    <div style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>x{item.quantity}</div>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{isId ? 'Ongkos Kirim' : 'Shipping'}</span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{isId ? 'Dihitung admin' : 'Calculated by admin'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 'var(--font-size-lg)', padding: '1rem 0', borderTop: '2px solid var(--color-border)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--color-primary)' }}>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              style={{
                width: '100%', padding: '1rem', backgroundColor: '#25D366', color: 'white',
                border: 'none', borderRadius: 'var(--border-radius-md)', fontWeight: 'bold', fontSize: '1rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'opacity 0.2s ease'
              }}
            >
              <span>{isId ? 'Pesan via WhatsApp' : 'Place Order via WhatsApp'}</span>
            </button>
            
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '1rem', lineHeight: 1.5 }}>
              {isId 
                ? 'Dengan menekan tombol di atas, Anda akan diarahkan ke WhatsApp untuk menyelesaikan pembayaran dan pengiriman.' 
                : 'By clicking the button above, you will be redirected to WhatsApp to complete payment and shipping.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
