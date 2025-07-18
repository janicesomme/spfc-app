import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock player data - you can replace this with real data from your backend
const mockPlayers = [
  { id: '1', name: 'Bruno Fernandes', position: 'CM', image: '/placeholder.svg' },
  { id: '2', name: 'Marcus Rashford', position: 'LW', image: '/placeholder.svg' },
  { id: '3', name: 'Harry Maguire', position: 'CB', image: '/placeholder.svg' },
  { id: '4', name: 'Andre Onana', position: 'GK', image: '/placeholder.svg' },
  { id: '5', name: 'Casemiro', position: 'CM', image: '/placeholder.svg' },
  { id: '6', name: 'Antony', position: 'RW', image: '/placeholder.svg' },
  { id: '7', name: 'Luke Shaw', position: 'LB', image: '/placeholder.svg' },
  { id: '8', name: 'Diogo Dalot', position: 'RB', image: '/placeholder.svg' },
  { id: '9', name: 'Rasmus Hojlund', position: 'ST', image: '/placeholder.svg' },
  { id: '10', name: 'Mason Mount', position: 'CM', image: '/placeholder.svg' },
];

export default function PickPlayer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const position = searchParams.get('position') || '';

  const handlePlayerSelect = (player: typeof mockPlayers[0]) => {
    // Store the selected player in localStorage
    const selectedPlayers = JSON.parse(localStorage.getItem('selectedPlayers') || '{}');
    selectedPlayers[position] = {
      id: player.id,
      name: player.name,
      image: player.image
    };
    localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));
    
    console.log(`Selected ${player.name} for position ${position}`);
    navigate('/pick-your-xi');
  };

  // Show all players regardless of position
  const filteredPlayers = mockPlayers;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-800">
      {/* Header */}
      <div className="bg-black/50 p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/pick-your-xi')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-white">Select Player</h1>
          <p className="text-white/70 text-sm">Position: {position}</p>
        </div>
      </div>

      {/* Player List */}
      <div className="p-4">
        <div className="grid gap-3">
          {filteredPlayers.map((player) => (
            <button
              key={player.id}
              onClick={() => handlePlayerSelect(player)}
              className="bg-white/10 rounded-lg p-4 flex items-center gap-4 hover:bg-white/20 transition-colors"
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={player.image} 
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-semibold">{player.name}</h3>
                <p className="text-white/70 text-sm">{player.position}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}