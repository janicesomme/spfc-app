
import React, { useEffect, useState } from "react";
import { TUSLogo } from "@/components/TUSLogo";
import { HomeBottomNav } from "@/components/HomeBottomNav";
import { ExternalLink, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";

// ---------- News Section ----------
function NewsPreviewBlock() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("news_items")
      .select("id,title,source,image_url,published_at,url")
      .order("published_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (mounted) {
          setArticles(data || []);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  function getRelativeTime(dateString: string | null): string {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      if (seconds < 60) return `${seconds}s ago`;
      if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
      if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
      return date.toLocaleDateString();
    } catch {
      return "";
    }
  }

  return (
    <section className="w-full pt-2 pb-1 px-0">
      <div className="flex items-baseline justify-between mb-2 px-4">
        <span className="text-white font-black text-xl tracking-wide select-none" style={{ letterSpacing: "0.04em" }}>
          News
        </span>
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center h-16">
          <span className="text-gray-200 font-semibold animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-2">
          {articles.map((item) => (
            <a
              key={item.id}
              href={item.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg bg-[#111]/90 border border-white/10 px-2 py-2 hover:bg-[#222]/90 transition group"
              tabIndex={0}
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt=""
                  className="w-12 h-12 object-cover rounded-md border border-white/30 shadow-sm"
                  loading="lazy"
                />
              ) : (
                <div className="w-12 h-12 rounded-md bg-gray-800 flex items-center justify-center text-2xl text-gray-400">
                  📰
                </div>
              )}
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="font-semibold text-white text-[16px] truncate group-hover:underline">
                  {item.title ?? <span className="italic text-gray-400">No title</span>}
                </div>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-xs text-gray-300 uppercase font-bold tracking-wider">{item.source ?? "Unknown"}</span>
                  <span className="text-xs text-gray-400">{getRelativeTime(item.published_at)}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-70 ml-1 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-2 px-4">
        <span></span>
        <Link
          to="/news"
          className="text-sm font-bold text-[#FFD700] underline underline-offset-2 transition hover:text-white"
        >
          More News →
        </Link>
      </div>
      <Separator className="bg-white/85 mt-4 mb-2 rounded-full" />
    </section>
  );
}

// ---------- Hot-O-Meter Teaser ----------
function HotOMeterTeaserCard() {
  return (
    <div className="w-full px-4">
      <div
        className="flex items-center justify-between rounded-2xl border-2 border-orange-500 bg-[#101012] px-3 py-4 shadow-sm"
      >
        {/* Left: circular question mark */}
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-yellow-300 text-white text-3xl font-black shadow-lg mr-2 shrink-0">
          ?
        </span>
        {/* Middle: heading/subtext */}
        <div className="flex-1 flex flex-col items-start px-2 gap-0.5 min-w-0">
          <span className="text-base font-black text-white tracking-wide leading-tight" style={{ letterSpacing: "0.04em" }}>
            Hot-O-Meter
          </span>
          <span className="text-sm text-[#FFD700] font-medium leading-snug opacity-95" style={{ fontStyle: "italic" }}>
            Who's moving up and who's falling off the Hot-O-Meter?
          </span>
        </div>
        {/* Right: big #8 */}
        <span className="block text-4xl text-white font-extrabold ml-3 shrink-0 drop-shadow" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>8</span>
      </div>
      <div className="flex justify-end mt-1.5 mb-2">
        <Link
          to="/hot-o-meter"
          className="text-sm font-bold text-red-500 underline underline-offset-2 transition hover:text-yellow-400"
        >
          View Hot-O-Meter →
        </Link>
      </div>
      <Separator className="bg-white/85 mt-3 mb-1 rounded-full" />
    </div>
  );
}

// ---------- Videos Section ----------
function YouTubePreviewBlock() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("youtube_videos")
      .select("id,title,video_url,thumbnail_url")
      .order("publish_date", { ascending: false })
      .limit(2)
      .then(({ data }) => {
        if (mounted) {
          setVideos(data || []);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full pb-1">
      <div className="flex items-baseline justify-between mb-2 px-4">
        <span className="text-white font-black text-[1.07rem] tracking-wide">
          TUS Videos
        </span>
      </div>
      {loading ? (
        <div className="h-20 flex items-center justify-center">
          <span className="text-gray-200 animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-2">
          {videos.map((vid) => (
            <a
              key={vid.id}
              href={vid.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-[#101014] border border-white/12 px-2 py-2 focus:ring focus:ring-yellow-300 transition group"
              tabIndex={0}
            >
              <div className="relative w-[60px] h-[38px] rounded-md overflow-hidden bg-gray-700 flex-shrink-0">
                {vid.thumbnail_url ? (
                  <img
                    src={vid.thumbnail_url}
                    alt={vid.title}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-2xl text-gray-500">
                    <Play />
                  </div>
                )}
                <span className="absolute right-1 bottom-1 bg-[#C8102E] rounded-full p-[1.5px]">
                  <Play className="w-4 h-4 text-white" />
                </span>
              </div>
              <span className="flex-1 text-[15px] font-semibold text-white/90 truncate group-hover:underline">
                {vid.title}
              </span>
            </a>
          ))}
        </div>
      )}
      <Separator className="bg-white/85 mt-4 mb-2 rounded-full" />
    </section>
  );
}

// -------------------- HEADER --------------------
function HomeHeader() {
  return (
    <header className="w-full bg-[#C8102E] px-0 py-3 border-b border-white/10 shadow flex flex-row items-center">
      <span className="pl-3">
        <TUSLogo size={48} />
      </span>
      <div className="flex flex-col flex-1 pl-3">
        <span
          className="font-black"
          style={{
            color: "#fff",
            fontSize: "1.75rem",
            fontFamily: "Inter, system-ui, sans-serif",
            letterSpacing: "0.06em",
            lineHeight: 1.13,
            marginBottom: "1px",
          }}
        >
          THE UNITED STAND
        </span>
        <span
          className="text-[1.01rem] font-medium"
          style={{
            color: "#FFD700",
            fontFamily: "Inter, system-ui, sans-serif",
            letterSpacing: "0.01em",
            fontStyle: "italic",
            opacity: 0.96,
            marginTop: "-3px",
          }}
        >
          Your latest news and transfer news, exactly how you want it.
        </span>
      </div>
    </header>
  );
}

// -------------------- PAGE ROOT --------------------
export default function Index() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#C8102E] via-[#E5242A] to-[#FFD700] w-full max-w-md mx-auto pb-24">
      {/* Top Banner */}
      <HomeHeader />

      {/* News */}
      <NewsPreviewBlock />

      {/* Hot-O-Meter Section */}
      <HotOMeterTeaserCard />

      {/* TUS Videos */}
      <YouTubePreviewBlock />

      {/* Bottom nav */}
      <HomeBottomNav />
    </div>
  );
}
