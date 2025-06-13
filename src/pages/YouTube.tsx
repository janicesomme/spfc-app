
import React from 'react';
import { YouTubeTable } from '@/components/YouTubeTable';

export default function YouTube() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">YouTube Content</h1>
        <p className="text-gray-600">Content pipeline and video management for broadcasting</p>
      </div>
      
      <YouTubeTable />
    </div>
  );
}
