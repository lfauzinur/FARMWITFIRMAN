'use client';

import React, { useState } from 'react';
import { updateOrderStatus, deleteOrder } from '@/app/actions/memberActions';
import { useRouter } from 'next/navigation';
import { Search, Trash2, Package, ChevronDown, ShoppingBag } from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    nameId: string;
    nameEn: string;
    imageUrl: string | null;
  };
}

interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  shippingAddress: string | null;
  paymentRef: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string | null; phone: string | null };
  items: OrderItem[];
}

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Menunggu Bayar', color: '#ca8a04', bg: '#fef9c3' },
  { value: 'PAID', label: 'Sudah Bayar', color: '#2563eb', bg: '#dbeafe' },
  { value: 'SHIPPED', label: 'Dikirim', color: '#7c3aed', bg: '#ede9fe' },
  { value: 'COMPLETED', label: 'Selesai', color: '#059669', bg: '#d1fae5' },
  { value: 'CANCELLED', label: 'Dibatalkan', color: '#dc2626', bg: '#fee2e2' },
];

export default function AdminPesananClient({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredOrders = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      (o.user?.name || '').toLowerCase().includes(q) ||
      (o.user?.email || '').toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'ALL' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Gagal update status');
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm('Hapus pesanan ini? Tindakan ini tidak bisa dibatalkan.')) return;
    try {
      await deleteOrder(orderId);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus pesanan');
    }
  };

  const getStatusConfig = (status: string) => {
    return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Manajemen Pesanan</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>{orders.length} pesanan total</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, atau ID pesanan..."
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterStatus('ALL')}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: '600', backgroundColor: filterStatus === 'ALL' ? '#111827' : '#f3f4f6', color: filterStatus === 'ALL' ? 'white' : '#6b7280' }}
          >
            Semua
          </button>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilterStatus(s.value)}
              style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: '600', backgroundColor: filterStatus === s.value ? s.bg : '#f3f4f6', color: filterStatus === s.value ? s.color : '#6b7280' }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #f3f4f6', color: '#9ca3af' }}>
          <ShoppingBag size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
          <p style={{ fontSize: '0.875rem' }}>Tidak ada pesanan ditemukan.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            return (
              <div key={order.id} style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #f3f4f6', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                {/* Order Header */}
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontWeight: 'bold' }}>
                      {(order.user?.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#111827', margin: '0 0 0.125rem 0', fontSize: '0.9375rem' }}>{order.user?.name || 'User'}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                        {order.user?.email} · ID: {order.id.slice(0, 8).toUpperCase()} · {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Status Dropdown */}
                    <div style={{ position: 'relative' }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{ 
                          appearance: 'none',
                          padding: '0.375rem 2rem 0.375rem 0.75rem', 
                          backgroundColor: statusConfig.bg, 
                          color: statusConfig.color, 
                          border: `1px solid ${statusConfig.color}30`, 
                          borderRadius: '0.5rem', 
                          fontSize: '0.8125rem', 
                          fontWeight: '600', 
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} color={statusConfig.color} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                    <button onClick={() => handleDelete(order.id)} style={{ padding: '0.375rem', backgroundColor: '#fef2f2', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex' }}>
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    {order.items.map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '36px', height: '36px', backgroundColor: '#e5e7eb', borderRadius: '0.25rem', overflow: 'hidden', flexShrink: 0 }}>
                            {item.product.imageUrl ? (
                              <img src={item.product.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Package size={16} color="#9ca3af" />
                              </div>
                            )}
                          </div>
                          <span style={{ fontSize: '0.875rem', color: '#374151' }}>{item.product.nameId}</span>
                        </div>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {item.quantity} × Rp {item.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
                    <div>
                      {order.shippingAddress && (
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>📍 {order.shippingAddress}</p>
                      )}
                      {order.paymentRef && (
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>💳 Ref: {order.paymentRef}</p>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.125rem 0' }}>Total</p>
                      <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                        Rp {order.totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
