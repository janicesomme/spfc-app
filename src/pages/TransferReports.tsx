
import React from 'react';
import { TransferReportsTable } from '@/components/TransferReportsTable';

export default function TransferReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer Reports</h1>
        <p className="text-gray-600">Comprehensive intelligence on transfer targets and market activity</p>
      </div>
      
      <TransferReportsTable />
    </div>
  );
}
