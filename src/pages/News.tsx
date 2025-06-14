
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
        <div className="rounded-[12px] overflow-hidden bg-[#1A1A1A] shadow-md mb-3 relative transition-all">
          {topStory?.image_url && (
            <div
              className="w-full flex justify-center items-center bg-[#111]"
              style={{
                borderBottom: "1px solid #181818",
                aspectRatio: "1 / 1",
                minHeight: 220,
                maxHeight: 340,
                overflow: "hidden",
                display: "flex",
              }}
            >
              <img
                src={topStory.image_url}
                alt={topStory.title || "Top story"}
                className="object-cover w-full h-full min-h-[220px] max-h-[340px] rounded-[8px]"
                style={{ borderRadius: 8, objectFit: "cover", aspectRatio: "1/1" }}
              />
            </div>
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
          {/* Soft Divider/Drop Shadow below feature */}
          <div className="absolute left-0 right-0 -bottom-3 h-6 flex justify-center pointer-events-none">
            <div className="w-[68%] h-2 rounded-full blur-md opacity-65 bg-[#07070C]" style={{ filter: "blur(12px)", boxShadow: "0 6px 32px 2px #15131A" }} />
          </div>
        </div>
      </a>

      {/* Article list */}
      <div className="mt-2 space-y-2 px-3 pb-24">
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
              paddingTop: 8, // Reduce padding: original was ~12
              paddingBottom: 8, // Reduce padding: original was ~12
            }}
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title || "Article"}
                className="object-cover w-16 h-16 rounded-[8px] bg-[#111] flex-shrink-0"
                style={{
                  width: 64,
                  height: 64,
                  aspectRatio: "1/1",
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-[#161616] rounded-[8px] text-gray-700">
                <ExternalLink className="w-7 h-7" />
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
            <ExternalLink
              className="w-3.5 h-3.5 text-[#444] group-hover:text-[#EAEAEA] ml-2 flex-shrink-0"
              style={{
                verticalAlign: "middle",
                marginTop: 3,
                marginLeft: 8,
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
