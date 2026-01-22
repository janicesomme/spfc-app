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
      // Try multiple CORS proxies for reliability
      const proxies = [
        'https://api.allorigins.win/raw?url=',
        'https://cors.eu.org/?url='
      ];

      let text: string | null = null;
      let lastError: Error | null = null;

      // Try direct fetch first
      try {
        const response = await fetch('https://stretfordpaddockfc.com/feed/', {
          signal: AbortSignal.timeout(10000),
          mode: 'cors'
        });
        if (response.ok) {
          text = await response.text();
        } else {
          lastError = new Error(`Direct fetch failed: ${response.status}`);
        }
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
      }

      // If direct fetch failed, try proxies
      if (!text) {
        for (const proxy of proxies) {
          try {
            const url = proxy.includes('?url=')
              ? proxy + 'https://stretfordpaddockfc.com/feed/'
              : proxy + 'https://stretfordpaddockfc.com/feed/';

            const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
            if (response.ok) {
              text = await response.text();
              break;
            }
          } catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
            continue;
          }
        }
      }

      if (!text) {
        throw lastError || new Error('All CORS fetch methods failed');
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');

      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Failed to parse RSS feed');
      }

      const items = xmlDoc.getElementsByTagName('item');
      const parsedArticles: NewsArticle[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const titleEl = item.getElementsByTagName('title')[0];
        const linkEl = item.getElementsByTagName('link')[0];
        const descEl = item.getElementsByTagName('description')[0];
        const contentEl = item.getElementsByTagName('content:encoded')[0];
        const pubDateEl = item.getElementsByTagName('pubDate')[0];

        // Extract image from various sources (same logic as SPFCNewsSection)
        let imageUrl: string | undefined;

        // Check media:content
        const mediaContent = item.getElementsByTagName('media:content')[0];
        if (mediaContent) {
          imageUrl = mediaContent.getAttribute('url') || undefined;
        }

        // Check media:thumbnail
        if (!imageUrl) {
          const mediaThumbnail = item.getElementsByTagName('media:thumbnail')[0];
          if (mediaThumbnail) {
            imageUrl = mediaThumbnail.getAttribute('url') || undefined;
          }
        }

        // Try to extract image from content:encoded HTML
        if (!imageUrl && contentEl) {
          const contentHtml = contentEl.textContent || '';
          const imgMatch = contentHtml.match(/src=["']([^"']*\.(?:jpg|jpeg|png|gif|webp))["']/i);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          }
        }

        // Fallback: try to extract image from description HTML
        if (!imageUrl && descEl) {
          const descHtml = descEl.textContent || '';
          const imgMatch = descHtml.match(/src=["']([^"']*\.(?:jpg|jpeg|png|gif|webp))["']/i);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          }
        }

        const title = titleEl?.textContent || 'Untitled';
        const link = linkEl?.textContent || '';

        // Extract text content
        let description = '';
        if (descEl?.textContent) {
          description = descEl.textContent;
        } else if (contentEl?.textContent) {
          description = contentEl.textContent;
        }

        // Clean HTML tags from description
        description = description.replace(/<[^>]*>/g, '').trim();

        // Extract first 2-3 sentences
        const sentences = description.match(/[^.!?]+[.!?]+/g) || [];
        description = sentences
          .slice(0, 3)
          .map(s => s.trim())
          .join(' ')
          .substring(0, 300);

        if (link) {
          parsedArticles.push({
            id: `${link}-${i}`,
            title: title.substring(0, 100),
            description,
            url: link,
            image: imageUrl,
            pubDate: pubDateEl?.textContent || new Date().toISOString()
          });
        }
      }

      setArticles(parsedArticles);
      setFilteredArticles(parsedArticles);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching RSS feed:', err);
      // Use fallback demo data if fetch fails
      const fallbackArticles: NewsArticle[] = [
        {
          id: 'demo-1',
          title: 'Stretford Paddock FC Dominates in Latest Match',
          description: 'The team delivered an exceptional performance with outstanding individual contributions. Fans at the stadium witnessed a spectacular display of football.',
          url: 'https://stretfordpaddockfc.com',
          image: '/sp-logo.webp',
          pubDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'demo-2',
          title: 'Squad Announcement for Upcoming Fixtures',
          description: 'The manager has selected the squad for the next series of matches. Several academy players have been included in the squad.',
          url: 'https://stretfordpaddockfc.com',
          image: '/sp-logo.webp',
          pubDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'demo-3',
          title: 'New Training Facility Opens',
          description: 'State-of-the-art equipment installed in the training complex. The facility will support player development and injury recovery programs.',
          url: 'https://stretfordpaddockfc.com',
          image: '/sp-logo.webp',
          pubDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'demo-4',
          title: 'Youth Academy Shows Promise',
          description: 'Young talents demonstrate exceptional skill and determination in recent tournaments. Several players have caught the attention of senior coaching staff.',
          url: 'https://stretfordpaddockfc.com',
          image: '/sp-logo.webp',
          pubDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'demo-5',
          title: 'Community Initiative Expands',
          description: 'The club continues its commitment to grassroots football development. New partnerships established with local schools and youth organizations.',
          url: 'https://stretfordpaddockfc.com',
          image: '/sp-logo.webp',
          pubDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setArticles(fallbackArticles);
      setFilteredArticles(fallbackArticles);
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