
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";
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
          console.log('YouTube change:', payload);
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
      console.error('Error fetching YouTube videos:', error);
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
        <CardHeader>
          <CardTitle className="text-red-600">YouTube Content</CardTitle>
        </CardHeader>
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
      <CardHeader>
        <CardTitle className="text-red-600">YouTube Content Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Video</TableHead>
              <TableHead className="w-1/2">Title</TableHead>
              <TableHead className="hidden md:table-cell">Clickbait Blurb</TableHead>
              <TableHead className="hidden md:table-cell">Published</TableHead>
              <TableHead className="hidden md:table-cell">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow
                key={video.id}
                className="hover:bg-red-50"
                style={{ height: '160px' /* About double the usual row height */ }}
              >
                {/* Video thumbnail: half the row, extra tall */}
                <TableCell className="align-top p-4 w-1/2">
                  <div className="flex items-center h-full">
                    {video.thumbnail_url ? (
                      <img 
                        src={video.thumbnail_url} 
                        alt={video.title}
                        className="w-full max-w-[320px] h-[120px] rounded-lg object-cover shadow-lg"
                        style={{
                          // Ensures it takes up half the row, visually
                          minWidth: '160px',
                          maxWidth: '320px',
                          minHeight: '120px',
                          aspectRatio: '16/7', // Custom wide aspect
                        }}
                      />
                    ) : (
                      <div className="w-full max-w-[320px] h-[120px] bg-gray-200 rounded-lg flex items-center justify-center">
                        <Play className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                </TableCell>
                {/* Title, wrap in other half */}
                <TableCell className="align-top p-4 w-1/2">
                  <div className="flex flex-col h-full justify-between">
                    <div className="text-lg font-semibold text-gray-900 mb-2 break-words leading-snug">
                      {video.title}
                    </div>
                    <div className="md:hidden text-xs text-gray-500 mt-2 truncate">{video.clickbait_blurb}</div>
                    <div className="md:hidden text-xs text-gray-400 mt-1">{video.publish_date ? new Date(video.publish_date).toLocaleDateString() : 'Not published'}</div>
                    <div className="md:hidden mt-3">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(video.video_url, '_blank')}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
                {/* Desktop columns */}
                <TableCell className="hidden md:table-cell align-top p-4 max-w-xs">
                  <div className="text-sm text-gray-600 break-words">
                    {video.clickbait_blurb}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell align-top p-4">
                  {video.publish_date ? new Date(video.publish_date).toLocaleDateString() : 'Not published'}
                </TableCell>
                <TableCell className="hidden md:table-cell align-top p-4">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => window.open(video.video_url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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
