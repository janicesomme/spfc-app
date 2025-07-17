
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Youtube, Play } from 'lucide-react';
import { fetchYouTubeVideos, YouTubeVideo } from '@/services/youtube';
import { useToast } from '@/hooks/use-toast';

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@TheUnitedStand";

type TimeFilter = "all" | "week" | "month";

export function YouTubeVideoList() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const { toast } = useToast();

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const fetchedVideos = await fetchYouTubeVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load YouTube videos. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = React.useMemo(() => {
    if (timeFilter === "all") return videos;
    
    const now = new Date();
    let threshold: Date;
    
    if (timeFilter === "week") {
      threshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else { // month
      threshold = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    
    return videos.filter(video => {
      const publishDate = new Date(video.publishedAt);
      return publishDate >= threshold;
    });
  }, [videos, timeFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4">
      {/* Header with YouTube button and filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Button
          variant="outline"
          size="lg"
          className="font-bold text-red-600 border-red-600 hover:bg-red-50 bg-white w-full sm:w-auto"
          asChild
        >
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Youtube size={24} />
            YouTube
          </a>
        </Button>

        <div className="flex items-center gap-2">
          <label htmlFor="time-filter" className="text-sm font-medium text-gray-300">
            Filter:
          </label>
          <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)}>
            <SelectTrigger id="time-filter" className="w-32 bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all" className="text-white hover:bg-gray-700">All Time</SelectItem>
              <SelectItem value="week" className="text-white hover:bg-gray-700">This Week</SelectItem>
              <SelectItem value="month" className="text-white hover:bg-gray-700">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Video List */}
      <div className="space-y-4">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {videos.length === 0 ? "No videos found" : "No videos found for selected time period"}
          </div>
        ) : (
          filteredVideos.map((video) => (
            <a
              key={video.id}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none"
            >
              <Card className="bg-black border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0 w-full sm:w-48 aspect-video bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-center sm:text-left text-lg leading-tight line-clamp-3 mb-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(video.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
