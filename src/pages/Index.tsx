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
        .select('id, title, description, url, source, published_at, image_url, is_breaking, is_transfer')
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
      <div className="px-4 pt-4 pb-6">
        <button
          className="w-full"
          onClick={() => latestVideo?.youtube_url ? window.open(latestVideo.youtube_url, '_blank') : navigate('/youtube')}
        >
          <div className="relative bg-black rounded-lg overflow-hidden w-full h-96 px-8">
            <img 
              src={latestVideo?.thumbnail_url || "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"}
              alt={latestVideo?.title || "Latest Video"}
              className="w-full h-full object-contain scale-[1.33]"
            />
            {/* YouTube Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </button>
        {/* Video Title - Below thumbnail with gap */}
        {latestVideo && (
          <div className="px-4 text-center" style={{marginTop: '0.25cm'}}>
            <p className="text-white text-xl font-bold drop-shadow-lg line-clamp-2">
              {latestVideo.title}
            </p>
          </div>
        )}
      </div>

      {/* Latest News Section */}
      <div className="px-4 pb-4">
        <h3 className="text-white text-lg font-semibold mb-4 text-center uppercase">Latest News</h3>
        
        {newsArticles.length > 0 ? (
          <div className="space-y-3">
            {newsArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => article.url && window.open(article.url, '_blank')}
                className="bg-black border border-red-600 rounded-lg cursor-pointer hover:border-red-500 transition-colors h-24 mx-8"
                style={{
                  marginLeft: 'calc(2rem + 1cm + 70px + 75px)', 
                  marginRight: 'calc(2rem + 1cm + 70px + 75px)'
                }}
              >
                <div className="flex h-full">
                  {article.image_url && (
                    <img 
                      src={article.image_url}
                      alt={article.title}
                      className="w-24 h-24 object-cover rounded-l-lg flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
                    <div>
                      <h4 className="text-white text-base font-medium line-clamp-2 flex-1">
                        {article.title}
                      </h4>
                      <p className="text-gray-400 text-xs line-clamp-1 mt-1">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-end text-xs text-gray-500">
                      <span>{formatTimeAgo(article.published_at || '')}</span>
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
          <div className="relative bg-black rounded-lg overflow-hidden w-full px-8" style={{height: 'calc(24rem + 50px)', paddingLeft: 'calc(2rem + 1cm + 70px + 75px)', paddingRight: 'calc(2rem + 1cm + 70px + 75px)'}}>
            <img 
              src="https://jckkhfqswiasnepshxbr.supabase.co/storage/v1/object/public/player-headshots//pick%20xi%20image%20for%20app%20homepage%207.23.png"
              alt="Pick Your XI"
              className="w-full h-full object-contain scale-[1.5]"
              style={{filter: 'brightness(1.1) contrast(1.15) saturate(1.2)'}}
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
          className="w-full relative"
        >
          <div className="relative bg-black rounded-lg overflow-hidden w-full px-8" style={{height: 'calc(24rem + 50px)', paddingLeft: 'calc(2rem + 150px + 0.35px + 40px)', paddingRight: 'calc(2rem + 150px + 0.35px + 40px)'}}>
            <img 
              src="https://jckkhfqswiasnepshxbr.supabase.co/storage/v1/object/public/player-headshots//best%20player%20ratings%20homepage%20image%207.23.png"
              alt="Player Ratings"
              className="w-full h-full object-contain scale-[1.5]"
              style={{filter: 'brightness(1.1) contrast(1.15) saturate(1.2)'}}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
              <h3 className="text-white text-xl font-bold drop-shadow-lg">Player Ratings</h3>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}