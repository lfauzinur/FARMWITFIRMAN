import React from 'react';
import { getOrders } from '@/app/actions/memberActions';
import AdminPesananClient from './AdminPesananClient';

export default async function AdminPesananPage() {
  const orders = await getOrders();
  return <AdminPesananClient orders={JSON.parse(JSON.stringify(orders))} />;
}
