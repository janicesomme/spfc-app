import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Player {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
}

export default function PickPlayer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const position = searchParams.get('position') || '';
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data, error } = await supabase
          .from('players')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Error fetching players:', error);
        } else {
          setPlayers(data || []);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handlePlayerSelect = (player: Player) => {
    // Store the selected player in localStorage
    const selectedPlayers = JSON.parse(localStorage.getItem('selectedPlayers') || '{}');
    selectedPlayers[position] = {
      id: player.id,
      name: player.name,
      image: player.image_url || '/placeholder.svg'
    };
    localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));
    
    console.log(`Selected ${player.name} for position ${position}`);
    navigate('/pick-your-xi');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-800 flex items-center justify-center">
        <div className="text-white">Loading players...</div>
      </div>
    );
  }

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
          {players.map((player) => (
            <button
              key={player.id}
              onClick={() => handlePlayerSelect(player)}
              className="bg-white/10 rounded-lg p-4 flex items-center gap-4 hover:bg-white/20 transition-colors"
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={player.image_url || '/placeholder.svg'} 
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-semibold">{player.name}</h3>
                <p className="text-white/70 text-sm">{player.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}