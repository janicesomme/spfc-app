import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

interface Video {
  id: number;
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
  description: string;
  url: string;
  source: string;
  published_at: string;
  image_url: string;
  is_breaking: boolean;
  is_transfer: boolean;
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
      
      // Fetch latest video
      const { data: videoData, error: videoError } = await supabase
        .from('latest_videos')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(1)
        .single();

      if (videoError) {
        console.error('Error fetching video:', videoError);
      } else {
        console.log('Video data:', videoData);
        setLatestVideo(videoData);
      }

      // Fetch latest 3 news articles - try multiple approaches
      console.log('Attempting to fetch news...');
      
      // First, let's see what's in the table
      const { data: allNews, error: allNewsError } = await supabase
        .from('man_utd_news')
        .select('*');
      
      console.log('All news in table:', allNews);
      console.log('Total news count:', allNews?.length);
      
      if (allNews && allNews.length > 0) {
        // Take the first 3 articles
        const latestNews = allNews.slice(0, 3);
        setNewsArticles(latestNews);
        console.log('Set news articles:', latestNews);
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
      <div className="px-4 pt-4 pb-6">
        <button 
          onClick={() => navigate('/youtube')}
          className="w-full relative"
        >
          <div className="relative bg-black rounded-lg overflow-hidden w-full h-96 px-4">
            <img 
              src={latestVideo?.thumbnail_url || "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"} 
              alt={latestVideo?.title || "Best Final Video"}
              className="w-full h-full object-contain scale-[1.33]"
            />
            {/* YouTube Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </button>
        {/* Video Title - Below thumbnail with gap */}
        {latestVideo && (
          <div className="px-4" style={{marginTop: '0.25cm'}}>
            <p className="text-white text-xl font-bold drop-shadow-lg line-clamp-2">
              {latestVideo.title}
            </p>
          </div>
        )}
      </div>

      {/* Latest News Section */}
      <div className="px-4 pb-4">
        <h3 className="text-white text-lg font-semibold mb-4">Latest News</h3>
        
        {newsArticles.length > 0 ? (
          <div className="space-y-3">
            {newsArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => window.open(article.url, '_blank')}
                className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className="flex space-x-3">
                  {article.image_url && (
                    <img 
                      src={article.image_url}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-white text-sm font-medium line-clamp-2 flex-1">
                        {article.title}
                      </h4>
                      {(article.is_breaking || article.is_transfer) && (
                        <div className="ml-2 flex-shrink-0">
                          {article.is_breaking && (
                            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                              BREAKING
                            </span>
                          )}
                          {article.is_transfer && (
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              TRANSFER
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs line-clamp-2 mb-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.source}</span>
                      <span>{formatTimeAgo(article.published_at)}</span>
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
      <div className="px-4 pb-6">
        <button 
          onClick={() => navigate('/pick-your-xi')}
          className="w-full relative"
        >
          <div className="relative bg-black rounded-lg overflow-hidden w-full h-96 px-4">
            <img 
              src="https://jckkhfqswiasnepshxbr.supabase.co/storage/v1/object/public/player-headshots/pick%20xi%20image%20for%20app%20homepage.png"
              alt="Pick Your XI"
              className="w-full h-full object-contain scale-[1.33]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
              <h3 className="text-white text-xl font-bold drop-shadow-lg">Pick Your XI</h3>
            </div>
          </div>
        </button>
      </div>

      {/* Player Ratings Section */}
      <div className="px-4 pb-6">
        <button 
          onClick={() => navigate('/player-ratings')}
          className="w-full"
        >
          <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
            <h3 className="text-white text-lg font-semibold mb-4">Player Ratings</h3>
            
            {/* Sample Player Rating Rows */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-700 rounded p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P1</span>
                  </div>
                  <span className="text-white">Bruno Fernandes</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-red-500 rounded-full"></div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-700 rounded p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P2</span>
                  </div>
                  <span className="text-white">Marcus Rashford</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-red-500 rounded-full"></div>
                  ))}
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-700 rounded p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P3</span>
                  </div>
                  <span className="text-white">Casemiro</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-red-500 rounded-full"></div>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}