import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  Search,
  Bell,
  Plus,
  Leaf,
  ShoppingBag,
  Award,
  Star,
  ChevronRight,
  Sprout,
  Map,
  Clock,
  Users,
  BookOpen,
  Headphones,
  GraduationCap,
  Handshake,
  Package,
} from 'lucide-react';
import styles from './member.module.css';

export default async function MemberDashboard({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isId = lang === 'id';
  const session = await auth();

  if (!session || !session.user.id) {
    redirect(`/${lang}/login`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      _count: { select: { orders: true, bookings: true } }
    }
  });

  if (!user) {
    redirect(`/${lang}/login`);
  }

  // Fetch products (Best Sellers)
  const topProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  // Fetch latest articles
  const articles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  // Fetch community members (other members)
  const members = await prisma.user.findMany({
    where: { role: 'USER', NOT: { id: session.user.id } },
    take: 10,
    orderBy: { createdAt: 'desc' },
  });

  // Layanan Bisnis data
  const layanan = [
    {
      id: 'produk',
      icon: '🌾',
      name: isId ? 'Produk Pertanian' : 'Farm Products',
      desc: isId ? 'Bibit, pupuk & alat tani' : 'Seeds, fertilizers & tools',
      href: `/${lang}/member/katalog`,
      bg: '#ecfdf5',
      color: '#065f46',
    },
    {
      id: 'konsultasi',
      icon: '💬',
      name: isId ? 'Konsultasi Agribisnis' : 'Agribusiness Consult',
      desc: isId ? 'Konsultasi 1-on-1 ahli' : '1-on-1 expert consultation',
      href: `/${lang}/layanan`,
      bg: '#eff6ff',
      color: '#1e40af',
    },
    {
      id: 'pelatihan',
      icon: '🎓',
      name: isId ? 'Pelatihan & Workshop' : 'Training & Workshop',
      desc: isId ? 'Kelas intensif bertani' : 'Intensive farming classes',
      href: `/${lang}/layanan`,
      bg: '#fef3c7',
      color: '#92400e',
    },
    {
      id: 'pendampingan',
      icon: '🤝',
      name: isId ? 'Pendampingan Pak Tani' : 'Farmer Mentoring',
      desc: isId ? 'Bimbingan langsung di lapangan' : 'Direct field mentoring',
      href: `/${lang}/layanan`,
      bg: '#fce7f3',
      color: '#9d174d',
    },
  ];

  // Quick action categories
  const quickCategories = [
    { icon: '🥬', label: isId ? 'Sayuran' : 'Vegetables', bg: '#ecfdf5' },
    { icon: '🍎', label: isId ? 'Buah' : 'Fruits', bg: '#fef2f2' },
    { icon: '🌱', label: isId ? 'Bibit' : 'Seeds', bg: '#f0fdf4' },
    { icon: '🧪', label: isId ? 'Pupuk' : 'Fertilizer', bg: '#eff6ff' },
  ];

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className={styles.pageContainer}>

      {/* ═══════════════ HEADER ═══════════════ */}
      <div className={styles.headerGradient}>
        <div className={styles.headerTop}>
          <div className={styles.headerUser}>
            <div className={styles.avatar}>
              <Leaf size={22} />
            </div>
            <div>
              <p className={styles.greeting}>Hello 👋</p>
              <h1 className={styles.userName}>{user.name}</h1>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn}>
              <Search size={18} />
            </button>
            <button className={styles.iconBtn}>
              <Bell size={18} />
              <div className={styles.notifDot}></div>
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#ecfdf5' }}>
            <Award size={18} color="#10b981" />
          </div>
          <div className={styles.statNumber}>{user.points}</div>
          <div className={styles.statLabel}>{isId ? 'Poin' : 'Points'}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#eff6ff' }}>
            <Star size={18} color="#3b82f6" />
          </div>
          <div className={styles.statNumber} style={{ fontSize: '0.875rem' }}>{user.level}</div>
          <div className={styles.statLabel}>Level</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fef3c7' }}>
            <ShoppingBag size={18} color="#f59e0b" />
          </div>
          <div className={styles.statNumber}>{user._count.orders}</div>
          <div className={styles.statLabel}>{isId ? 'Pesanan' : 'Orders'}</div>
        </div>
      </div>

      {/* ═══════════════ CONTENT ═══════════════ */}
      <div className={styles.contentArea}>

        {/* ---- Quick Categories ---- */}
        <div className={`${styles.fadeIn}`}>
          <div className={styles.quickActions}>
            {quickCategories.map((cat, i) => (
              <Link href={`/${lang}/member/katalog`} key={i} className={styles.quickAction}>
                <div className={styles.quickActionIcon} style={{ background: cat.bg }}>
                  {cat.icon}
                </div>
                <span className={styles.quickActionLabel}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ---- Promo Banner ---- */}
        <div className={`${styles.promoBanner} ${styles.fadeIn}`}>
          <div className={styles.promoContent}>
            <p className={styles.promoLabel}>✨ {isId ? 'Promo Spesial' : 'Special Offer'}</p>
            <h2 className={styles.promoTitle}>30% OFF</h2>
            <p className={styles.promoDate}>{isId ? 'Berlaku hingga 31 Des' : 'Valid until Dec 31'}</p>
            <Link href={`/${lang}/member/katalog`} className={styles.promoBtn}>
              {isId ? 'Lihat Sekarang' : 'Shop Now'}
            </Link>
          </div>
          <span className={styles.promoEmoji}>🛵</span>
        </div>

        {/* ═══════════ LAYANAN BISNIS ═══════════ */}
        <div className={styles.fadeIn}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {isId ? '🏪 Layanan Bisnis' : '🏪 Business Services'}
            </h2>
            <Link href={`/${lang}/layanan`} className={styles.seeAll}>
              {isId ? 'Semua' : 'All'} <ChevronRight size={14} />
            </Link>
          </div>
          <div className={styles.layananGrid}>
            {layanan.map((item) => (
              <Link href={item.href} key={item.id} className={styles.layananCard}>
                <div className={styles.layananIcon} style={{ background: item.bg }}>
                  <span>{item.icon}</span>
                </div>
                <div>
                  <p className={styles.layananName}>{item.name}</p>
                  <p className={styles.layananDesc}>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ═══════════ BEST SELLERS ═══════════ */}
        <div className={styles.fadeIn}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {isId ? '🔥 Produk Terlaris' : '🔥 Best Sellers'}
            </h2>
            <Link href={`/${lang}/member/katalog`} className={styles.seeAll}>
              {isId ? 'Semua' : 'All'} <ChevronRight size={14} />
            </Link>
          </div>

          {topProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <Package size={40} className={styles.emptyIcon} />
              <p className={styles.emptyText}>{isId ? 'Belum ada produk.' : 'No products yet.'}</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {topProducts.map((product) => (
                <Link href={`/${lang}/member/katalog/${product.slug}`} key={product.id} className={styles.productCard}>
                  <div className={styles.productImgWrap}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={isId ? product.nameId : product.nameEn} />
                    ) : (
                      <Leaf size={32} color="#cbd5e1" />
                    )}
                  </div>
                  <h3 className={styles.productName}>
                    {isId ? product.nameId : product.nameEn}
                  </h3>
                  <p className={styles.productPrice}>
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                  <div className={styles.productFooter}>
                    <span className={styles.productMeta}>
                      <Leaf size={12} /> {isId ? 'Stok:' : 'Stock:'} {product.stock}
                    </span>
                    <div className={styles.addBtn}>
                      <Plus size={14} strokeWidth={3} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════ BLOG & ARTIKEL ═══════════ */}
        <div className={styles.fadeIn}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {isId ? '📰 Blog & Artikel' : '📰 Blog & Articles'}
            </h2>
            <Link href={`/${lang}/member/artikel`} className={styles.seeAll}>
              {isId ? 'Semua' : 'All'} <ChevronRight size={14} />
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className={styles.emptyState}>
              <BookOpen size={40} className={styles.emptyIcon} />
              <p className={styles.emptyText}>{isId ? 'Belum ada artikel.' : 'No articles yet.'}</p>
            </div>
          ) : (
            <div className={styles.blogScroll}>
              {articles.map((article) => (
                <Link key={article.id} href={`/${lang}/member/artikel/${article.slug}`} className={styles.blogCard}>
                  <div className={styles.blogImg}>
                    {article.imageUrl ? (
                      <img src={article.imageUrl} alt={isId ? article.titleId : article.titleEn} />
                    ) : (
                      <Leaf size={36} color="#a7f3d0" />
                    )}
                  </div>
                  <div className={styles.blogBody}>
                    <div className={styles.blogDate}>
                      <Clock size={12} />
                      {new Date(article.createdAt).toLocaleDateString(isId ? 'id-ID' : 'en-US', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                    <h3 className={styles.blogTitle}>
                      {isId ? article.titleId : article.titleEn}
                    </h3>
                    <p className={styles.blogExcerpt}>
                      {isId ? article.contentId : article.contentEn}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════ PROFIL MEMBER (Komunitas) ═══════════ */}
        <div className={styles.fadeIn}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {isId ? '👥 Komunitas Petani' : '👥 Farmer Community'}
            </h2>
            <Link href={`/${lang}/member/komunitas`} className={styles.seeAll}>
              {isId ? 'Semua' : 'All'} <ChevronRight size={14} />
            </Link>
          </div>

          {members.length === 0 ? (
            <div className={styles.emptyState}>
              <Users size={40} className={styles.emptyIcon} />
              <p className={styles.emptyText}>{isId ? 'Belum ada member lain.' : 'No other members yet.'}</p>
            </div>
          ) : (
            <div className={styles.memberGrid}>
              {members.map((member) => (
                <div key={member.id} className={styles.memberCard}>
                  <div className={styles.memberAvatar}>
                    {getInitials(member.name)}
                  </div>
                  <div className={styles.memberName}>{member.name || '-'}</div>
                  <div className={styles.memberLevel}>{member.level}</div>
                  <div className={styles.memberInfo}>
                    {member.farmingType && (
                      <div className={styles.memberInfoRow}>
                        <Sprout size={12} color="#10b981" />
                        <span>{member.farmingType}</span>
                      </div>
                    )}
                    {member.landArea && (
                      <div className={styles.memberInfoRow}>
                        <Map size={12} color="#3b82f6" />
                        <span>{member.landArea}</span>
                      </div>
                    )}
                    {!member.farmingType && !member.landArea && (
                      <div className={styles.memberInfoRow}>
                        <Leaf size={12} color="#94a3b8" />
                        <span>{isId ? 'Petani Baru' : 'New Farmer'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
