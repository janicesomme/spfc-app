
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface YouTubeVideo {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  publish_date: string;
  clickbait_blurb: string;
}

export function YouTubeTable() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos();

    // Set up real-time subscription
    const channel = supabase
      .channel('youtube-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'youtube_videos' },
        (payload) => {
          fetchVideos();
          if (payload.eventType === 'INSERT') {
            toast({
              title: "New YouTube Content",
              description: `New video: ${payload.new.title}`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .order('publish_date', { ascending: false })
        .limit(3); // show only 3 latest videos

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch YouTube videos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="max-w-[430px] mx-auto w-full">
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Proper card height so 3 cards fit on most screens: ~160px per card plus spacing (e.g. 20px gap)
  // Using 430px wide (matches nav/tab), 16:9 ratio -> height is 241px, but we can scale height a bit
  // We'll set a fixed width of 100% (max 430px), and fix the aspect ratio
  // Each card includes thumbnail (16:9), then a compact title block

  return (
    <div className="flex flex-col items-center gap-3">
      {videos.map((video) => (
        <Card
          key={video.id}
          className="w-full max-w-[430px] shadow-md border border-red-500/70 animate-fade-in"
          style={{
            boxShadow: '0 4px 16px 0 rgba(150,150,160,0.10)',
            borderWidth: '1.5px',
            borderColor: '#dc2626',
            borderRadius: '1rem',
          }}
        >
          <CardContent className="flex flex-col px-2 pt-2 pb-3">
            <div
              className="w-full aspect-[16/9] bg-gray-200 rounded-t-lg overflow-hidden cursor-pointer flex items-center justify-center border border-gray-200"
              style={{
                minHeight: 0,
                minWidth: 0,
                // Make image height a bit smaller than max 16:9, so three fit more easily
                maxHeight: "160px",
              }}
              onClick={() => window.open(video.video_url, '_blank')}
              tabIndex={0}
              role="button"
              aria-label={`Play video: ${video.title}`}
            >
              {video.thumbnail_url ? (
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover select-none"
                  style={{
                    minHeight: 0,
                    minWidth: 0,
                  }}
                  draggable={false}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Play className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center items-center mt-2 px-1">
              <div className="text-base font-semibold text-gray-900 text-center break-words leading-tight line-clamp-2">
                {video.title}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {videos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No YouTube videos available
        </div>
      )}
    </div>
  );
}
