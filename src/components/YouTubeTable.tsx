
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

  // Set card width to 380px for mobile-like look, but max 430px for desktop. Height of aspect-[16/9] is width * 9/16.
  // Surround each Card with an anchor tag for full card clickability and accessibility.

  return (
    <div className="flex flex-col items-center gap-4">
      {videos.map((video) => (
        <a
          key={video.id}
          href={video.video_url.replaceAll('"', '')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-[380px] sm:max-w-[430px] block focus:ring-2 focus:ring-red-400 rounded-xl transition"
          tabIndex={0}
          aria-label={`Play video: ${video.title}`}
        >
          <Card
            className="w-full shadow-md border border-red-500/70 animate-fade-in rounded-xl"
            style={{
              boxShadow: '0 4px 16px 0 rgba(150,150,160,0.10)',
              borderWidth: '1.5px',
              borderColor: '#dc2626',
              borderRadius: '1rem',
            }}
          >
            <CardContent className="flex flex-col px-3 pt-3 pb-4">
              <div
                className="w-full aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 mb-2"
                style={{
                  minHeight: 0,
                  minWidth: 0,
                  width: "100%",
                  height: "auto",
                }}
              >
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="object-contain w-full h-full max-h-full max-w-full transition"
                    draggable={false}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Play className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center items-center px-1">
                <div className="text-base font-semibold text-gray-900 text-center break-words leading-tight line-clamp-2">
                  {video.title}
                </div>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
      {videos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No YouTube videos available
        </div>
      )}
    </div>
  );
}
