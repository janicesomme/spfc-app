import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-green-800">
      <div className="max-w-md mx-auto pt-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Football Manager</h1>
          <p className="text-white/80">Build your ultimate team</p>
        </div>
        
        <div className="space-y-6">
          <button 
            onClick={() => navigate('/pick-your-xi')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            🏈 Pick Your XI
          </button>
          
          <button 
            onClick={() => navigate('/news')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            📰 Latest News
          </button>
          
          <button 
            onClick={() => navigate('/players')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            👤 Player Profiles
          </button>
        </div>
      </div>
    </div>
  );
}