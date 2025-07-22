import React, { useState, useEffect } from 'react';
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
    GK: { top: '75%', left: '50%' },
    LB: { top: '55%', left: '25%' },
    CB: { top: '55%', left: '50%' },
    RB: { top: '55%', left: '75%' },
    LM: { top: '33%', left: '7.5%' },
    CM1: { top: '29%', left: '37.5%' },
    CM2: { top: '29%', left: '62.5%' },
    RM: { top: '33%', left: '92.5%' },
    LW: { top: '12%', left: '25%' },
    ST: { top: '8%', left: '50%' },
    RW: { top: '12%', left: '75%' },
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

  useEffect(() => {
    const saved = localStorage.getItem('selectedPlayers');
    if (saved) {
      setSelectedPlayers(JSON.parse(saved));
    }
  }, []);

  const handlePositionClick = (position: string) => {
    navigate(`/pick-player?position=${position}`);
  };

  const allPositionsFilled = Object.keys(formations['1-3-4-3']).every(
    position => selectedPlayers[position]
  );

  const handleSubmitXI = () => {
    console.log('Submitting XI:', selectedPlayers);
  };

  return (
    <div 
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKACAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAXAcEbQAAAANQTFRFAAAApqamZ2dnYmJif39/Y2NjgICAs7OzpKSkZmZmqqqqtra2i4uLvb29oaGhjY2NzMzMgoKCv7+/s7OzpqampiYmMbW1tj4+Po6OjvLy8oKCgpKSkubm5qqqqgoKCxsbGwsLCubm5ra2tv7+/mpqawcHB4eHhrq6uXl5eMjIyQEBAlpaWrKysnJycAAAAq6hqWgAAADV0Uk5T/////////////////////////////////////////////////////////////wA7GIGoAAAGNUlEQVR4nO3dyW7rOBhG4VgbIsxiAysZzvr/v4XpFqXRFLnqdvJXOqTN0Z75IXygEAAAAAAAAAAAAAAAAAADgM7VZ5Xg33ulS+lfX06sXDbXD8nL3U/hVXD3P9VQv3xUdzvqn08qnl6yns+y3dN7Vz+cFbfaL3uVuMPbR27aXxV27Q+Mr/wq+fg75cpn4//fFHt19UX3m8OpZpP/vHHD1fZl65+78r+nH97qvbyzUPzeofv4FZ7++X7fvWXed+XPf0WcuHf2t47FL/M07qfP/z+zv/rvfPw/XL1tHR/p5uPwjeaY4dv5VcP6P/Wv/uvPZ7+FzM/7jy+vhlzvta38cPPN38p5+X6z/uT++fP35VNPVz+XL0d//8XlqTzUfbKqnb49R5++fDzvrP/VuRzuX+j2zqvt9r+vnC2+fX3ez5e33n/wfNj66U1YJvdP96vhf3P8O/5A6TAAAAAAAAAAAAAAAAAAB8g/8AGExkuNscVFoAAAAASUVORK5CYII=')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10 p-4 h-screen flex flex-col">
        <div className="text-center pt-2 pb-8">
          <h1 className="text-2xl font-bold text-white mb-4">Pick Your XI</h1>
          <p className="text-white/80 text-sm">Select your starting lineup</p>
        </div>

        <div className="flex-1 relative max-w-md mx-auto w-full">
          {Object.entries(formations['1-3-4-3']).map(([position, coords]) => {
            const player = selectedPlayers[position];
            return (
              <button
                key={position}
                onClick={() => handlePositionClick(position)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: coords.top, left: coords.left }}
              >
                <div className="w-16 h-16 rounded-full border-[3px] border-white bg-red-600 shadow-xl ring-2 ring-white/70 flex items-center justify-center">
                  {player ? (
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Plus className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2">
                  <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                    {player ? player.name.split(' ').pop() : position}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

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
