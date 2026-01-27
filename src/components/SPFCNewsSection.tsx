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
      // Use Supabase Edge Function to fetch RSS feed (works on localhost and production)
      const response = await fetch('https://jckkhfqswiasnepshxbr.supabase.co/functions/v1/fetch-rss-feed');

      if (!response.ok) {
        throw new Error(`Edge function returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success || !data.articles) {
        setArticles([]);
        setLoading(false);
        return;
      }

      // Transform RSS articles to RSSArticle format
      const parsedArticles: RSSArticle[] = data.articles.slice(0, 5).map((article: any) => ({
        title: article.title || 'Untitled',
        link: article.link || '',
        description: article.description || '',
        image: article.image || undefined,
        pubDate: article.pubDate || new Date().toISOString()
      }))

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
