import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Player {
  id: string;
  player_name: string;
  image_url: string;
  position: string;
}

export default function PickPlayer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const position = searchParams.get('position') || '';
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get position order for sorting
  const getPositionOrder = (position: string): number => {
    const positionLower = position?.toLowerCase() || '';
    if (positionLower.includes('goalkeeper') || positionLower.includes('gk')) return 1;
    if (positionLower.includes('defender') || positionLower.includes('defence') || positionLower.includes('cb') || positionLower.includes('lb') || positionLower.includes('rb')) return 2;
    if (positionLower.includes('midfielder') || positionLower.includes('midfield') || positionLower.includes('cm') || positionLower.includes('dm') || positionLower.includes('am')) return 3;
    if (positionLower.includes('forward') || positionLower.includes('striker') || positionLower.includes('winger') || positionLower.includes('lw') || positionLower.includes('rw')) return 4;
    return 5; // Unknown positions last
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data, error } = await supabase
          .from('player_images' as any)
          .select('*');
        
        if (error) {
          console.error('Error fetching players:', error);
        } else {
          // Remove duplicates client-side based on player_name
          const uniquePlayers = (data as any[])?.reduce((acc: any[], current: any) => {
            const exists = acc.find(player => player.player_name === current.player_name);
            if (!exists) {
              acc.push(current);
            }
            return acc;
          }, []).sort((a: any, b: any) => {
            const positionOrderA = getPositionOrder(a.position);
            const positionOrderB = getPositionOrder(b.position);
            
            // First sort by position category
            if (positionOrderA !== positionOrderB) {
              return positionOrderA - positionOrderB;
            }
            
            // Then sort alphabetically within each position category
            return a.player_name.localeCompare(b.player_name);
          });
          
          setPlayers(uniquePlayers || []);
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
      name: player.player_name,
      image: player.image_url
    };
    localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));
    
    console.log(`Selected ${player.player_name} for position ${position}`);
    navigate('/pick-your-xi');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center">
        <div className="text-white">Loading players...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-600">
      {/* Header */}
      <div className="bg-black p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/pick-your-xi')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-white">CHOOSE YOUR PLAYERS</h1>
        </div>
      </div>

      {/* Player List */}
      <div className="p-4">
        <div className="space-y-3">
          {players.map((player) => (
            <button
              key={player.id}
              onClick={() => handlePlayerSelect(player)}
              className="w-full bg-white rounded-lg p-4 flex items-center gap-4 hover:bg-gray-200 transition-colors"
            >
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                <img 
                  src={player.image_url} 
                  alt={player.player_name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex-1 text-left px-2">
                <h3 className="text-black font-bold text-lg">{player.player_name}</h3>
                <p className="text-black text-sm mt-1 leading-tight">{player.position || 'Position'}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}