import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Search, SlidersHorizontal, Leaf } from 'lucide-react';
import QuickAddButton from '@/components/produk/QuickAddButton';

export default async function MemberCatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang } = await params;
  const { category: categorySlug } = await searchParams;
  const isId = lang === 'id';

  // Fetch categories
  const categories = await prisma.category.findMany();

  // Build where clause
  const whereClause = categorySlug
    ? { category: { slug: categorySlug } }
    : {};

  // Fetch products
  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%', paddingBottom: '2rem' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 1rem 0' }}>
          {isId ? 'Katalog Produk' : 'Product Catalog'}
        </h1>
        
        {/* Search Bar (Visual Only for now) */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder={isId ? "Cari produk..." : "Search products..."} 
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none', fontSize: '0.875rem' }}
            />
          </div>
          <button style={{ padding: '0 0.75rem', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SlidersHorizontal size={20} color="#475569" />
          </button>
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div style={{ padding: '1rem 0', backgroundColor: 'white', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0 1.5rem', gap: '0.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <Link 
            href={`/${lang}/member/katalog`}
            style={{ 
              padding: '0.375rem 1rem', 
              borderRadius: '9999px', 
              fontSize: '0.75rem', 
              fontWeight: '600',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              backgroundColor: !categorySlug ? '#10b981' : '#f1f5f9',
              color: !categorySlug ? 'white' : '#475569'
            }}
          >
            {isId ? 'Semua' : 'All'}
          </Link>
          {categories.map((cat) => (
            <Link 
              key={cat.id}
              href={`/${lang}/member/katalog?category=${cat.slug}`}
              style={{ 
                padding: '0.375rem 1rem', 
                borderRadius: '9999px', 
                fontSize: '0.75rem', 
                fontWeight: '600',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                backgroundColor: categorySlug === cat.slug ? '#10b981' : '#f1f5f9',
                color: categorySlug === cat.slug ? 'white' : '#475569'
              }}
            >
              {isId ? cat.nameId : cat.nameEn}
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ padding: '1rem 1.5rem' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#94a3b8' }}>
            <Leaf size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <p style={{ fontSize: '0.875rem' }}>{isId ? 'Tidak ada produk di kategori ini.' : 'No products in this category.'}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {products.map((product) => (
              <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <Link href={`/${lang}/member/katalog/${product.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ aspectRatio: '1/1', backgroundColor: '#f1f5f9', position: 'relative' }}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.nameId} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                        <Leaf size={30} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '0.75rem' }}>
                    <h3 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 0.25rem 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {isId ? product.nameId : product.nameEn}
                    </h3>
                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </Link>
                <div style={{ padding: '0 0.75rem 0.75rem 0.75rem', marginTop: 'auto' }}>
                  <QuickAddButton
                    id={product.id}
                    slug={product.slug}
                    nameId={product.nameId}
                    nameEn={product.nameEn}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    isId={isId}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
