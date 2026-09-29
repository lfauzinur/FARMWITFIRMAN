import React from 'react';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import Link from 'next/link';

export default async function MemberOrdersPage({
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

  // Fetch orders
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PENDING':
        return { color: '#eab308', bg: '#fef9c3', icon: <Clock size={16} />, label: isId ? 'Menunggu Pembayaran' : 'Pending Payment' };
      case 'PAID':
        return { color: '#3b82f6', bg: '#eff6ff', icon: <CheckCircle size={16} />, label: isId ? 'Diproses' : 'Processing' };
      case 'SHIPPED':
        return { color: '#8b5cf6', bg: '#f5f3ff', icon: <Truck size={16} />, label: isId ? 'Dikirim' : 'Shipped' };
      case 'COMPLETED':
        return { color: '#10b981', bg: '#ecfdf5', icon: <CheckCircle size={16} />, label: isId ? 'Selesai' : 'Completed' };
      case 'CANCELLED':
        return { color: '#ef4444', bg: '#fef2f2', icon: <XCircle size={16} />, label: isId ? 'Dibatalkan' : 'Cancelled' };
      default:
        return { color: '#64748b', bg: '#f1f5f9', icon: <Clock size={16} />, label: status };
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%', paddingBottom: '2rem' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
          {isId ? 'Pesanan Saya' : 'My Orders'}
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
          {isId ? 'Lacak status pesanan Anda' : 'Track your order status'}
        </p>
      </div>

      {/* Order List */}
      <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#94a3b8' }}>
            <Package size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>{isId ? 'Belum ada pesanan.' : 'No orders yet.'}</p>
            <Link href={`/${lang}/member/katalog`} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 'bold' }}>
              {isId ? 'Mulai Belanja' : 'Start Shopping'}
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            return (
              <div key={order.id} style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      {new Date(order.createdAt).toLocaleDateString(isId ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#0f172a' }}>
                      ID: {order.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', backgroundColor: statusConfig.bg, color: statusConfig.color, borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {statusConfig.icon}
                    <span>{statusConfig.label}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '0.75rem' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                        {item.product.imageUrl ? (
                          <img src={item.product.imageUrl} alt={isId ? item.product.nameId : item.product.nameEn} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', margin: '0 0 0.25rem 0', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {isId ? item.product.nameId : item.product.nameEn}
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                          {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                  <div>
                    <p style={{ fontSize: '0.625rem', color: '#64748b', marginBottom: '0.125rem' }}>Total Belanja</p>
                    <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                      Rp {order.totalAmount.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <button style={{ padding: '0.5rem 1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#0f172a', cursor: 'pointer' }}>
                    {isId ? 'Lacak Pesanan' : 'Track Order'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
