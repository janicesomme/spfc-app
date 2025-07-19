
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LatestVideo {
  id: number;
  video_id: string;
  title: string;
  thumbnail_url: string;
  youtube_url: string;
  description?: string;
  channel_title?: string;
  published_at?: string;
  channel_id?: string;
  embed_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
  published_at_formatted?: string;
  created_at?: string;
  updated_at?: string;
  fetched_at?: string;
}

export function YouTubeVideoList() {
  const [videos, setVideos] = useState<LatestVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestVideos();
  }, []);

  const fetchLatestVideos = async () => {
    try {
      // Use any to bypass TypeScript until types are regenerated
      const { data, error } = await (supabase as any)
        .from('latest_videos')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Try fallback to a different resolution
    if (target.src.includes('hqdefault')) {
      target.src = target.src.replace('hqdefault', 'mqdefault');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Latest Videos
          </h1>
          <p className="text-muted-foreground">
            Latest Content from Our Channel
          </p>
        </div>

        {/* Video List - Single Column */}
        <div className="space-y-8">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col items-center">
              {/* Thumbnail Container */}
              <div className="relative group cursor-pointer" onClick={() => window.open(video.youtube_url, '_blank')}>
                <div className="relative">
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="rounded-lg shadow-lg max-w-full h-auto"
                    style={{ maxHeight: '300px' }}
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <Play className="h-16 w-16 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-yellow-400 text-xl font-bold text-center mt-4 px-4 leading-tight">
                {video.title}
              </h3>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center text-white">
            <p>No videos found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
