import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FinalPlayer {
  player_id?: string;
  player_name: string;
  position?: string;
  starter?: boolean;
  average_rating?: number;
  is_motm?: boolean;
  match_id: string;
  image_url?: string;
}

export default function FinalPlayerRatings() {
  const [players, setPlayers] = useState<FinalPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // For demo purposes, using a match_id. In production, this would come from route params or context
  const matchId = 'test-match-001';

  useEffect(() => {
    fetchFinalRatings();
  }, []);

  const fetchFinalRatings = async () => {
    try {
      // Use direct fetch to avoid TypeScript issues
      const response = await fetch(`https://jckkhfqswiasnepshxbr.supabase.co/rest/v1/final_player_ratings?select=*&match_id=eq.${matchId}`, {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impja2toZnFzd2lhc25lcHNoeGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDQ0NDIsImV4cCI6MjA2NDgyMDQ0Mn0.3-uOf61O93hSmhP3UvjBRZuAf5vEg6xyUYu77VyVMZ8',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impja2toZnFzd2lhc25lcHNoeGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDQ0NDIsImV4cCI6MjA2NDgyMDQ0Mn0.3-uOf61O93hSmhP3UvjBRZuAf5vEg6xyUYu77VyVMZ8',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch final ratings');
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        setPlayers([]);
        return;
      }

      // Sort by starter status, then by position hierarchy
      const positionOrder: { [key: string]: number } = {
        'GK': 1,
        'CB': 2, 'LB': 2, 'RB': 2, 'LWB': 2, 'RWB': 2,
        'CDM': 3, 'CM': 3, 'CAM': 3, 'LM': 3, 'RM': 3,
        'LW': 4, 'RW': 4, 'CF': 4, 'ST': 4
      };

      const sortedPlayers = data.sort((a: any, b: any) => {
        // First separate starters from subs
        if (a.starter !== b.starter) {
          if (a.starter && !b.starter) return -1;
          if (!a.starter && b.starter) return 1;
        }

        // Within the same starter status, sort by position hierarchy
        const aOrder = positionOrder[a.position || ''] || 999;
        const bOrder = positionOrder[b.position || ''] || 999;
        
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }

        // If same position, sort alphabetically
        return (a.player_name || '').localeCompare(b.player_name || '');
      });

      console.log('Final ratings fetched:', sortedPlayers);
      setPlayers(sortedPlayers);
    } catch (error) {
      console.error('Error fetching final ratings:', error);
      toast({
        title: "Error",
        description: "Failed to load final player ratings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#9d0208] flex items-center justify-center">
        <div className="text-white text-lg">Loading final ratings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#9d0208] text-white">
      {/* Header */}
      <div className="sticky top-0 bg-black border-b border-gray-800 z-10">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">Final Player Ratings</h1>
          <div className="w-6" /> {/* Spacer for center alignment */}
        </div>
      </div>

      {/* Players List */}
      <div className="p-4 space-y-4">
        {players.map((player, index) => {
          const finalRating = player.average_rating ? Math.round(player.average_rating * 10) / 10 : 0;
          
          return (
            <div key={player.player_id || index} className="sm:bg-[#9d0208] bg-black rounded-lg p-3 sm:p-4 border-2 sm:border-black border-white shadow-lg">
              {/* Mobile Layout */}
              <div className="block sm:hidden relative min-h-20">
                {/* Top Row: Player info with position centered between name and starter status */}
                <div className="flex items-center mb-1">
                  {/* Player Image */}
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-700 border border-gray-600">
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
                  
                  {/* Player Name, Position, and Starter Status - evenly spaced */}
                  <div className="flex-1 flex items-center justify-between ml-3">
                    {/* Player Name - Only last name on mobile */}
                    <div>
                      <span className="font-semibold text-white text-sm">
                        {player.player_name.split(' ').slice(-1)[0]}
                      </span>
                    </div>
                    
                    {/* Position - Centered between name and starter status */}
                    <div className="text-gray-300 text-sm font-medium">
                      {player.position}
                    </div>
                    
                    {/* Starter/Sub Status */}
                    <div className={`text-xs font-bold px-2 py-1 rounded ${player.starter ? 'text-green-400 bg-green-400/10' : 'text-blue-400 bg-blue-400/10'}`}>
                      {player.starter ? 'Starter' : 'Sub'}
                    </div>
                  </div>
                </div>

                {/* Final Rating and MOTM - Horizontally aligned */}
                <div className="flex items-center justify-center mt-2 relative">
                  <div className="text-white text-4xl font-bold">
                    {finalRating}
                  </div>
                  
                  {/* MOTM Badge - 30px to the right of rating */}
                  {player.is_motm && (
                    <div className="ml-8">
                      <div className="px-3 py-2 rounded bg-yellow-500 text-black text-3xl font-bold shadow-md">
                        MOTM
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between">
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
                      <span className={`capitalize ${player.starter ? 'text-green-400' : 'text-blue-400'}`}>
                        {player.starter ? 'starter' : 'sub'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Final Rating and MOTM (horizontally aligned) */}
                <div className="flex items-center gap-4">
                  {/* Final Rating */}
                  <div className="text-white text-2xl font-bold">
                    {finalRating}
                  </div>

                  {/* MOTM Button (only if is_motm is true) */}
                  {player.is_motm && (
                    <div className="px-4 py-2 rounded-lg bg-yellow-500 text-red-600 font-bold text-sm">
                      MOTM
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No data message */}
      {players.length === 0 && !loading && (
        <div className="text-center text-white p-8">
          <p className="text-lg">No final ratings available yet.</p>
        </div>
      )}
    </div>
  );
}