import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, RefreshCw, Search } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
  source: string | null;
  source_logo: string | null;
  published_at: string | null;
  relevance_score: number | null;
  rank: number | null;
  has_image: boolean | null;
  is_breaking: boolean | null;
  is_transfer: boolean | null;
  is_match_report: boolean | null;
  is_active: boolean | null;
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
        .from("man_utd_news")
        .select("id, title, description, url, image_url, source, source_logo, published_at, relevance_score, rank, has_image, is_breaking, is_transfer, is_match_report, is_active, created_at")
        .eq("is_active", true)
       .order("published_at", { ascending: false });

      // Apply source filter
      if (selectedSource !== "All") {
        query = query.eq("source", selectedSource);
      }

      // Apply search filter
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query
        .range(offset, offset + ARTICLES_PER_PAGE - 1);

      if (error) throw error;

      const articles = data || [];
      
      // Remove duplicates based on title and URL
      const uniqueArticles = articles.reduce((acc: NewsArticle[], current) => {
        const isDuplicate = acc.some(article => 
          article.title === current.title || 
          (article.url && current.url && article.url === current.url)
        );
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      if (reset) {
        setNews(uniqueArticles);
      } else {
        // Also check for duplicates against existing articles when loading more
        setNews(prev => {
          const combined = [...prev, ...uniqueArticles];
          return combined.reduce((acc: NewsArticle[], current) => {
            const isDuplicate = acc.some(article => 
              article.title === current.title || 
              (article.url && current.url && article.url === current.url)
            );
            if (!isDuplicate) {
              acc.push(current);
            }
            return acc;
          }, []);
        });
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
        .from("man_utd_news")
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {news.map((article) => (
              <article
                key={article.id}
                className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#202126] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
              >
                {article.url ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener"
                    className="block"
                    aria-label={`${article.title} (opens in new tab)`}
                  >
                    {/* Article image */}
                    <div className="aspect-video overflow-hidden">
                      {article.image_url ? (
                        <img 
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#333] to-[#222] flex items-center justify-center">
                          <span className="text-[#666] text-sm">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Article content */}
                    <div className="p-4 space-y-3">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {article.is_breaking && (
                          <Badge className="bg-red-600 text-white text-xs font-semibold">
                            BREAKING
                          </Badge>
                        )}
                        {article.is_transfer && (
                          <Badge className="bg-blue-600 text-white text-xs font-semibold">
                            TRANSFER
                          </Badge>
                        )}
                        {article.is_match_report && (
                          <Badge className="bg-green-600 text-white text-xs font-semibold">
                            MATCH
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-bold text-lg text-[#EAEAEA] leading-tight line-clamp-2 hover:text-red-400 transition-colors flex items-start gap-1">
                        <span>{article.title}</span>
                        <span className="text-xs text-gray-400 flex-shrink-0 mt-1" aria-hidden="true">↗</span>
                      </h2>
                      <span className="sr-only">(opens in new tab)</span>
                      
                      {/* Description */}
                      {article.description && (
                        <p className="text-sm text-[#A0A0A0] line-clamp-3 leading-relaxed">
                          {article.description}
                        </p>
                      )}

                      {/* Published date */}
                      <div className="flex items-center justify-end text-xs text-[#A0A0A0] pt-2 border-t border-[#333]">
                        <span>{getRelativeTime(article.published_at || article.created_at)}</span>
                      </div>
                    </div>
                  </a>
                ) : (
                  <>
                    {/* Article image */}
                    <div className="aspect-video overflow-hidden">
                      {article.image_url ? (
                        <img 
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#333] to-[#222] flex items-center justify-center">
                          <span className="text-[#666] text-sm">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Article content */}
                    <div className="p-4 space-y-3">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {article.is_breaking && (
                          <Badge className="bg-red-600 text-white text-xs font-semibold">
                            BREAKING
                          </Badge>
                        )}
                        {article.is_transfer && (
                          <Badge className="bg-blue-600 text-white text-xs font-semibold">
                            TRANSFER
                          </Badge>
                        )}
                        {article.is_match_report && (
                          <Badge className="bg-green-600 text-white text-xs font-semibold">
                            MATCH
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-bold text-lg text-[#EAEAEA] leading-tight line-clamp-2">
                        {article.title}
                      </h2>
                      
                      {/* Description */}
                      {article.description && (
                        <p className="text-sm text-[#A0A0A0] line-clamp-3 leading-relaxed">
                          {article.description}
                        </p>
                      )}

                      {/* Published date */}
                      <div className="flex items-center justify-end text-xs text-[#A0A0A0] pt-2 border-t border-[#333]">
                        <span>{getRelativeTime(article.published_at || article.created_at)}</span>
                      </div>
                    </div>
                  </>
                )}
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