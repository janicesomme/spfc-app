import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, RefreshCw, Search } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArticleImage } from "@/components/ArticleImage";

interface NewsArticle {
  id: string;
  title: string;
  summary: string | null;
  source: string | null;
  image_url: string | null;
  url: string;
  published_at: string | null;
  created_at: string;
}

function getRelativeTime(dateString: string | null): string {
  if (!dateString) return "";
  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true }).replace("about ", "");
  } catch {
    return "";
  }
}

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");
  const [sources, setSources] = useState<string[]>([]);

  const ARTICLES_PER_PAGE = 20;

  const fetchNews = useCallback(async (offset = 0, reset = true) => {
    if (offset === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      let query = supabase
        .from("news_articles")
        .select("id, title, summary, source, image_url, url, published_at, created_at")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      // Apply source filter
      if (selectedSource !== "All") {
        query = query.eq("source", selectedSource);
      }

      // Apply search filter
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,summary.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query
        .range(offset, offset + ARTICLES_PER_PAGE - 1);

      if (error) throw error;

      const articles = data || [];
      
      if (reset) {
        setNews(articles);
      } else {
        setNews(prev => [...prev, ...articles]);
      }
      
      setHasMore(articles.length === ARTICLES_PER_PAGE);
    } catch (err) {
      console.error("Error fetching news:", err);
      if (reset) {
        setNews([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [selectedSource, searchTerm]);

  const fetchSources = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("news_articles")
        .select("source")
        .eq("is_active", true)
        .not("source", "is", null);

      if (error) throw error;

      const uniqueSources = Array.from(new Set(data.map(item => item.source))).filter(Boolean);
      setSources(["All", ...uniqueSources.sort()]);
    } catch (err) {
      console.error("Error fetching sources:", err);
      setSources(["All"]);
    }
  }, []);

  const handleRefresh = () => {
    fetchNews(0, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNews(news.length, false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSourceFilter = (source: string) => {
    setSelectedSource(source);
  };

  // Initial load and source fetch
  useEffect(() => {
    Promise.all([fetchNews(0, true), fetchSources()]);
  }, [fetchNews, fetchSources]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews(0, true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchNews]);

  // Re-fetch when search term or source changes
  useEffect(() => {
    fetchNews(0, true);
  }, [searchTerm, selectedSource, fetchNews]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[340px] bg-[#0D0D0D]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl min-h-screen mx-auto py-4 bg-[#0D0D0D] px-4">
      {/* Header with search and filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#EAEAEA]">Manchester United News</h1>
          <Button
            onClick={handleRefresh}
            variant="ghost"
            size="sm"
            className="text-[#A0A0A0] hover:text-[#EAEAEA]"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A0A0A0]" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-[#1A1A1A] border-[#333] text-[#EAEAEA] placeholder:text-[#A0A0A0]"
          />
        </div>

        {/* Source filters */}
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <Button
              key={source}
              onClick={() => handleSourceFilter(source)}
              variant={selectedSource === source ? "default" : "outline"}
              size="sm"
              className={`${
                selectedSource === source
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-[#1A1A1A] text-[#A0A0A0] border-[#333] hover:bg-[#202126] hover:text-[#EAEAEA]"
              }`}
            >
              {source}
            </Button>
          ))}
        </div>
      </div>

      {/* No articles message */}
      {!news.length ? (
        <div className="text-center py-16 text-[#A0A0A0]">
          {searchTerm || selectedSource !== "All" 
            ? "No articles found matching your criteria" 
            : "No news available"}
        </div>
      ) : (
        <>
          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {news.map((article) => (
              <article
                key={article.id}
                className="bg-[#1A1A1A] rounded-[12px] overflow-hidden hover:bg-[#202126] transition-colors group"
              >
                {/* Article image - clickable */}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-video overflow-hidden cursor-pointer"
                >
                  <ArticleImage
                    src={article.image_url}
                    alt={article.title}
                    className="aspect-video w-full h-full rounded-t-[12px]"
                  />
                </a>

                {/* Article content */}
                <div className="p-4 space-y-3">
                  <h2 className="font-bold text-lg text-[#EAEAEA] leading-tight line-clamp-2">
                    {article.title}
                  </h2>
                  
                  {article.summary && (
                    <p className="text-sm text-[#A0A0A0] line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-[#A0A0A0]">
                    <span className="truncate max-w-[120px]">
                      {article.source || "Unknown"}
                    </span>
                    <span>{getRelativeTime(article.published_at || article.created_at)}</span>
                  </div>

                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-[#A0A0A0] hover:text-[#EAEAEA] hover:bg-[#333]"
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between"
                    >
                      Read More
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Load more button */}
          {hasMore && (
            <div className="text-center">
              <Button
                onClick={handleLoadMore}
                disabled={loadingMore}
                variant="outline"
                className="bg-[#1A1A1A] text-[#A0A0A0] border-[#333] hover:bg-[#202126] hover:text-[#EAEAEA]"
              >
                {loadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Loading...
                  </>
                ) : (
                  "Load More Articles"
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}