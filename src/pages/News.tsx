
import React from 'react';
import { NewsTable } from '@/components/NewsTable';

export default function News() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">News Intelligence</h1>
        <p className="text-gray-600">Real-time news analysis and sentiment tracking</p>
      </div>
      
      <NewsTable />
    </div>
  );
}
