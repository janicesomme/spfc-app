import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Player {
  id: string;
  name: string;
  image: string;
}

interface SelectedPlayers {
  [position: string]: Player | null;
}

const formations = {
  '1-3-4-3': {
    GK: { top: '85%', left: '50%' },
    LB: { top: '65%', left: '20%' },
    CB: { top: '65%', left: '50%' },
    RB: { top: '65%', left: '80%' },
    LM: { top: '45%', left: '15%' },
    CM1: { top: '45%', left: '40%' },
    CM2: { top: '45%', left: '60%' },
    RM: { top: '45%', left: '85%' },
    LW: { top: '25%', left: '25%' },
    ST: { top: '25%', left: '50%' },
    RW: { top: '25%', left: '75%' },
  }
};

const positionNames = {
  GK: 'Goalkeeper',
  LB: 'Left Back',
  CB: 'Centre Back',
  RB: 'Right Back',
  LM: 'Left Midfielder',
  CM1: 'Centre Midfielder',
  CM2: 'Centre Midfielder',
  RM: 'Right Midfielder',
  LW: 'Left Winger',
  ST: 'Striker',
  RW: 'Right Winger',
};

export default function PickYourXI() {
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayers>({});

  const handlePositionClick = (position: string) => {
    navigate(`/pick-player?position=${position}`);
  };

  const allPositionsFilled = Object.keys(formations['1-3-4-3']).every(
    position => selectedPlayers[position]
  );

  const handleSubmitXI = () => {
    // Handle XI submission logic here
    console.log('Submitting XI:', selectedPlayers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Football Pitch Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url('/lovable-uploads/a04227c3-e8a5-418f-b2cc-26abc80a049e.png')`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content */}
      <div className="relative z-10 p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-white mb-2">Pick Your XI</h1>
          <p className="text-white/80 text-sm">Select your starting lineup</p>
        </div>

        {/* Formation Container */}
        <div className="flex-1 relative max-w-md mx-auto w-full">
          {Object.entries(formations['1-3-4-3']).map(([position, coords]) => {
            const player = selectedPlayers[position];
            
            return (
              <button
                key={position}
                onClick={() => handlePositionClick(position)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  top: coords.top,
                  left: coords.left,
                }}
              >
                {/* Player Circle */}
                <div className="w-16 h-16 rounded-full border-3 border-white bg-red-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  {player ? (
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img 
                        src={player.image} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <Plus className="w-8 h-8 text-white" />
                  )}
                </div>
                
                {/* Player Name */}
                {player && (
                  <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2">
                    <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                      {player.name}
                    </span>
                  </div>
                )}
                
                {/* Position Label (when no player selected) */}
                {!player && (
                  <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2">
                    <span className="text-white/70 text-xs bg-black/50 px-2 py-1 rounded">
                      {position}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        {allPositionsFilled && (
          <div className="pb-6 px-4">
            <Button 
              onClick={handleSubmitXI}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg"
            >
              Submit XI
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}