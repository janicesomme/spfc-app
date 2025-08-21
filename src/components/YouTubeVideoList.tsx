
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLinkDiv } from '@/lib/external-link-utils';

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
      <div className="px-3 sm:px-4 py-6 sm:py-8 flex flex-col items-center">
        {/* Video List - Single Column, Mobile optimized */}
        <div className="space-y-6 sm:space-y-8 w-full max-w-[340px] sm:max-w-md">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col items-center">
              {/* Thumbnail Container */}
              <ExternalLinkDiv 
                url={video.youtube_url}
                className="relative group w-full"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="rounded-lg shadow-lg w-full h-auto border-2 border-red-500 object-contain"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <Play className="h-16 w-16 text-white drop-shadow-lg" />
                  </div>
                </div>
              </ExternalLinkDiv>
              
              {/* Title - Same width as thumbnail */}
              <h3 className="text-white text-lg sm:text-xl font-bold text-center mt-1 leading-tight w-full px-1">
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
