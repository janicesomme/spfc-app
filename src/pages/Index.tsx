import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* YouTube Video Section */}
      <div className="px-4 pt-4 pb-6">
        <button 
          onClick={() => navigate('/youtube')}
          className="w-full relative"
        >
          <div className="relative bg-black rounded-lg overflow-hidden">
            <img 
              src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" 
              alt="Best Final Video"
              className="w-full h-48 object-cover"
            />
            {/* YouTube Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-3">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            {/* "BEST FINAL" Text Overlay */}
            <div className="absolute top-4 left-4">
              <h2 className="text-white font-bold text-2xl">BEST</h2>
              <h2 className="text-white font-bold text-2xl">FINAL</h2>
            </div>
          </div>
        </button>
      </div>

      {/* Latest News Section */}
      <div className="px-4 pb-4">
        <h3 className="text-white text-lg font-semibold mb-3">Latest News</h3>
      </div>

      {/* Pick Your XI Section */}
      <div className="px-4 pb-6">
        <button 
          onClick={() => navigate('/pick-your-xi')}
          className="w-full"
        >
          <div className="relative">
            <img 
              src="https://jckkhfqswiasnepshxbr.supabase.co/storage/v1/object/public/player-headshots//best%20pitch%20for%20app.png"
              alt="Pick Your XI"
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Pick Your XI</h3>
            </div>
          </div>
        </button>
      </div>

      {/* Player Ratings Section */}
      <div className="px-4 pb-6">
        <button 
          onClick={() => navigate('/player-ratings')}
          className="w-full"
        >
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white text-lg font-semibold mb-4">Player Ratings</h3>
            
            {/* Sample Player Rating Rows */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-700 rounded p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full"></div>
                  <span className="text-white">Player Name</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-red-500 rounded-full"></div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-700 rounded p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full"></div>
                  <span className="text-white">Player Name</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-red-500 rounded-full"></div>
                  ))}
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-700 rounded p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full"></div>
                  <span className="text-white">Player Name</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-red-500 rounded-full"></div>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}