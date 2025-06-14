
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
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-700" />
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No news available
      </div>
    );
  }

  const topStory = news[0];
  const otherArticles = news.slice(1, 7);

  return (
    <div className="w-full max-w-md mx-auto py-4 bg-white min-h-screen">
      {/* Reduce top spacing after nav: */}
      <div className="h-2" aria-hidden="true" />
      {/* Top Story */}
      <a
        href={topStory?.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none"
        tabIndex={0}
        aria-label={topStory?.title ?? "Top story"}
      >
        {topStory?.image_url && (
          <img
            src={topStory.image_url}
            alt={topStory.title || "Top story"}
            className="w-full h-56 sm:h-64 object-cover rounded-xl bg-gray-200"
            style={{
              borderBottom: "1px solid #f3f3f3",
            }}
          />
        )}
        <div className="px-4 pt-4 pb-2">
          <div
            className="text-xl font-bold leading-snug text-gray-900 mb-2"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: 3
            }}>
            {topStory?.title}
          </div>
          <div className="flex items-center gap-2 text-xs mt-1" style={{ color: "#A0A0A0" }}>
            <span className="truncate max-w-[130px]">{topStory?.source || "News"}</span>
            <span>&middot;</span>
            <span>{getRelativeTime(topStory?.published_at)}</span>
          </div>
        </div>
      </a>

      {/* Article list */}
      <div className="mt-2 divide-y divide-gray-100">
        {otherArticles.map((item) => (
          <a
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
            className="flex items-center px-4 py-3 gap-3 hover:bg-yellow-50 transition group rounded-lg focus:outline-none"
            tabIndex={0}
            aria-label={item.title ?? "News article"}
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title || "Article"}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-200"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg text-gray-300">
                <ExternalLink className="w-8 h-8" />
              </div>
            )}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div
                className="font-medium text-sm text-gray-900 mb-1 leading-tight"
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 2,
                  fontSize: "0.97rem"
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
            <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-gray-500 ml-2 flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
