
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
        .limit(10);

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
      <Card>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {videos.map((video) => (
        <Card
          key={video.id}
          className="w-full max-w-sm mx-auto shadow-md border border-red-500/70 animate-fade-in"
          style={{
            boxShadow: '0 4px 16px 0 rgba(150,150,160,0.10)',
            borderWidth: '1.5px',
            borderColor: '#dc2626',
            borderRadius: '1rem',
          }}
        >
          <CardContent className="flex flex-col p-2 pb-4">
            <div
              className="w-full aspect-[16/9] bg-gray-200 rounded-t-lg overflow-hidden cursor-pointer flex items-center justify-center border border-gray-200"
              onClick={() => window.open(video.video_url, '_blank')}
              tabIndex={0}
              role="button"
              aria-label={`Play video: ${video.title}`}
            >
              {video.thumbnail_url ? (
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 0, minWidth: 0 }}
                  draggable={false}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Play className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center items-center mt-2 px-2">
              <div className="text-md font-semibold text-gray-900 text-center break-words leading-tight">
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
