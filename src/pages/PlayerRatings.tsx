import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Player {
  id: string;
  player_name: string;
  position: string;
  role: string;
  image_url?: string;
  match_id: string;
}

interface PlayerRating {
  player_id: string;
  rating: number;
}

export default function PlayerRatings() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [ratings, setRatings] = useState<PlayerRating[]>([]);
  const [motmPlayerId, setMotmPlayerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // For demo purposes, using a fixture_id. In production, this would come from route params or context
  const fixtureId = 'fixture-mufc-chelsea-2025-07-19';
  const matchId = '2025-07-19-chelsea';

  useEffect(() => {
    fetchPlayersAndImages();
  }, []);

  const fetchPlayersAndImages = async () => {
    try {
      // Fetch players from official_xi table - using any type to avoid TS issues
      const response = await fetch('https://jckkhfqswiasnepshxbr.supabase.co/rest/v1/official_xi?select=*&fixture_id=eq.' + fixtureId + '&role=in.(starter,sub)&player_name=not.is.null', {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impja2toZnFzd2lhc25lcHNoeGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDQ0NDIsImV4cCI6MjA2NDgyMDQ0Mn0.3-uOf61O93hSmhP3UvjBRZuAf5vEg6xyUYu77VyVMZ8',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impja2toZnFzd2lhc25lcHNoeGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDQ0NDIsImV4cCI6MjA2NDgyMDQ0Mn0.3-uOf61O93hSmhP3UvjBRZuAf5vEg6xyUYu77VyVMZ8',
        }
      });

      if (!response.ok) throw new Error('Failed to fetch players');
      const officialXI = await response.json();
      console.log('Players fetched:', officialXI);

      // Use images directly from official_xi table
      const playersWithImages: Player[] = officialXI.map((player: any) => {
        console.log('Player:', player.player_name, 'Image URL from official_xi:', player.image_url);
        
        return {
          id: player.id,
          player_name: player.player_name,
          position: player.position || 'Unknown',
          role: player.role || 'starter',
          match_id: player.match_id || matchId,
          image_url: player.image_url
        };
      });

      // Sort: starters first, then subs, alphabetically within each group
      const sortedPlayers = playersWithImages.sort((a, b) => {
        if (a.role !== b.role) {
          return a.role === 'starter' ? -1 : 1;
        }
        return a.player_name.localeCompare(b.player_name);
      });

      console.log('Final players with images:', sortedPlayers);
      setPlayers(sortedPlayers);
    } catch (error) {
      console.error('Error fetching players:', error);
      toast({
        title: "Error",
        description: "Failed to load players for rating",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRating = (playerId: string, rating: number) => {
    setRatings(prev => {
      const existing = prev.find(r => r.player_id === playerId);
      if (existing) {
        return prev.map(r => 
          r.player_id === playerId ? { ...r, rating } : r
        );
      } else {
        return [...prev, { player_id: playerId, rating }];
      }
    });
  };

  const allPlayersRated = players.length > 0 && ratings.length === players.length;
  const canSubmit = allPlayersRated && motmPlayerId !== null;

  const handleMotmSelection = (playerId: string) => {
    setMotmPlayerId(motmPlayerId === playerId ? null : playerId);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    
    try {
      const promises = ratings.map(async (rating) => {
        const player = players.find(p => p.id === rating.player_id);
        
        const payload = {
          match_id: player?.match_id || matchId,
          player_id: rating.player_id,
          rating: rating.rating,
          timestamp: new Date().toISOString(),
          user_id: null
        };

        const response = await fetch('https://jsomme.app.n8n.cloud/webhook-test/fan-vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit rating for ${player?.player_name}`);
        }

        return response;
      });

      await Promise.all(promises);

      toast({
        title: "Success!",
        description: `All ${ratings.length} player ratings have been submitted successfully.`,
      });

      // Reset ratings after successful submission
      setRatings([]);
      
    } catch (error) {
      console.error('Error submitting ratings:', error);
      toast({
        title: "Error",
        description: "Failed to submit some player ratings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({ playerId, currentRating }: { playerId: string; currentRating: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(playerId, star)}
            className="focus:outline-none transition-colors"
          >
            <Star
              className={`w-6 h-6 ${
                star <= currentRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-white hover:text-yellow-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading players...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-red-600 border-b border-gray-800 z-10">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-white hover:text-red-400 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Rate The Players</h1>
          <div className="w-6" /> {/* Spacer for center alignment */}
        </div>
      </div>

      {/* Players List */}
      <div className="p-4 space-y-4">
        {players.map((player) => {
          const playerRating = ratings.find(r => r.player_id === player.id)?.rating || 0;
          
          return (
            <div key={player.id} className="bg-black rounded-lg p-4 border border-red-600">
              <div className="flex items-center justify-between">
                {/* Player Info */}
                <div className="flex items-center gap-3">
                  {/* Player Image */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-700">
                    {player.image_url ? (
                      <img 
                        src={player.image_url}
                        alt={player.player_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        {player.player_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  {/* Player Details */}
                  <div>
                    <h3 className="font-semibold text-white">{player.player_name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{player.position}</span>
                      <span>•</span>
                      <span className={`capitalize ${player.role === 'starter' ? 'text-green-400' : 'text-blue-400'}`}>
                        {player.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* MOTM Button */}
                <div className="flex items-center">
                  <button
                    onClick={() => handleMotmSelection(player.id)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                      motmPlayerId === player.id
                        ? 'bg-yellow-500 text-red-600'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    MOTM
                  </button>
                </div>

                {/* Star Rating */}
                <StarRating playerId={player.id} currentRating={playerRating} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {canSubmit && (
        <div className="sticky bottom-0 bg-black border-t border-red-600 p-4">
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg uppercase tracking-wide"
          >
            {submitting ? 'Submitting Your Ratings...' : 'Submit Your Ratings'}
          </Button>
        </div>
      )}

      {/* Progress Indicator */}
      {!allPlayersRated && players.length > 0 && (
        <div className="sticky bottom-0 bg-black border-t border-gray-800 p-4">
          <div className="text-center text-gray-400">
            Rated {ratings.length} of {players.length} players
          </div>
        </div>
      )}
    </div>
  );
}