import React from 'react';
import { prisma } from '@/lib/prisma';
import { Package, Tags, Video, ShoppingCart, Users, TrendingUp, Truck, CreditCard } from 'lucide-react';

export default async function AdminDashboardPage() {
  const [
    productCount,
    categoryCount,
    testimonialCount,
    orderCount,
    memberCount,
    paidOrderCount,
    shippedOrderCount,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.videoTestimonial.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.order.count({ where: { status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] } } }),
    prisma.order.count({ where: { status: { in: ['SHIPPED', 'COMPLETED'] } } }),
  ]);

  // Calculate total products sold from order items
  const soldAgg = await prisma.orderItem.aggregate({
    _sum: { quantity: true },
    where: {
      order: { status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] } }
    }
  });
  const productsSold = soldAgg._sum.quantity || 0;

  // Revenue
  const revenueAgg = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] } }
  });
  const totalRevenue = revenueAgg._sum.totalAmount || 0;

  // Recent orders
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      items: { include: { product: true } },
    }
  });

  // Recent members
  const recentMembers = await prisma.user.findMany({
    where: { role: 'USER' },
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  const overviewCards = [
    { title: 'Total Member', count: memberCount, icon: Users, color: '#6366f1', bgColor: '#eef2ff' },
    { title: 'Pesanan Masuk', count: orderCount, icon: ShoppingCart, color: '#f59e0b', bgColor: '#fef3c7' },
    { title: 'Produk Terjual', count: productsSold, icon: TrendingUp, color: '#10b981', bgColor: '#ecfdf5' },
    { title: 'Sudah Terkirim', count: shippedOrderCount, icon: Truck, color: '#3b82f6', bgColor: '#eff6ff' },
    { title: 'Total Produk', count: productCount, icon: Package, color: '#8b5cf6', bgColor: '#f5f3ff' },
    { title: 'Kategori', count: categoryCount, icon: Tags, color: '#ec4899', bgColor: '#fdf2f8' },
    { title: 'Sudah Bayar', count: paidOrderCount, icon: CreditCard, color: '#14b8a6', bgColor: '#f0fdfa' },
    { title: 'Video Testimoni', count: testimonialCount, icon: Video, color: '#f97316', bgColor: '#fff7ed' },
  ];

  const getStatusBadge = (status: string) => {
    const map: Record<string, { color: string; bg: string; label: string }> = {
      'PENDING': { color: '#ca8a04', bg: '#fef9c3', label: 'Menunggu' },
      'PAID': { color: '#2563eb', bg: '#dbeafe', label: 'Dibayar' },
      'SHIPPED': { color: '#7c3aed', bg: '#ede9fe', label: 'Dikirim' },
      'COMPLETED': { color: '#059669', bg: '#d1fae5', label: 'Selesai' },
      'CANCELLED': { color: '#dc2626', bg: '#fee2e2', label: 'Batal' },
    };
    return map[status] || { color: '#6b7280', bg: '#f3f4f6', label: status };
  };

  return (
    <div>
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {overviewCards.map((card, index) => (
          <div key={index} style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.75rem', 
            padding: '1.25rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              backgroundColor: card.bgColor, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <card.icon size={24} color={card.color} />
            </div>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.8125rem', marginBottom: '0.25rem', fontWeight: '500' }}>{card.title}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{card.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
        borderRadius: '0.75rem', 
        padding: '1.5rem 2rem', 
        marginBottom: '2rem', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Pendapatan (Lunas)</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>Rp {totalRevenue.toLocaleString('id-ID')}</h2>
        </div>
        <CreditCard size={48} style={{ opacity: 0.3 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Recent Orders */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.75rem', 
          padding: '1.5rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Pesanan Terbaru</h3>
            <a href="/id/admin/pesanan" style={{ fontSize: '0.8125rem', color: '#10b981', textDecoration: 'none', fontWeight: '600' }}>Lihat Semua →</a>
          </div>
          {recentOrders.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0', fontSize: '0.875rem' }}>Belum ada pesanan.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', margin: '0 0 0.25rem 0' }}>{order.user?.name || 'User'}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                        {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} · Rp {order.totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <span style={{ padding: '0.25rem 0.75rem', backgroundColor: badge.bg, color: badge.color, borderRadius: '9999px', fontSize: '0.6875rem', fontWeight: '600' }}>
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Members */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.75rem', 
          padding: '1.5rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Member Terbaru</h3>
            <a href="/id/admin/member" style={{ fontSize: '0.8125rem', color: '#10b981', textDecoration: 'none', fontWeight: '600' }}>Lihat Semua →</a>
          </div>
          {recentMembers.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0', fontSize: '0.875rem' }}>Belum ada member.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentMembers.map((member) => (
                <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontWeight: 'bold', fontSize: '0.875rem' }}>
                      {(member.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', margin: '0 0 0.125rem 0' }}>{member.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{member.email}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: '#10b981', fontWeight: '600' }}>
                    {new Date(member.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
