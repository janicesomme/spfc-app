import React, { useState, useEffect } from 'react';
import { ExternalLinkDiv } from '@/lib/external-link-utils';

interface RSSArticle {
  title: string;
  link: string;
  description: string;
  image?: string;
  pubDate: string;
}

export const SPFCNewsSection = () => {
  const [articles, setArticles] = useState<RSSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  const fetchRSSFeed = async () => {
    try {
      // Fetch RSS feed using CORS proxy
      const response = await fetch('https://api.allorigins.win/raw?url=https://stretfordpaddockfc.com/feed/');
      const text = await response.text();

      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');

      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Failed to parse RSS feed');
      }

      // Extract items
      const items = xmlDoc.getElementsByTagName('item');
      const parsedArticles: RSSArticle[] = [];

      for (let i = 0; i < Math.min(items.length, 5); i++) {
        const item = items[i];

        const titleEl = item.getElementsByTagName('title')[0];
        const linkEl = item.getElementsByTagName('link')[0];
        const descEl = item.getElementsByTagName('description')[0];
        const contentEl = item.getElementsByTagName('content:encoded')[0];
        const pubDateEl = item.getElementsByTagName('pubDate')[0];

        // Try to extract image from various sources
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

        // Try to extract image from description HTML
        if (!imageUrl && descEl) {
          const descHtml = descEl.textContent || '';
          const imgMatch = descHtml.match(/src=["']([^"']*\.(?:jpg|jpeg|png|gif|webp))["']/i);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          }
        }

        const title = titleEl?.textContent || 'Untitled';
        const link = linkEl?.textContent || '';

        // Extract text content (2-3 sentences)
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
            title: title.substring(0, 100), // Truncate title if needed
            link,
            description,
            image: imageUrl,
            pubDate: pubDateEl?.textContent || new Date().toISOString()
          });
        }
      }

      setArticles(parsedArticles);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching RSS feed:', err);
      setError('Failed to load news articles');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-4">
        <h3 className="text-youtube-yellow text-lg font-semibold mb-4 text-center uppercase">Latest News</h3>
        <div className="text-gray-400 text-center py-4">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-4">
        <h3 className="text-youtube-yellow text-lg font-semibold mb-4 text-center uppercase">Latest News</h3>
        <div className="text-gray-400 text-center py-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-4">
      <h3 className="text-youtube-yellow text-lg font-semibold mb-4 text-center uppercase">Latest News</h3>

      {articles.length > 0 ? (
        <div className="space-y-3 max-w-4xl mx-auto">
          {articles.map((article, index) => (
            <ExternalLinkDiv
              key={`${article.link}-${index}`}
              url={article.link}
              className="bg-black rounded-lg hover:bg-gray-900 transition-colors"
            >
              <div className="flex flex-col sm:flex-row min-h-32 sm:min-h-40">
                {/* Image Container */}
                <div className="w-full h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 bg-red-600 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none overflow-hidden">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to SPFC logo if image fails to load
                        e.currentTarget.src = '/sp-logo.webp';
                      }}
                    />
                  ) : (
                    // SPFC logo placeholder
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src="/sp-logo.webp"
                        alt="SPFC"
                        className="w-3/4 h-3/4 object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col justify-start overflow-hidden">
                  <h4 className="text-white text-lg sm:text-xl md:text-2xl font-medium mb-2 sm:mb-3 leading-tight break-words hyphens-auto">
                    {article.title}
                  </h4>
                  <div className="text-gray-400 text-sm sm:text-base leading-relaxed break-words hyphens-auto flex-1">
                    <p className="line-clamp-3 sm:line-clamp-none">
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            </ExternalLinkDiv>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-4">
          No news articles available
        </div>
      )}
    </div>
  );
};
