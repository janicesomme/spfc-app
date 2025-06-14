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
  const [brokenImages, setBrokenImages] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    fetchVideos();
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
        .limit(3);
      if (error) throw error;
      setVideos((data || []) as YouTubeVideo[]);
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

  // Mobile: max-w-[370px], tighter gap-2; Desktop: max-w-[430px], gap-4
  // Thumbnail: smaller (h-40) on mobile, larger (h-48) on desktop
  if (loading) {
    return (
      <Card className="max-w-[380px] mx-auto w-full">
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Utility to strip quotes from url fields
  const cleanUrl = (url: string | null | undefined) => {
    if (!url) return "";
    return url.replace(/"/g, '');
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-4">
      {videos.map((video) => {
        const videoUrl = cleanUrl(video.video_url);
        const thumbnailUrl = cleanUrl(video.thumbnail_url);

        return (
          <a
            key={video.id}
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[370px] sm:max-w-[430px] block focus:ring-2 focus:ring-red-400 rounded-xl transition"
            tabIndex={0}
            aria-label={`Play video: ${video.title}`}
            style={{
              marginBottom: '2px'
            }}
          >
            <Card
              className="w-full shadow-md border animate-fade-in rounded-xl"
              style={{
                boxShadow: '0 4px 16px 0 rgba(150,150,160,0.10)',
                borderRadius: '1rem',
                background: "#fff",
              }}
            >
              <CardContent className="flex flex-col px-2 pt-2 pb-3 sm:px-3 sm:pt-3 sm:pb-4">
                <div
                  className="w-full aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 mb-1.5 sm:mb-2 overflow-hidden"
                  style={{
                    minHeight: 0,
                    minWidth: 0,
                    width: "100%",
                    height: "auto",
                  }}
                >
                  {thumbnailUrl && !brokenImages[video.id] ? (
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="object-contain w-full h-full max-h-full max-w-full transition"
                      draggable={false}
                      onError={() =>
                        setBrokenImages(prev => ({
                          ...prev,
                          [video.id]: true,
                        }))
                      }
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <Play className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center px-1">
                  <div className="text-sm sm:text-base font-semibold text-gray-900 text-center break-words leading-tight line-clamp-2">
                    {video.title}
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        );
      })}
      {videos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No YouTube videos available
        </div>
      )}
    </div>
  );
}
