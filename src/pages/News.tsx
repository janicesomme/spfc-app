import React, { useEffect, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string | undefined;
  pubDate: string;
}

function getRelativeTime(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  } catch {
    return "";
  }
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRSSFeed = async () => {
    try {
      console.log('📰 Fetching articles from Supabase Edge Function...');

      // Fetch directly from Edge Function - returns clean, deduplicated articles with real images
      const response = await fetch(
        'https://jckkhfqswiasnepshxbr.supabase.co/functions/v1/fetch-rss-feed'
      );

      if (!response.ok) {
        throw new Error(`Edge function returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success || !data.articles) {
        console.warn('⚠️ No articles from RSS feed');
        setArticles([]);
        setFilteredArticles([]);
        setLoading(false);
        return;
      }

      // Transform RSS articles to NewsArticle format
      const articles: NewsArticle[] = data.articles.map((article: any, index: number) => ({
        id: article.link || `article-${index}`,
        title: article.title || 'Untitled',
        description: article.description || '',
        url: article.link || '',
        image: article.image || undefined,
        pubDate: article.pubDate || new Date().toISOString()
      }));

      setArticles(articles);
      setFilteredArticles(articles);
      setLoading(false);
      console.log(`✅ Loaded ${articles.length} articles from RSS feed`);
    } catch (err) {
      console.error('❌ Error fetching from RSS feed:', err);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchRSSFeed();
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(value.toLowerCase()) ||
        article.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  // Initial load
  useEffect(() => {
    fetchRSSFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[340px] bg-[#0D0D0D]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl min-h-screen mx-auto py-4 bg-[#0D0D0D] px-4">
      {/* Header with search */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#EAEAEA]">Stretford Paddock News</h1>
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
      </div>

      {/* No articles message */}
      {!filteredArticles.length ? (
        <div className="text-center py-16 text-[#A0A0A0]">
          {searchTerm ? "No articles found matching your search" : "No news available"}
        </div>
      ) : (
        <>
          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#202126] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`${article.title} (opens in new tab)`}
                >
                  {/* Article image */}
                  <div className="aspect-video overflow-hidden">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/sp-logo.webp';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#333] to-[#222] flex items-center justify-center">
                        <img
                          src="/sp-logo.webp"
                          alt="SPFC"
                          className="w-1/2 h-1/2 object-contain opacity-50"
                        />
                      </div>
                    )}
                  </div>

                  {/* Article content */}
                  <div className="p-4 space-y-3">
                    {/* Title */}
                    <h2 className="font-bold text-lg text-[#EAEAEA] leading-tight line-clamp-2 hover:text-red-400 transition-colors flex items-start gap-1">
                      <span>{article.title}</span>
                      <span className="text-xs text-gray-400 flex-shrink-0 mt-1" aria-hidden="true">↗</span>
                    </h2>

                    {/* Description */}
                    {article.description && (
                      <p className="text-sm text-[#A0A0A0] line-clamp-3 leading-relaxed">
                        {article.description}
                      </p>
                    )}

                    {/* Published date */}
                    <div className="flex items-center justify-end text-xs text-[#A0A0A0] pt-2 border-t border-[#333]">
                      <span>{getRelativeTime(article.pubDate)}</span>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
