
import React, { useEffect, useState } from "react";
import { TUSLogo } from "@/components/TUSLogo";
import { HeadlineBlock } from "@/components/HeadlineBlock";
import { HomeBottomNav } from "@/components/HomeBottomNav";
import { ExternalLink, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <section className="w-full pt-2 pb-2 px-2">
      <div className="flex items-baseline justify-between mb-2 px-1">
        <span className="text-white font-bold text-[1.1rem] tracking-wide">
          Latest Headlines
        </span>
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center h-20">
          <span className="text-gray-200 font-semibold text-base animate-pulse">
            Loading...
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {articles.map((item) => (
            <a
              key={item.id}
              href={item.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#111]/80 border border-white/15 px-2 py-2 hover:bg-[#212]/90 transition group"
              tabIndex={0}
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt=""
                  className="w-12 h-12 object-cover rounded-md flex-shrink-0 border border-white/40 shadow-sm"
                  loading="lazy"
                />
              ) : (
                <div className="w-12 h-12 rounded-md bg-gray-800 flex items-center justify-center text-2xl text-gray-400">
                  📰
                </div>
              )}
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="font-semibold text-white text-[15px] truncate group-hover:underline">
                  {item.title ?? <span className="italic text-gray-400">No title</span>}
                </div>
                <div className="flex gap-2 items-center mt-0.5">
                  <span className="text-xs text-gray-300 tracking-wide uppercase font-bold">
                    {item.source ?? "Unknown"}
                  </span>
                  <span className="text-xs text-gray-400 font-normal">{getRelativeTime(item.published_at)}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-70 ml-1 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      )}
      <div className="flex justify-end mt-2 mr-1">
        <Link
          to="/news"
          className="text-[15px] font-bold text-[#FFD700] underline underline-offset-2 transition hover:text-white"
        >
          More News →
        </Link>
      </div>
      <Separator className="bg-white/80 mt-4 mb-2 rounded-full" />
    </section>
  );
}

function HotOMeterTeaserCard() {
  // Visual avatar/question mark
  return (
    <div
      className="flex flex-col items-center justify-between rounded-2xl border-2 border-orange-500 bg-[#0e0e0f] h-full px-2 py-4 min-h-[140px] text-center shadow-sm"
      style={{ minWidth: 0 }}
    >
      <div className="mb-1">
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-yellow-300 text-white text-4xl font-bold shadow-lg mb-2">
          ?
        </span>
      </div>
      <span className="block text-4xl font-[900] text-white drop-shadow" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>8</span>
      <span className="text-sm text-white mt-1.5 mb-2 font-semibold leading-tight px-1">
        Who’s moving up and who’s falling off the Hot-O-Meter?
      </span>
      <Link
        to="/hot-o-meter"
        className="text-[13px] font-bold text-orange-400 underline underline-offset-2 transition hover:text-yellow-300"
      >
        View Hot-O-Meter →
      </Link>
    </div>
  );
}

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
    <section className="w-full px-1">
      <span className="text-white font-bold text-[1.05rem] px-1 pt-0 pb-1 block mb-1">
        Latest TUS Videos
      </span>
      {loading ? (
        <div className="h-28 flex items-center justify-center">
          <span className="text-gray-200 animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {videos.map((vid) => (
            <a
              key={vid.id}
              href={vid.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-[#101014] border border-white/12 px-2 py-2 focus:ring focus:ring-yellow-300 transition group"
              tabIndex={0}
            >
              <div className="relative w-[52px] h-[32px] rounded-md overflow-hidden bg-gray-700 flex-shrink-0">
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
                  <Play className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
              <span className="flex-1 text-xs font-semibold text-white/90 truncate group-hover:underline">
                {vid.title}
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Index() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#C8102E] via-[#E5242A] to-[#FFD700] w-full max-w-md mx-auto pb-24">
      {/* Top Banner Row */}
      <header className="w-full flex items-center justify-between gap-3 bg-[#C8102E] py-3 px-3 border-b border-white/10 shadow" style={{ minHeight: 0 }}>
        <TUSLogo size={46} />
        <div className="flex-1 flex flex-col items-start justify-center ml-2">
          <span className="sr-only">The United Stand</span>
        </div>
        {/* Just logo left for now */}
      </header>

      {/* Headline block */}
      <HeadlineBlock />

      {/* News block */}
      <NewsPreviewBlock />

      {/* Split section */}
      <div className="flex flex-row items-stretch gap-2 px-2 pt-1 pb-3 min-h-[144px]">
        {/* Hot-O-Meter */}
        <div className="flex-1">
          <HotOMeterTeaserCard />
        </div>
        {/* Vertical divider */}
        <div className="w-[3px] rounded-full bg-white/70 my-3 mx-1" />
        {/* Videos */}
        <div className="flex-1 flex flex-col">
          <YouTubePreviewBlock />
        </div>
      </div>

      {/* Bottom nav */}
      <HomeBottomNav />
    </div>
  );
}
