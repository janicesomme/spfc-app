
import React from 'react';
import { YouTubeTable } from '@/components/YouTubeTable';

export default function YouTube() {
  return (
    <div className="space-y-6">
      {/* Removed header and subheading, page is now just the table */}
      <YouTubeTable />
    </div>
  );
}
