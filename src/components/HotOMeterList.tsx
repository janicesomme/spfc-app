
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// For future: Expand interface as data grows.
interface Player {
  id: number;
  player_name: string;
  club: string;
  score: number; // integer 1-10
}

function getCardGradient(score: number) {
  if (score >= 8) {
    return "bg-gradient-to-r from-red-700 via-red-500 to-yellow-400";
  }
  if (score >= 6) {
    return "bg-gradient-to-r from-orange-500 via-yellow-300 to-yellow-200";
  }
  if (score >= 4) {
    return "bg-gradient-to-r from-yellow-200 to-yellow-100";
  }
  return "bg-gradient-to-r from-gray-100 to-gray-200";
}

export function HotOMeterList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    setLoading(true);

    // Try to fetch: id, player_name, club, and a score (by convention, using "confidence" as 1-10)
    const { data, error } = await supabase
      .from("transfer_reports")
      .select("id, player_name, player_info, confidence")
      .order("confidence", { ascending: false });

    if (error) {
      setPlayers([]);
      setLoading(false);
      return;
    }

    // Try to extract 'club' from player_info string, fallback to 'Unknown'
    const mapped = (data || []).map(row => {
      // Club extraction: very basic for now (can be improved)
      let club = "Unknown";
      if (row.player_info) {
        const clubMatch = (row.player_info as string).match(/(?:Club:|at|from)\s*([A-Za-z\s.]+?)(?:\s|,|\.|\n|$)/i);
        if (clubMatch) club = clubMatch[1].trim().toUpperCase();
      }
      // Get score as int 1-10 (map confidence 0-100 to 1-10)
      let score = row.confidence !== null && row.confidence !== undefined
        ? Math.max(1, Math.round((Number(row.confidence) / 100) * 10))
        : 1;
      return {
        id: row.id,
        player_name: row.player_name ?? "Unknown Player",
        club,
        score
      };
    });

    setPlayers(mapped);
    setLoading(false);
  }

  function handleCardClick(playerId: number) {
    // For future expansion, could navigate to player report.
    // Example: navigate(`/player/${playerId}`);
  }

  return (
    <div className="flex flex-col space-y-4 mt-6 mb-10">
      {loading && (
        <div className="w-full flex justify-center py-10">
          <span className="text-gray-300 text-lg">Loading...</span>
        </div>
      )}
      {!loading && players.length === 0 && (
        <div className="w-full text-center text-gray-400 py-14">
          No transfer targets found.
        </div>
      )}
      {!loading && players.map((player) => (
        <button
          key={player.id}
          className={`
            w-full flex items-center px-5 py-4 rounded-2xl shadow-lg
            focus:outline-none transition transform active:scale-98
            ${getCardGradient(player.score)}
          `}
          onClick={() => handleCardClick(player.id)}
          style={{
            minHeight: 82,
          }}
        >
          <div className="flex flex-col flex-1 text-left">
            <div className="text-white font-extrabold text-lg md:text-xl uppercase leading-snug tracking-wide truncate">
              {player.player_name}
            </div>
            <div className="text-white/70 font-medium text-xs md:text-sm uppercase tracking-wider mt-1">
              {player.club}
            </div>
          </div>
          <div className="ml-6 flex-shrink-0 flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-white drop-shadow-sm tracking-tight">{player.score}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
