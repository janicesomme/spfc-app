
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const CARD_BG = "#181819ef";
const CARD_SHADOW = "0 3px 18px 0 rgba(18,9,29,0.22) inset, 0 2.5px 9px 0 rgba(60,40,3,.17)";
const YELLOW = "#FFD700";
const fallbackImage =
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=128&q=80&facepad=2.5";

interface Player {
  id: number;
  player_name: string;
  club: string;
  score: number; // integer 1-10
  image_url?: string | null;
}

function extractClub(info?: string | null): string {
  if (!info) return "";
  const clubMatch = info.match(/(?:Club:|at|from)\s*([A-Za-z0-9\s\.\-']+?)(?=\s|,|\.|\n|$)/i);
  if (clubMatch) return clubMatch[1];
  const alt = info.match(/from\s+([A-Za-z0-9\s\.\-']+)/i) || info.match(/at\s+([A-Za-z0-9\s\.\-']+)/i);
  if (alt) return alt[1];
  return "";
}

function getCardScore(confidence?: number | null): number {
  if (!confidence && confidence !== 0) return 1;
  const score = Math.round((Number(confidence) / 100) * 10);
  return Math.max(1, Math.min(score, 10));
}

function splitName(name: string): { first: string; last: string } {
  // Attempt to split last word as last name, rest as first
  const parts = name.trim().split(" ");
  if (parts.length === 1) return { first: "", last: parts[0] };
  return {
    first: parts.slice(0, -1).join(" "),
    last: parts[parts.length - 1],
  };
}

export function HotOMeterList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line
  }, []);

  async function fetchPlayers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("transfer_reports")
      .select("id, player_name, player_info, confidence, image_url")
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
        score: getCardScore(row.confidence),
      }))
      .sort((a, b) => b.score - a.score);
    setPlayers(mapped);
    setLoading(false);
  }

  // TUS-style: 50px images, tight layout
  const imageSizeClass = "w-[48px] h-[48px] md:w-[54px] md:h-[54px]";

  return (
    <section className="w-full flex flex-col gap-0 pt-2 pb-16">
      {/* Column Headings */}
      <div
        className="flex items-end px-0.5 pb-0.5 select-none"
        style={{
          minHeight: 24,
          marginBottom: 1,
        }}
      >
        <div className="flex-[2] flex flex-col items-end pr-3 min-w-0">
          <span
            className="text-white uppercase"
            style={{
              fontSize: "11.5px",
              letterSpacing: "0.11em",
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
              opacity: 0.92,
            }}
          >
            PLAYER
          </span>
        </div>
        <div className="flex-[1.2] flex flex-col items-end pr-2 min-w-0">
          <span
            className="text-white uppercase"
            style={{
              fontSize: "11.5px",
              letterSpacing: "0.11em",
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
              opacity: 0.92,
            }}
          >
            CLUB
          </span>
        </div>
        <div className="flex-[.8] flex flex-col items-end min-w-0">
          <span
            className="text-white uppercase text-right"
            style={{
              fontSize: "11.5px",
              letterSpacing: "0.11em",
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
              opacity: 0.92,
            }}
          >
            SCORE
          </span>
        </div>
      </div>

      {/* Divider line (subtle) */}
      <div className="h-[1.5px] bg-gradient-to-r from-[#FFD700]/60 via-[#fff]/15 to-[#FFD700]/7 mb-2 mx-[2px] rounded" />

      {loading ? (
        <div className="w-full flex justify-center py-14">
          <span className="text-gray-200 font-semibold text-base animate-pulse">
            Loading...
          </span>
        </div>
      ) : players.length === 0 ? (
        <div className="text-center text-gray-200 font-semibold py-14">
          No transfer targets found.
        </div>
      ) : (
        players.map((player) => {
          const { first, last } = splitName(player.player_name);
          return (
            <div
              key={player.id}
              className={
                `flex items-center rounded-2xl
                px-3.5 py-2.5 md:py-3 mb-[9px]
                min-h-[60px] md:min-h-[62px]
                cursor-default
                transition-all duration-100
                group`
              }
              style={{
                background: CARD_BG,
                boxShadow: CARD_SHADOW,
                borderRadius: 15,
              }}
              tabIndex={0}
              aria-label={`${player.player_name}, ${player.club}, Score ${player.score}`}
            >
              {/* Player Image */}
              <div
                className={`flex-shrink-0 ${imageSizeClass} rounded-full bg-[#24242a] overflow-hidden border border-white/70 shadow-lg mr-3`}
                style={{
                  boxShadow: "0 2px 9px #351f1359, 0 0px 0px 1.8px #FFD70033 inset",
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
              {/* Name and club */}
              <div className="flex-[2] min-w-0 flex flex-col justify-center mr-2">
                {/* First name */}
                {first.length > 0 && (
                  <span
                    className="block text-white/90 !leading-tight"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      marginBottom: "-1.8px",
                      textTransform: "capitalize",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    {first}
                  </span>
                )}
                {/* Last name */}
                <span
                  className="block font-black  text-white"
                  style={{
                    fontSize: "1.18rem",
                    letterSpacing: "0.06em",
                    fontFamily: "Inter, system-ui, sans-serif",
                    textTransform: "uppercase",
                    lineHeight: 1.19,
                  }}
                >
                  {last}
                </span>
                {/* Club */}
                <span
                  className="block mt-0.5 text-[12px] text-white/70 font-semibold capitalize truncate"
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    letterSpacing: "0.045em",
                    lineHeight: 1.07,
                  }}
                  title={player.club}
                >
                  {player.club?.toUpperCase() || ""}
                </span>
              </div>
              {/* Score */}
              <div className="flex-[.8] flex flex-col items-end pr-1">
                <span
                  className="font-black drop-shadow text-[2rem] md:text-[2.3rem] leading-none select-none"
                  style={{
                    color: YELLOW,
                    textShadow: "0 3px 10px #a47518, 0 1px 1px #000, 0 0px 7px #ffd70079",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {player.score}
                </span>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}

// This file is now 200+ lines long and should be split into smaller components soon for maintainability!
