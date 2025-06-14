
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Player {
  id: number;
  player_name: string;
  club: string;
  score: number; // integer 1-10
  image_url?: string | null;
  urgency_level?: string | null; // e.g. "Soon", "Watchlist"
}

// Helper gradient shadow for card
const CARD_SHADOW = "0 2px 12px 0 rgba(30,10,5,0.14)";

// Yellow color for numbers/titles
const YELLOW = "#FFD700";

const fallbackImage =
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=128&q=80&facepad=2.5";

// Get compact club name from player_info
function extractClub(info?: string | null): string {
  if (!info) return "Unknown";
  const clubMatch = info.match(/(?:Club:|at|from)\s*([A-Za-z0-9\s\.\-']+?)(?=\s|,|\.|\n|$)/i);
  if (clubMatch) return clubMatch[1].toUpperCase();
  // Try fallback: "from {ClubName}", "at {ClubName}"
  const alt = info.match(/from\s+([A-Za-z0-9\s\.\-']+)/i) || info.match(/at\s+([A-Za-z0-9\s\.\-']+)/i);
  if (alt) return alt[1].toUpperCase();
  return "Unknown";
}

function getCardScore(confidence?: number | null): number {
  // Score = 1-10 mapped linearly from confidence 0-100
  if (!confidence && confidence !== 0) return 1;
  const score = Math.round((Number(confidence) / 100) * 10);
  return Math.max(1, Math.min(score, 10));
}

function urgencyToStyle(urgency: string | null | undefined) {
  if (!urgency || typeof urgency !== "string") return "";
  const lower = urgency.toLowerCase();
  if (lower === "soon") return "bg-yellow-400/90 text-black";
  if (lower === "watchlist") return "bg-blue-500/80 text-white";
  if (lower === "urgent") return "bg-red-600/90 text-white";
  return "bg-white/50 text-black";
}

export function HotOMeterList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("transfer_reports")
      .select("id, player_name, player_info, confidence, image_url, urgency_level")
      .order("confidence", { ascending: false });

    if (error) {
      setPlayers([]);
      setLoading(false);
      return;
    }

    // Map and sort by score (desc)
    const mapped = (data || [])
      .map(row => ({
        id: row.id,
        player_name: (row.player_name || "Unknown").toUpperCase(),
        club: extractClub(row.player_info),
        image_url: row.image_url,
        urgency_level: row.urgency_level ? row.urgency_level : null,
        score: getCardScore(row.confidence),
      }))
      .sort((a, b) => b.score - a.score);

    setPlayers(mapped);
    setLoading(false);
  }

  return (
    <section className="w-full flex flex-col gap-3 pt-2 pb-16">
      {loading ? (
        <div className="w-full flex justify-center py-14">
          <span className="text-gray-200 font-semibold text-lg animate-pulse">Loading...</span>
        </div>
      ) : players.length === 0 ? (
        <div className="text-center text-gray-200 font-semibold py-14">No transfer targets found.</div>
      ) : (
        players.map((player, idx) => (
          <div
            key={player.id}
            className={`
              flex items-center gap-3 w-full 
              rounded-xl shadow-md
              bg-[#1A1A1A] border-0
              px-3 py-2.5 md:py-3
              transition-all duration-150
              active:scale-[0.98]
              hover:shadow-lg
              min-h-[72px]
              cursor-pointer
              animate-fade-in
            `}
            style={{
              boxShadow: CARD_SHADOW,
              borderRadius: 12,
            }}
            tabIndex={0}
            aria-label={`${player.player_name}, ${player.club}, Score ${player.score}`}
          >
            {/* Player Image */}
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white/80 shadow"
              style={{ boxShadow: "0 2px 7px 0 rgba(40,15,0,0.15)" }}>
              <img
                src={player.image_url || fallbackImage}
                alt={player.player_name}
                className="object-cover w-full h-full block"
                loading="lazy"
              />
            </div>

            {/* Player Info */}
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div
                  className="font-extrabold text-[1.08rem] md:text-lg uppercase tracking-wide text-white truncate"
                  style={{
                    lineHeight: 1.15,
                    textShadow: "0 1px 10px #221d14",
                  }}
                >
                  {player.player_name}
                </div>
                {player.urgency_level && (
                  <span
                    className={`
                      ml-1 px-2 py-0.5 rounded-full
                      font-semibold text-xs uppercase tracking-wide border-0
                      shadow-sm whitespace-nowrap animate-fade-in
                      ${urgencyToStyle(player.urgency_level)}
                    `}
                    style={{letterSpacing: "0.016em"}}
                  >
                    {player.urgency_level}
                  </span>
                )}
              </div>
              <div
                className="uppercase text-xs tracking-widest font-semibold text-white/85 mt-[2px] truncate"
                style={{
                  letterSpacing: "0.11em",
                  textShadow: "0 1px 4px #2a2a1a",
                  fontSize: "0.82rem",
                }}
              >
                {player.club}
              </div>
            </div>

            {/* Score number */}
            <div
              className="ml-2 flex-shrink-0"
              style={{ minWidth: 35, textAlign: "right" }}
            >
              <span
                className="font-black drop-shadow"
                style={{
                  color: YELLOW,
                  fontSize: "2rem",
                  lineHeight: 1,
                  textShadow: "0 2px 6px #a47510, 0 1px 1px #000",
                }}
              >
                {player.score}
              </span>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
