import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

interface Video {
  video_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  youtube_url: string;
  published_at: string;
}

interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  snippet: string | null;
  url: string;
  source: string;
  published_at: string | null;
  image_url: string | null;
  is_breaking: boolean | null;
  is_transfer: boolean | null;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [latestVideo, setLatestVideo] = useState<Video | null>(null);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      
      // Fetch latest video using the same approach as YouTubeVideoList
      try {
        const { data: videoData, error: videoError } = await (supabase as any)
          .from('latest_videos')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (videoError) {
          console.error('Error fetching video:', videoError);
        } else if (videoData) {
          // Transform the data to match our Video interface
          const transformedVideo: Video = {
            video_id: videoData.video_id || '',
            title: videoData.title || '',
            description: videoData.description || '',
            thumbnail_url: videoData.thumbnail_url || '',
            youtube_url: videoData.youtube_url || '',
            published_at: videoData.published_at || ''
          };
          setLatestVideo(transformedVideo);
          console.log('Set latest video:', transformedVideo);
        } else {
          console.log('No videos found in table');
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }

      // Fetch latest 3 news articles
      console.log('Attempting to fetch news...');
      
      const { data: newsData, error: newsError } = await supabase
        .from('man_utd_news')
        .select('id, title, description, snippet, url, source, published_at, image_url, is_breaking, is_transfer')
        .eq('is_active', true)
        .order('rank', { ascending: true, nullsFirst: false })
        .order('relevance_score', { ascending: false, nullsFirst: false })
        .order('published_at', { ascending: false, nullsFirst: false })
        .limit(10); // Fetch more to allow for deduplication
      
      if (newsError) {
        console.error('Error fetching news:', newsError);
      } else if (newsData && newsData.length > 0) {
        // Remove duplicates based on title and URL
        const uniqueArticles = newsData.reduce((acc: NewsArticle[], current) => {
          const isDuplicate = acc.some(article => 
            article.title === current.title || 
            (article.url && current.url && article.url === current.url)
          );
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []).slice(0, 3); // Take only first 3 unique articles
        
        setNewsArticles(uniqueArticles);
        console.log('Set unique news articles:', uniqueArticles);
      } else {
        console.log('No news articles found in table');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* YouTube Video Section */}
      <div className="px-3 sm:px-4 py-6 sm:py-8 flex flex-col items-center">
        <button
          className="w-full max-w-[340px] sm:max-w-4xl mx-auto block"
          onClick={() => latestVideo?.youtube_url ? window.open(latestVideo.youtube_url, '_blank') : navigate('/youtube')}
        >
          <div className="relative group cursor-pointer w-full">
            <img 
              src={latestVideo?.thumbnail_url || "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"}
              alt={latestVideo?.title || "Latest Video"}
              className="rounded-lg shadow-lg w-full h-auto border-2 border-red-500 object-contain"
              loading="lazy"
            />
            {/* YouTube Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
              <div className="bg-red-600 rounded-full p-3 sm:p-4 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </button>
        {/* Video Title - Below thumbnail with same width */}
        {latestVideo && (
          <div className="w-full max-w-[340px] sm:max-w-4xl mx-auto">
            <h3 className="text-white text-lg sm:text-xl font-bold text-center mt-1 leading-tight px-1">
              {latestVideo.title}
            </h3>
          </div>
        )}
      </div>

      {/* Latest News Section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-4">
        <h3 className="text-youtube-yellow text-lg font-semibold mb-4 text-center uppercase">Latest News</h3>
        
        {newsArticles.length > 0 ? (
          <div className="space-y-3 max-w-4xl mx-auto">
            {newsArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => article.url && window.open(article.url, '_blank')}
                className="bg-black rounded-lg cursor-pointer hover:bg-gray-900 transition-colors"
              >
                <div className="flex flex-col sm:flex-row min-h-32 sm:min-h-40">
                  {article.image_url && (
                    <div className="w-full h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0">
                      <img 
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col justify-start overflow-hidden">
                    <h4 className="text-white text-lg sm:text-xl md:text-2xl font-medium mb-2 sm:mb-3 leading-tight break-words hyphens-auto">
                      {article.title}
                    </h4>
                    <div className="text-gray-400 text-sm sm:text-base leading-relaxed break-words hyphens-auto flex-1">
                      <p className="mb-2 line-clamp-3 sm:line-clamp-none">
                        {article.description}
                      </p>
                      {article.snippet && article.snippet !== article.description && (
                        <p className="line-clamp-2 sm:line-clamp-none">
                          {article.snippet}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-4">
            No news articles available
          </div>
        )}
      </div>

      {/* Pick Your XI Section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-6">
        <h3 className="text-youtube-yellow text-xl sm:text-2xl font-bold text-center mb-2 uppercase">Pick the Starting XI</h3>
        <p className="text-youtube-yellow text-base sm:text-lg text-center mb-1 sm:mb-4">Pick It, Share It, Discuss It</p>
        <button 
          onClick={() => navigate('/pick-your-xi')}
          className="w-full relative max-w-4xl mx-auto block mt-2.5"
        >
          <div className="relative rounded-lg overflow-hidden w-full h-[378px] sm:h-[474px] md:h-[538px] lg:h-[602px]">
            <img 
              src="/lovable-uploads/0f3f8042-8468-4f58-a444-404003a1b24c.png"
              alt="Pick Your XI"
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </div>

      {/* Player Ratings Section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-6">
        <h3 className="text-youtube-yellow text-xl sm:text-2xl font-bold text-center mb-2 uppercase mt-5">Submit Your Player Ratings</h3>
        <p className="text-youtube-yellow text-base sm:text-lg text-center mb-0 sm:mb-4">Rate the Players After Every Match</p>
        <button 
          onClick={() => navigate('/player-ratings')}
          className="w-full relative max-w-4xl mx-auto block mt-2.5"
        >
          <div className="relative rounded-lg overflow-hidden w-full h-[378px] sm:h-[474px] md:h-[538px] lg:h-[602px]">
            <img 
              src="/lovable-uploads/2fd0f491-ae05-4be2-bb8c-10194730ef07.png"
              alt="Submit Your Player Ratings"
              className="w-full h-full object-contain"
            />
          </div>
        </button>
      </div>
    </div>
  );
}