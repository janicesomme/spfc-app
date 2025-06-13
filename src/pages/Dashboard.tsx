
import React from 'react';
import { DashboardStats } from '@/components/DashboardStats';
import { TransferReportsTable } from '@/components/TransferReportsTable';
import { NewsTable } from '@/components/NewsTable';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer Intelligence Dashboard</h1>
        <p className="text-gray-600">Real-time insights for Mark Goldbridge's broadcast content</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <TransferReportsTable />
        <NewsTable />
      </div>
    </div>
  );
}
