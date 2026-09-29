import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import QuickAddButton from '@/components/produk/QuickAddButton';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import styles from './produk.module.css';

export default async function ProductCatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang } = await params;
  const { category: categorySlug } = await searchParams;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

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

  const isId = lang === 'id';
  const pageTitle = isId ? 'Katalog Produk' : 'Product Catalog';
  const pageSubtitle = isId
    ? 'Temukan solusi pertanian terbaik dan modul pelatihan kami'
    : 'Find our best agricultural solutions and training modules';

  return (
    <>
      <Navbar dict={dict} locale={locale} />
      <div style={{ padding: 'calc(var(--space-section) + 80px) 0 var(--space-section) 0', backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '1rem' }}>
            {pageTitle}
          </h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            {pageSubtitle}
          </p>
        </div>

        <div className={styles.catalogLayout}>
          
          {/* Sidebar / Categories */}
          <aside>
            <div style={{ backgroundColor: 'var(--color-bg)', padding: '1.5rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontFamily: 'var(--font-heading)', marginBottom: '1rem', borderBottom: '2px solid var(--color-green-100)', paddingBottom: '0.5rem' }}>
                {isId ? 'Kategori' : 'Categories'}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>
                  <Link 
                    href={`/${lang}/produk`}
                    style={{ 
                      color: !categorySlug ? 'var(--color-primary)' : 'var(--color-text)',
                      fontWeight: !categorySlug ? 'bold' : 'normal',
                      textDecoration: 'none'
                    }}
                  >
                    {isId ? 'Semua Produk' : 'All Products'}
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link 
                      href={`/${lang}/produk?category=${cat.slug}`}
                      style={{ 
                        color: categorySlug === cat.slug ? 'var(--color-primary)' : 'var(--color-text)',
                        fontWeight: categorySlug === cat.slug ? 'bold' : 'normal',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)'
                      }}
                    >
                      {isId ? cat.nameId : cat.nameEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <main>
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--border-radius-lg)' }}>
                <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Tidak ada produk ditemukan.' : 'No products found.'}
                </h3>
              </div>
            ) : (
              <div className={styles.productGrid}>
                {products.map((product) => (
                  <div key={product.id} style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow var(--transition-base)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '200px', backgroundColor: 'var(--color-neutral-200)', position: 'relative' }}>
                      {/* Image Placeholder */}
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-500)' }}>
                        [Product Image]
                      </div>
                      {/* Category Badge */}
                      {product.category && (
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)', padding: '0.25rem 0.75rem', borderRadius: 'var(--border-radius-sm)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          {isId ? product.category.nameId : product.category.nameEn}
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontSize: 'var(--font-size-lg)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
                        {isId ? product.nameId : product.nameEn}
                      </h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '1.5rem', flex: 1 }}>
                        {isId ? product.descriptionId : product.descriptionEn}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', gap: '0.5rem' }}>
                        <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <QuickAddButton
                            id={product.id}
                            slug={product.slug}
                            nameId={product.nameId}
                            nameEn={product.nameEn}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            isId={isId}
                          />
                          <Link 
                            href={`/${lang}/produk/${product.slug}`}
                            style={{ backgroundColor: 'transparent', color: 'var(--color-primary)', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-md)', textDecoration: 'none', fontSize: 'var(--font-size-sm)', fontWeight: 'bold', border: '1px solid var(--color-primary)' }}
                          >
                            {isId ? 'Detail' : 'Details'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
    <Footer dict={dict} locale={locale} />
  </>
  );
}
