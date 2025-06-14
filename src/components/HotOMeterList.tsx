
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Helper gradient shadow for card
const CARD_SHADOW = "0 2px 12px 0 rgba(30,10,5,0.14)";
const YELLOW = "#FFD700";
const fallbackImage =
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=128&q=80&facepad=2.5";

interface Player {
  id: number;
  player_name: string;
  club: string;
  score: number; // integer 1-10
  image_url?: string | null;
  urgency_level?: string | null; // e.g. "Soon", "Watchlist"
}

function extractClub(info?: string | null): string {
  if (!info) return "Unknown";
  const clubMatch = info.match(/(?:Club:|at|from)\s*([A-Za-z0-9\s\.\-']+?)(?=\s|,|\.|\n|$)/i);
  if (clubMatch) return clubMatch[1].toUpperCase();
  const alt = info.match(/from\s+([A-Za-z0-9\s\.\-']+)/i) || info.match(/at\s+([A-Za-z0-9\s\.\-']+)/i);
  if (alt) return alt[1].toUpperCase();
  return "UNKNOWN";
}

function getCardScore(confidence?: number | null): number {
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

  // Responsive sizing for player image
  const imageSizeClass =
    "w-[54px] h-[54px] md:w-[60px] md:h-[60px]";

  // Muted club text for sublabel
  const clubClass =
    "uppercase text-xs font-bold text-[#B0B4B8] mt-0.5 tracking-widest";

  return (
    <section className="w-full flex flex-col gap-0 pt-2 pb-20">
      {/* Header Row */}
      <div className="flex items-center px-1 py-2 select-none" style={{ minHeight: 36 }}>
        <div className="flex-[2] min-w-0">
          <span
            className="font-black text-white text-[1.15rem] md:text-[1.18rem] tracking-widest uppercase"
            style={{
              letterSpacing: "0.11em",
              textShadow: "0 1px 10px #181516",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            PLAYER
          </span>
        </div>
        <div className="flex-[1.4] min-w-0">
          <span
            className="font-black text-white text-[1.15rem] md:text-[1.18rem] tracking-widest uppercase"
            style={{
              letterSpacing: "0.14em",
              textShadow: "0 1px 10px #181516",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            CLUB
          </span>
        </div>
        <div className="flex-[.8] text-right">
          <span
            className="font-black text-white text-[1.15rem] md:text-[1.18rem] tracking-widest uppercase"
            style={{
              letterSpacing: "0.14em",
              textShadow: "0 1px 10px #181516",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            SCORE
          </span>
        </div>
      </div>
      {/* Divider */}
      <div className="h-[2px] bg-gradient-to-r from-[#FFD700]/70 via-[#ffd700]/30 to-[#FFD700]/10 mb-3 mx-0 rounded" />
      {loading ? (
        <div className="w-full flex justify-center py-14">
          <span className="text-gray-200 font-semibold text-lg animate-pulse">
            Loading...
          </span>
        </div>
      ) : players.length === 0 ? (
        <div className="text-center text-gray-200 font-semibold py-14">
          No transfer targets found.
        </div>
      ) : (
        players.map((player) => (
          <div
            key={player.id}
            className={
              `flex items-center bg-[#201110] rounded-2xl
              border-0 shadow-xl
              px-2.5 py-4 md:py-5 mb-2.5
              transition-all duration-150
              min-h-[68px] md:min-h-[72px]
              cursor-pointer
              hover:border-yellow-400/80 focus:ring-2 focus:ring-yellow-400/80
              active:scale-[0.97]
              ring-inset`
            }
            style={{
              boxShadow: CARD_SHADOW,
              borderRadius: 15,
            }}
            tabIndex={0}
            aria-label={`${player.player_name}, ${player.club}, Score ${player.score}`}
          >
            {/* Player Image */}
            <div
              className={`flex-shrink-0 ${imageSizeClass} rounded-full bg-[#29150f] overflow-hidden border-2 border-white/85 shadow-lg mr-4`}
              style={{
                boxShadow: "0 2px 7px 0 #825b18, 0 0px 0px 2px #FFD70033",
              }}
            >
              <img
                src={player.image_url || fallbackImage}
                alt={player.player_name}
                className="object-cover w-full h-full block"
                loading="lazy"
                draggable={false}
              />
            </div>
            {/* Player Info & Club */}
            <div className="flex flex-col flex-[2] min-w-0 mr-2">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-black text-white text-[1.14rem] md:text-lg uppercase tracking-wide truncate"
                  style={{
                    lineHeight: 1.16,
                    textShadow: "0 1px 12px #221d14",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {player.player_name}
                </span>
                {player.urgency_level && (
                  <span
                    className={`
                      ml-2 px-2 py-0.5 rounded font-extrabold text-xs uppercase tracking-wide border-0
                      shadow-xs whitespace-nowrap animate-fade-in
                      ${urgencyToStyle(player.urgency_level)}
                    `}
                    style={{
                      letterSpacing: "0.018em",
                      fontFamily: "Inter, system-ui, sans-serif",
                      textShadow: "0 1px 7px #ffe79350",
                    }}
                  >
                    {player.urgency_level}
                  </span>
                )}
              </div>
              <div
                className={clubClass}
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  textShadow: "0 1px 6px #23190e7d",
                  fontSize: "0.89rem",
                  letterSpacing: "0.13em",
                }}
              >
                {player.club}
              </div>
            </div>
            {/* Score */}
            <div className="flex-[.8] text-right flex flex-col items-end">
              <span
                className="font-extrabold drop-shadow text-[2.25rem] md:text-[2.5rem] leading-none select-none"
                style={{
                  color: YELLOW,
                  textShadow: "0 3px 10px #a47510, 0 1px 1px #000, 0 0px 9px #ffd70098",
                  fontFamily: "Inter, system-ui, sans-serif",
                  letterSpacing: "0.04em",
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
