import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Leaf, ShoppingCart, MessageSquare } from 'lucide-react';
import AddToCartButton from '@/components/produk/AddToCartButton';

export default async function MemberProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isId = lang === 'id';

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
    <div style={{ backgroundColor: 'white', minHeight: '100%', paddingBottom: '5rem' }}>
      
      {/* Header / Back Button */}
      <div style={{ position: 'fixed', top: 0, width: '100%', maxWidth: '480px', padding: '1rem 1.5rem', zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href={`/${lang}/member/katalog`} style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', color: '#0f172a' }}>
          <ChevronLeft size={24} />
        </Link>
        <Link href={`/${lang}/keranjang`} style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', color: '#0f172a' }}>
          <ShoppingCart size={20} />
        </Link>
      </div>

      {/* Product Image */}
      <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#f1f5f9', position: 'relative' }}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            <Leaf size={60} />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '1.5rem' }}>
        {categoryName && (
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#ecfdf5', color: '#10b981', fontSize: '0.625rem', fontWeight: 'bold', borderRadius: '9999px', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {categoryName}
          </span>
        )}
        
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>
          {productName}
        </h1>
        
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', margin: '0 0 1.5rem 0' }}>
          Rp {product.price.toLocaleString('id-ID')}
        </p>

        <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '1.5rem 0' }}></div>

        <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 0.5rem 0' }}>
          {isId ? 'Deskripsi Produk' : 'Product Description'}
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
          {productDescription}
        </p>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Stok</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>
              {product.stock > 0 ? product.stock : (isId ? 'Habis' : 'Out of Stock')}
            </span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', backgroundColor: 'white', padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.75rem', zIndex: 50 }}>
        <div style={{ flex: 1 }}>
          <AddToCartButton
            productId={product.id}
            slug={product.slug}
            nameId={product.nameId}
            nameEn={product.nameEn}
            price={product.price}
            imageUrl={product.imageUrl}
            isId={isId}
          />
        </div>
        <a 
          href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(productName)}`}
          target="_blank"
          rel="noreferrer"
          style={{ width: '48px', height: '48px', backgroundColor: '#25D366', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none' }}
        >
          <MessageSquare size={20} />
        </a>
      </div>

    </div>
  );
}
