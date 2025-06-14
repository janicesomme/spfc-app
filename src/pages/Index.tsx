
import React, { useEffect, useState } from "react";
import { TUSLogo } from "@/components/TUSLogo";
import { HomeBottomNav } from "@/components/HomeBottomNav";
import { ExternalLink, ArrowRight, Play, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";

// -------------------- TOP BANNER --------------------
function HomeHeader() {
  return (
    <header className="w-full bg-[#C8102E] px-0 py-[18px] flex flex-row items-center border-b border-neutral-900 shadow" style={{ minHeight: 75 }}>
      <span className="pl-4 pr-3">
        <TUSLogo size={54} />
      </span>
      <div className="flex flex-col flex-1 min-w-0">
        <span
          className="font-black tracking-tight"
          style={{
            color: "#fff",
            fontSize: "2.2rem",
            fontFamily: "Inter, system-ui, sans-serif",
            lineHeight: 1.05,
            letterSpacing: "0.022em",
          }}
        >
          THE UNITED STAND
        </span>
        <span
          className="mt-[1px] text-[1.09rem] font-semibold leading-snug"
          style={{
            color: "#FFD700",
            fontFamily: "Inter, system-ui, sans-serif",
            letterSpacing: "0.002em",
            fontStyle: "normal",
            opacity: 0.99,
          }}
        >
          Your latest news and transfer news, exactly how you want it.
        </span>
      </div>
    </header>
  );
}

// -------------------- NEWS SECTION --------------------
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

  // Colors from screenshot
  const bgFeatured = "#18181C";
  const bgStory = "#18181C";
  const borderMain = "#23232D";
  const headlineColor = "#FFF";
  const sourceColor = "#FFD700";
  const tsColor = "#D4D4D4";

  return (
    <section className="w-full pt-4 pb-1 px-0">
      <div className="flex items-center justify-between mb-3 px-4">
        <span className="text-white font-black text-xl tracking-wide select-none" style={{ letterSpacing: "0.02em" }}>
          News
        </span>
      </div>
      {loading || articles.length === 0 ? (
        <div className="w-full flex items-center justify-center h-16">
          <span className="text-gray-200 font-semibold animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-[6px] px-2">
          {/* --- Featured (first) story --- */}
          {articles[0] && (
            <a
              key={articles[0].id}
              href={articles[0].url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex rounded-xl border-[1.5px] border-[#23232D] bg-[#18181C] px-2 py-2 gap-3 group hover:shadow transition"
              style={{ minHeight: 74 }}
              tabIndex={0}
            >
              <img
                src={articles[0].image_url || "/placeholder.svg"}
                alt=""
                className="w-[71px] h-[71px] object-cover rounded-lg border-2 border-[#242424] shadow-sm bg-neutral-700"
                style={{ flexShrink: 0 }}
                loading="lazy"
              />
              <div className="flex-1 flex flex-col min-w-0 justify-center">
                <div className="font-bold text-[1.11rem] text-white mb-1.5 truncate group-hover:underline" style={{ letterSpacing: "0.01em" }}>
                  {articles[0].title || <span className="italic text-gray-400">No title</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs uppercase tracking-wider" style={{ color: sourceColor }}>
                    {articles[0].source || "Unknown"}
                  </span>
                  <span className="text-xs font-medium" style={{ color: tsColor, marginTop: "1px" }}>{getRelativeTime(articles[0].published_at)}</span>
                </div>
              </div>
            </a>
          )}
          {/* --- 2 additional stories --- */}
          {articles.slice(1).map((item) => (
            <a
              key={item.id}
              href={item.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md bg-[#18181C] border-[1.5px] border-[#23232D] px-2 py-2 hover:bg-[#1e1e23] transition group"
              tabIndex={0}
              style={{ minHeight: 60 }}
            >
              <img
                src={item.image_url || "/placeholder.svg"}
                alt=""
                className="w-11 h-11 object-cover rounded-lg border border-[#32323b] bg-neutral-800 flex-shrink-0"
                loading="lazy"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="font-semibold text-sm text-white truncate group-hover:underline">
                  {item.title || <span className="italic text-gray-400">No title</span>}
                </div>
                <span className="text-xs font-medium" style={{ color: tsColor }}>{getRelativeTime(item.published_at)}</span>
              </div>
            </a>
          ))}
        </div>
      )}
      {/* --- More News Link --- */}
      <div className="flex justify-between mt-3 px-4">
        <span />
        <Link
          to="/news"
          className="inline-flex items-center gap-[5px] text-sm font-bold text-[#C8102E] hover:text-black/90 underline underline-offset-[2.5px] decoration-[#C8102E] transition group"
          style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: 0.01 }}
        >
          More News
          <ArrowRight className="w-[19px] h-[19px] ml-1 pb-[1px] text-[#C8102E] transition group-hover:text-black/90" strokeWidth={2.4} />
        </Link>
      </div>
      <Separator className="bg-white/85 mt-4 mb-2 rounded-full" style={{ height: 2 }} />
    </section>
  );
}

// -------------------- HOT-O-METER TEASER --------------------
function HotOMeterTeaserCard() {
  return (
    <section className="w-full px-4">
      <div
        className="flex items-center justify-between rounded-2xl border-2 border-[#FF8800] bg-[#23221C] px-4 py-4 shadow-sm"
        style={{ minHeight: 76 }}
      >
        {/* Left: circular orange bg with question mark */}
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#FF8800] to-[#FFD700] text-white text-3xl font-black shadow-xl mr-2 shrink-0 border-[2.5px] border-white/10">
          ?
        </span>
        {/* Center content */}
        <div className="flex-1 flex flex-col items-start px-2 gap-1 min-w-0">
          <span className="text-[1.07rem] font-black text-white tracking-wide leading-tight" style={{ letterSpacing: ".02em"}}>
            Hot-O-Meter
          </span>
          <span className="text-[0.98rem] text-[#FFD700] font-semibold leading-snug opacity-99" style={{ fontStyle: "normal", fontWeight: 600 }}>
            Who&apos;s moving up and who&apos;s falling off the Hot-O-Meter?
          </span>
        </div>
        {/* Right: big white 8 */}
        <span className="block text-[2rem] text-white font-extrabold ml-3 shrink-0 drop-shadow" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>8</span>
      </div>
      {/* View Hot-O-Meter link */}
      <div className="flex justify-end mt-2 mb-1">
        <Link
          to="/hot-o-meter"
          className="inline-flex items-center gap-[5px] text-sm font-bold text-[#C8102E] hover:text-black/90 underline underline-offset-[2.5px] decoration-[#C8102E] transition group"
          style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: 0.01 }}
        >
          View Hot-O-Meter
          <ArrowRight className="w-[17px] h-[17px] ml-0 pb-[1px] text-[#C8102E] transition group-hover:text-black/90" strokeWidth={2.35} />
        </Link>
      </div>
      <Separator className="bg-white/85 mt-3 mb-2 rounded-full" style={{ height: 2 }} />
    </section>
  );
}

// -------------------- VIDEOS SECTION --------------------
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
        <span className="text-white font-black text-[1.13rem] tracking-wide">
          TUS Videos
        </span>
      </div>
      {loading || videos.length === 0 ? (
        <div className="h-20 flex items-center justify-center">
          <span className="text-gray-200 animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-[7px] px-2">
          {videos.map((vid) => (
            <a
              key={vid.id}
              href={vid.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-[#19181E] border border-[#262531] px-2 py-2 focus:ring focus:ring-yellow-300 transition group hover:bg-[#23222a]"
              tabIndex={0}
              style={{ minHeight: 56 }}
            >
              <div className="relative w-[72px] h-[45px] rounded-md overflow-hidden bg-neutral-700 flex-shrink-0 border border-[#232323]">
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
                <span className="absolute right-1 bottom-1 bg-[#C8102E] rounded-full p-[2px] shadow">
                  <Play className="w-[15px] h-[15px] text-white" />
                </span>
              </div>
              <span className="flex-1 text-[1.04rem] font-semibold text-white/90 truncate group-hover:underline">
                {vid.title}
              </span>
            </a>
          ))}
        </div>
      )}
      {/* More Videos link at bottom */}
      <div className="flex justify-end mt-2 px-4">
        <Link
          to="/youtube"
          className="inline-flex items-center gap-[5px] text-sm font-bold text-[#C8102E] hover:text-black/90 underline underline-offset-[2.5px] decoration-[#C8102E] transition group"
          style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: 0.01 }}
        >
          More Videos
          <ArrowRight className="w-[17px] h-[17px] ml-0 pb-[1px] text-[#C8102E] transition group-hover:text-black/90" strokeWidth={2.2} />
        </Link>
      </div>
      <Separator className="bg-white/85 mt-4 mb-0.5 rounded-full" style={{ height: 2 }} />
    </section>
  );
}

// -------------------- PAGE ROOT --------------------
export default function Index() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#131418] w-full max-w-md mx-auto pb-24">
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
