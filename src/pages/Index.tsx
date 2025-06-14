import React, { useEffect, useState } from "react";
import { TUSLogo } from "@/components/TUSLogo";
import { HomeBottomNav } from "@/components/HomeBottomNav";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { OfficialTUSLogo } from "@/components/OfficialTUSLogo";

// -------------------- TOP BANNER (Red Only) --------------------
function HomeHeader() {
  return (
    <header
      className="w-full bg-[#C8102E] px-0 py-[18px] flex flex-row items-center border-b border-neutral-900 shadow"
      style={{ minHeight: 72 }}
    >
      <span className="pl-4 pr-1 flex items-center">
        <OfficialTUSLogo size={58} />
      </span>
      <div className="flex flex-col justify-center flex-1 min-w-0 items-center ml-[-80px]">
        <span
          className="font-semibold tracking-tight"
          style={{
            color: "#fff",
            fontSize: "2.15rem",
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.01em",
            textTransform: "none", // ensure sentence case
          }}
        >
          The United Stand
        </span>
        <span
          className="mt-1 text-[1.01rem] font-normal leading-normal text-center"
          style={{
            color: "#FFD700",
            fontFamily: "Inter, system-ui, sans-serif",
            letterSpacing: "-0.003em",
            fontWeight: 400,
            opacity: 1,
            lineHeight: 1.22,
            textTransform: "none",
            marginTop: "8px",
            display: "block",
            width: "100%",
          }}
        >
          Your latest news and transfer news...
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

  return (
    <section className="w-full pt-4 pb-1 px-0">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-2 px-4">
        <span
          className="font-semibold text-white text-[1.18rem] leading-tight"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          News
        </span>
      </div>
      {/* News Stories */}
      {loading || articles.length === 0 ? (
        <div className="w-full flex items-center justify-center h-16">
          <span className="text-gray-200 font-semibold animate-pulse">
            Loading...
          </span>
        </div>
      ) : (
        <div className="flex flex-col px-2 gap-0">
          {/* --- Featured Story --- */}
          {articles[0] && (
            <>
              <a
                key={articles[0].id}
                href={articles[0].url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-stretch rounded-2xl border border-transparent bg-[#18181C] px-2 py-2 gap-3 group hover:bg-[#232325] transition"
                style={{ minHeight: 90 }}
                tabIndex={0}
              >
                {/* Image */}
                <img
                  src={articles[0].image_url || "/placeholder.svg"}
                  alt=""
                  className="w-[92px] h-[92px] object-cover rounded-xl border-[2px] border-[#2a2a2a] shadow bg-neutral-700 flex-shrink-0"
                  style={{ flexShrink: 0 }}
                  loading="lazy"
                />
                {/* Headline + source (stacked) */}
                <div className="flex flex-col justify-center flex-1 min-w-0 ml-1.5 space-y-[8px]">
                  <div
                    className="font-semibold text-[1.16rem] text-white group-hover:underline leading-tight"
                    style={{
                      fontWeight: 600,
                      lineHeight: 1.18,
                      letterSpacing: "-0.014em",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    {articles[0].title || (
                      <span className="italic text-gray-400">No title</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0">
                    <span className="font-medium text-xs uppercase tracking-wider text-[#FFD700]">
                      {articles[0].source || "Unknown"}
                    </span>
                    <span className="text-xs font-normal text-[#E1E1E1]">
                      {getRelativeTime(articles[0].published_at)}
                    </span>
                  </div>
                </div>
              </a>
              {/* Divider line under first/featured story, now matches ALL OTHERS */}
              <div className="px-1">
                <div className="w-full h-[1.7px] bg-[#e4e4e7] rounded-full mx-2 my-[2px]" />
              </div>
            </>
          )}
          {/* --- Secondary Stories --- */}
          <div className="flex flex-col mt-2 gap-0">
            {articles.slice(1).map((item, idx, arr) => (
              <React.Fragment key={item.id}>
                <a
                  href={item.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-[#18181C] border border-transparent px-2 py-2 hover:bg-[#232325] transition group"
                  tabIndex={0}
                  style={{
                    minHeight: 58,
                  }}
                >
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg border border-[#35353b] bg-neutral-800 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="text-[1rem] font-normal text-white truncate group-hover:underline leading-snug">
                      {item.title || (
                        <span className="italic text-gray-400">No title</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-[2px]">
                      <span className="font-medium text-xs uppercase tracking-wider text-[#FFD700]">
                        {item.source || "Unknown"}
                      </span>
                      <span className="text-xs font-normal text-[#E1E1E1]">
                        {getRelativeTime(item.published_at)}
                      </span>
                    </div>
                  </div>
                </a>
                {/* Accent line between secondary stories (not after the last) */}
                {idx < arr.length - 1 && (
                  <div className="px-1">
                    <div className="w-full h-[1.7px] bg-[#e4e4e7] rounded-full mx-2 my-[2px]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* More News Link */}
      <div className="flex justify-end mt-2 px-4">
        <Link
          to="/news"
          className="inline-flex items-center gap-[5px] font-semibold underline underline-offset-[2.5px] decoration-[#e60000] transition group"
          style={{
            fontSize: "1.01rem",
            letterSpacing: "-0.01em",
            color: "#e60000",
            fontWeight: 600,
          }}
        >
          More News
          <ArrowRight className="w-5 h-5 ml-1 pb-[1px] text-[#e60000] transition group-hover:text-black/90" strokeWidth={2.1} />
        </Link>
      </div>
    </section>
  );
}

// -------------------- HOT-O-METER TEASER --------------------
function HotOMeterTeaserCard() {
  return (
    <section className="w-full px-4 pt-2">
      <div
        className="flex items-center justify-between rounded-2xl bg-[#18181C] px-4 py-4 shadow"
        style={{ minHeight: 74 }}
      >
        {/* Left: circular bg with question mark */}
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#C8102E] to-[#FFD700] text-white text-3xl font-bold shadow mr-3 shrink-0 border-[2.5px] border-white/10">
          ?
        </span>
        {/* Center */}
        <div className="flex-1 flex flex-col items-start px-2 gap-1 min-w-0">
          <span
            className="text-[1.12rem] font-semibold text-white leading-tight"
            style={{ letterSpacing: "-0.007em", fontWeight: 600, fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Hot-O-Meter
          </span>
          <span className="text-[0.98rem] text-[#FFD700] font-normal leading-snug opacity-99" style={{ fontStyle: "normal", fontWeight: 400, lineHeight: 1.2 }}>
            Who&apos;s moving up and who&apos;s falling off the Hot-O-Meter?
          </span>
        </div>
        {/* Score */}
        <span className="block text-[1.95rem] text-white font-bold ml-3 shrink-0 drop-shadow" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
          8
        </span>
      </div>
      {/* View Hot-O-Meter link */}
      <div className="flex justify-end mt-2 mb-1">
        <Link
          to="/hot-o-meter"
          className="inline-flex items-center gap-[5px] font-medium text-[#C8102E] hover:text-black/90 underline underline-offset-[2.5px] decoration-[#C8102E] transition group"
          style={{
            fontSize: "1.01rem",
            letterSpacing: "-0.01em",
            fontWeight: 500,
          }}
        >
          View Hot-O-Meter
          <ArrowRight className="w-5 h-5 ml-1 pb-[1px] text-[#C8102E] transition group-hover:text-black/90" strokeWidth={2.15} />
        </Link>
      </div>
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
      <div className="flex items-center justify-between mb-2 px-4">
        <span
          className="font-semibold text-white text-[1.14rem] leading-tight"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          Latest TUS Videos
        </span>
      </div>
      {loading || videos.length === 0 ? (
        <div className="h-16 flex items-center justify-center">
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
              className="flex items-center gap-3 rounded-xl bg-[#18181C] border border-transparent px-2 py-2 focus:ring focus:ring-yellow-300 transition group hover:bg-[#232325]"
              tabIndex={0}
              style={{ minHeight: 56 }}
            >
              <div className="relative w-[66px] h-[42px] rounded-lg overflow-hidden bg-neutral-700 flex-shrink-0 border border-[#232323]">
                {vid.thumbnail_url ? (
                  <img
                    src={vid.thumbnail_url}
                    alt={vid.title}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-2xl text-gray-500">
                    <Play />
                  </div>
                )}
                <span className="absolute right-1 bottom-1 bg-[#C8102E] rounded-full p-[2px] shadow">
                  <Play className="w-[14.5px] h-[14.5px] text-white" />
                </span>
              </div>
              <span className="flex-1 text-[0.99rem] font-normal text-white/90 truncate group-hover:underline leading-snug" style={{ fontWeight: 400 }}>
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
          className="inline-flex items-center gap-[5px] font-medium text-[#C8102E] hover:text-black/90 underline underline-offset-[2.5px] decoration-[#C8102E] transition group"
          style={{
            fontSize: "1.01rem",
            letterSpacing: "-0.01em",
            fontWeight: 500,
          }}
        >
          More Videos
          <ArrowRight className="w-5 h-5 ml-1 pb-[1px] text-[#C8102E] transition group-hover:text-black/90" strokeWidth={2.1} />
        </Link>
      </div>
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
