
import React from 'react';
import { YouTubeVideoList } from '@/components/YouTubeVideoList';

export default function YouTube() {
  return (
    <div className="min-h-screen bg-black">
      {/* Banner Header - exact replica of home page */}
      <div className="w-full py-1 sm:py-5 px-4" style={{ backgroundColor: '#ec1c24' }}>
        <div className="flex items-center justify-center max-w-4xl mx-auto">
          <img 
            src="/lovable-uploads/1077b5b4-1936-46aa-b42b-64375e0de61b.png"
            alt="FTV Logo"
            className="h-20 w-auto sm:h-24 md:h-28 mr-4 sm:mr-6"
            style={{ marginLeft: '-40px' }}
          />
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl">
            YouTube
          </h1>
        </div>
      </div>
      
      <div className="py-6">
        <YouTubeVideoList />
      </div>
    </div>
  );
}
