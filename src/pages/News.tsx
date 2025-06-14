
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

interface NewsItem {
  id: string;
  title: string | null;
  source: string | null;
  image_url: string | null;
  url: string | null;
  published_at: string | null;
}

function getRelativeTime(dateString: string | null): string {
  if (!dateString) return "";
  try {
    const date =
      typeof dateString === "string" ? parseISO(dateString) : new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true }).replace("about ", "");
  } catch {
    return "";
  }
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, []);

  async function fetchNews() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("news_items")
        .select("id,title,source,image_url,url,published_at")
        .order("published_at", { ascending: false })
        .limit(7);

      if (error) throw error;
      setNews(data || []);
    } catch (err) {
      setNews([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[340px] bg-[#0D0D0D]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700" />
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="text-center py-16 text-[#A0A0A0] bg-[#0D0D0D]">
        No news available
      </div>
    );
  }

  const topStory = news[0];
  const otherArticles = news.slice(1, 7);

  return (
    <div className="w-full max-w-md min-h-screen mx-auto py-2 bg-[#0D0D0D] px-0">
      {/* Minimal top spacing */}
      <div className="h-1" aria-hidden="true" />
      {/* Top Story */}
      <a
        href={topStory?.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none px-3"
        tabIndex={0}
        aria-label={topStory?.title ?? "Top story"}
      >
        <div className="rounded-[12px] overflow-hidden bg-[#1A1A1A] shadow-sm mb-2">
          {topStory?.image_url && (
            <img
              src={topStory.image_url}
              alt={topStory.title || "Top story"}
              className="w-full h-56 sm:h-64 object-cover bg-[#111]"
              style={{
                borderBottom: "1px solid #181818",
                aspectRatio: "16/9",
              }}
            />
          )}
          <div className="px-4 pt-3 pb-3">
            <div
              className="font-bold text-lg md:text-xl leading-snug text-[#EAEAEA] mb-0"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 2,
              }}
            >
              {topStory?.title}
            </div>
            <div className="flex items-center gap-2 text-xs mt-2" style={{ color: "#A0A0A0" }}>
              <span className="truncate max-w-[130px]">{topStory?.source || "News"}</span>
              <span>&middot;</span>
              <span>{getRelativeTime(topStory?.published_at)}</span>
            </div>
          </div>
        </div>
      </a>

      {/* Article list */}
      <div className="mt-2 space-y-2 px-3 pb-24"> {/* Bottom padding for bottom bar */}
        {otherArticles.map((item) => (
          <a
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
            className="flex items-center gap-3 group rounded-[12px] bg-[#1A1A1A] px-3 py-2 hover:bg-[#202126] transition focus:outline-none"
            tabIndex={0}
            aria-label={item.title ?? "News article"}
            style={{
              boxShadow: "0 1px 4px 0 rgba(0,0,0,.065)",
              alignItems: "flex-start",
            }}
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title || "Article"}
                className="w-16 h-16 object-cover rounded-lg bg-[#111] flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-[#161616] rounded-lg text-gray-700">
                <ExternalLink className="w-8 h-8" />
              </div>
            )}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div
                className="font-semibold text-base text-[#EAEAEA] mb-1 leading-snug"
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 2,
                }}
              >
                {item.title}
              </div>
              <div className="flex items-center gap-2 text-xs mt-0.5" style={{ color: "#A0A0A0" }}>
                <span className="truncate max-w-[90px]">{item.source || "News"}</span>
                <span>&middot;</span>
                <span>{getRelativeTime(item.published_at)}</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#444] group-hover:text-[#EAEAEA] ml-2 flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
