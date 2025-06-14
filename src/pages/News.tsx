
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string | null;
  source: string | null;
  image_url: string | null;
  url: string | null;
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
        .select("id,title,source,image_url,url")
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
      <div className="text-center py-16 text-gray-600">
        No news available
      </div>
    );
  }

  const topStory = news[0];
  const otherArticles = news.slice(1, 7); // Next 6

  return (
    <div className="w-full max-w-md mx-auto py-0 bg-white min-h-screen">
      {/* Top bar - mimic BBC with yellow background */}
      <div className="bg-yellow-400 flex items-center justify-between px-4 py-2">
        <span className="flex items-center gap-2">
          <span className="bg-black text-yellow-400 font-bold px-2 py-1 text-lg rounded-sm tracking-tight">BBC</span>
          <span className="text-black font-semibold text-lg tracking-wide">SPORT</span>
        </span>
        <span className="text-black font-semibold text-lg pr-1">Menu</span>
      </div>

      {/* Top Story */}
      <a
        href={topStory?.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {topStory?.image_url && (
          <img
            src={topStory.image_url}
            alt={topStory.title || "Top story"}
            className="w-full h-56 object-cover"
            style={{
              background: "#ccc",
              borderBottom: "1px solid #eee",
            }}
          />
        )}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">LIVE</span>
            <span className="text-xs text-blue-700 font-medium">
              {topStory?.source || "News"}
            </span>
          </div>
          <div className="text-lg font-bold leading-snug text-gray-900 mb-1">
            {topStory?.title}
          </div>
        </div>
      </a>

      {/* Article list */}
      <div className="divide-y divide-gray-200">
        {otherArticles.map((item) => (
          <a
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
            className="flex items-center px-4 py-3 gap-3 hover:bg-yellow-50 transition"
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title || "Article"}
                className="w-16 h-16 object-cover rounded"
                style={{ background: "#ccc" }}
              />
            ) : (
              <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">
                <ExternalLink />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 truncate">
                {item.title}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {item.source}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
