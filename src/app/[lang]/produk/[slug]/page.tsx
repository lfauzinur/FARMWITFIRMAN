import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/components/produk/AddToCartButton';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import styles from './productDetail.module.css';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isId = lang === 'id';
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  const productName = isId ? product.nameId : product.nameEn;
  const productDescription = isId ? product.descriptionId : product.descriptionEn;
  const categoryName = product.category ? (isId ? product.category.nameId : product.category.nameEn) : null;

  return (
    <>
      <Navbar dict={dict} locale={locale} />
      <div style={{ padding: 'calc(var(--space-section) + 80px) 0 var(--space-section) 0', backgroundColor: 'var(--color-bg-alt)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          <Link href={`/${lang}`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link href={`/${lang}/produk`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            {isId ? 'Produk' : 'Products'}
          </Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--color-text)' }}>{productName}</span>
        </div>

        <div className={styles.productContainer}>
          
          {/* Product Image */}
          <div style={{ backgroundColor: 'var(--color-neutral-100)', borderRadius: 'var(--border-radius-md)', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <span style={{ color: 'var(--color-neutral-400)', fontSize: '1.25rem' }}>[Product Image: {productName}]</span>
            {categoryName && (
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)', padding: '0.25rem 0.75rem', borderRadius: 'var(--border-radius-sm)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {categoryName}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: 'var(--font-size-3xl)', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
              {productName}
            </h1>
            
            <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '2rem' }}>
              Rp {product.price.toLocaleString('id-ID')}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                {isId ? 'Deskripsi Produk' : 'Product Description'}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginTop: '1rem' }}>
                {productDescription}
              </p>
            </div>

            <div style={{ marginBottom: '2rem', display: 'flex', gap: '2rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Stok:</span>
                <span style={{ fontWeight: 'bold' }}>{product.stock > 0 ? product.stock : (isId ? 'Habis' : 'Out of Stock')}</span>
              </div>
              {categoryName && (
                <div>
                  <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Kategori:</span>
                  <span style={{ fontWeight: 'bold' }}>{categoryName}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
              <AddToCartButton
                productId={product.id}
                slug={product.slug}
                nameId={product.nameId}
                nameEn={product.nameEn}
                price={product.price}
                imageUrl={product.imageUrl}
                isId={isId}
              />
              <a 
                href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(productName)}`}
                target="_blank"
                rel="noreferrer"
                style={{ 
                  backgroundColor: '#25D366', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: 'var(--border-radius-md)', 
                  textDecoration: 'none', 
                  fontSize: 'var(--font-size-md)', 
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer dict={dict} locale={locale} />
  </>
  );
}
