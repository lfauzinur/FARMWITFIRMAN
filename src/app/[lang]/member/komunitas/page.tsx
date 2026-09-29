import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Users, Search, Sprout, Map, MapPin, Phone, Award, Leaf } from 'lucide-react';
import styles from './komunitas.module.css';

export default async function KomunitasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isId = lang === 'id';
  const session = await auth();

  if (!session || !session.user.id) {
    redirect(`/${lang}/login`);
  }

  // Fetch all members
  const members = await prisma.user.findMany({
    where: { role: 'USER' },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { orders: true, bookings: true } },
    },
  });

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100%' }}>

      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.headerTitle}>
          {isId ? '👥 Komunitas Petani' : '👥 Farmer Community'}
        </h1>
        <p className={styles.headerSubtitle}>
          {isId
            ? 'Para petani yang sudah bergabung menjadi member'
            : 'Farmers who have joined as members'}
        </p>
        <div className={styles.totalBadge}>
          <Users size={14} />
          {members.length} {isId ? 'Member Terdaftar' : 'Registered Members'}
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchBar}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder={isId ? 'Cari nama petani...' : 'Search farmer name...'}
          readOnly
        />
      </div>

      {/* Member List */}
      <div className={styles.memberList}>
        {members.length === 0 ? (
          <div className={styles.emptyState}>
            <Users size={48} className={styles.emptyIcon} />
            <p className={styles.emptyText}>
              {isId ? 'Belum ada member terdaftar.' : 'No registered members yet.'}
            </p>
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id} className={styles.memberCard}>
              <div className={styles.cardAvatar}>
                {getInitials(member.name)}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{member.name || '-'}</h3>
                <div className={styles.cardLevel}>
                  <Award size={10} />
                  {member.level} • {member.points} {isId ? 'Poin' : 'Points'}
                </div>
                <div className={styles.cardDetails}>
                  {member.farmingType && (
                    <div className={styles.detailItem}>
                      <div className={styles.detailIcon} style={{ background: '#ecfdf5' }}>
                        <Sprout size={12} color="#10b981" />
                      </div>
                      <span>{member.farmingType}</span>
                    </div>
                  )}
                  {member.landArea && (
                    <div className={styles.detailItem}>
                      <div className={styles.detailIcon} style={{ background: '#eff6ff' }}>
                        <Map size={12} color="#3b82f6" />
                      </div>
                      <span>{member.landArea}</span>
                    </div>
                  )}
                  {member.address && (
                    <div className={styles.detailItem}>
                      <div className={styles.detailIcon} style={{ background: '#fef3c7' }}>
                        <MapPin size={12} color="#f59e0b" />
                      </div>
                      <span style={{ maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {member.address}
                      </span>
                    </div>
                  )}
                  {!member.farmingType && !member.landArea && !member.address && (
                    <div className={styles.detailItem}>
                      <div className={styles.detailIcon} style={{ background: '#f1f5f9' }}>
                        <Leaf size={12} color="#94a3b8" />
                      </div>
                      <span>{isId ? 'Petani Baru' : 'New Farmer'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
