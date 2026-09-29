import React from 'react';
import { getMembers } from '@/app/actions/memberActions';
import AdminMemberClient from './AdminMemberClient';

export default async function AdminMemberPage() {
  const members = await getMembers();
  return <AdminMemberClient members={JSON.parse(JSON.stringify(members))} />;
}
