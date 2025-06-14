
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Play } from "lucide-react";
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
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            {videos.map((video) => (
              <TableRow
                key={video.id}
                className="hover:bg-red-50"
                style={{ height: '192px' }}
              >
                <TableCell className="align-middle p-4 w-3/5">
                  <div className="flex items-center h-full">
                    <div
                      className="relative w-full max-w-[480px] mx-auto rounded-lg shadow-lg overflow-hidden bg-gray-200"
                      style={{
                        aspectRatio: '16/9',
                        minWidth: '280px',
                        maxWidth: '480px',
                        minHeight: '160px',
                        backgroundColor: '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          style={{ aspectRatio: '16/9', minHeight: 0, minWidth: 0 }}
                          onClick={() => window.open(video.video_url, '_blank')}
                          tabIndex={0}
                          role="button"
                          aria-label={`Play video: ${video.title}`}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <Play className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="align-middle p-4 w-2/5">
                  <div className="flex flex-col h-full justify-center">
                    <div className="text-xl font-semibold text-gray-900 mb-2 break-words leading-tight">
                      {video.title}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {videos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No YouTube videos available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
