import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
// Removed import of Search and Input as they're not needed anymore

interface YouTubeVideo {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  publish_date: string | null;
  clickbait_blurb: string | null;
}

type DateFilter = "all" | "7d" | "30d";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@TheUnitedStand";

export function YouTubeTable() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [brokenImages, setBrokenImages] = useState<{ [id: string]: boolean }>({});

  // Removed searchTerm state
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  // Fetch videos logic
  useEffect(() => {
    fetchVideos();
    const channel = supabase
      .channel("youtube-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "youtube_videos" },
        (payload) => {
          fetchVideos();
          if (payload.eventType === "INSERT") {
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
        .from("youtube_videos")
        .select("*")
        .order("publish_date", { ascending: false });
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

  // Utility to strip quotes from url fields
  const cleanUrl = (url: string | null | undefined) => {
    if (!url) return "";
    return url.replace(/"/g, "");
  };

  // Filtering logic (now only filters by date)
  const filteredVideos = useMemo(() => {
    let filtered = videos;
    if (dateFilter !== "all") {
      const now = new Date();
      let threshold: Date;
      if (dateFilter === "7d") {
        threshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else {
        threshold = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
      filtered = filtered.filter((video) => {
        if (!video.publish_date) return false;
        const pubDate = new Date(video.publish_date);
        return pubDate >= threshold;
      });
    }
    return filtered.slice(0, 20); // Limit for perf
  }, [videos, dateFilter]);

  // Loading indicator
  if (loading) {
    return (
      <Card className="max-w-[380px] mx-auto w-full bg-black border-black">
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      {/* --- Date Filter + Watch on YouTube row --- */}
      <div className="w-full flex flex-col items-center gap-2 mb-4">
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
          {/* Date filter */}
          <div className="flex items-center">
            <label htmlFor="youtube-date-filter" className="mr-2 text-sm font-medium text-gray-600">
              Posted:
            </label>
            <Select value={dateFilter} onValueChange={v => setDateFilter(v as DateFilter)}>
              <SelectTrigger id="youtube-date-filter" className="w-36 focus:ring-0 h-10 text-sm bg-white border-gray-200">
                <SelectValue placeholder="All time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Watch all on YouTube button */}
          <Button
            variant="outline"
            size="sm"
            className="font-bold text-red-600 px-3 h-10 flex gap-1 items-center border-red-300 hover:bg-red-50"
            style={{
              borderWidth: "1.5px",
              borderColor: "#ef4444",
            }}
            asChild
          >
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener"
              aria-label="Watch all on YouTube (opens in new tab)"
              tabIndex={0}
              className="flex items-center"
            >
              <Youtube size={20} className="mr-1" /> <span className="hidden xs:inline">Watch all on</span> YouTube
              <span className="ml-1 text-xs" aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Videos */}
      {filteredVideos.map((video) => {
        const videoUrl = cleanUrl(video.video_url);
        const thumbnailUrl = cleanUrl(video.thumbnail_url);

        return (
          <a
            key={video.id}
            href={videoUrl}
            target="_blank"
            rel="noopener"
            className="w-full max-w-[370px] sm:max-w-[430px] block focus:ring-2 focus:ring-red-400 rounded-xl transition"
            tabIndex={0}
            aria-label={`Play video: ${video.title} (opens in new tab)`}
            style={{
              marginBottom: "0", // Reduce the vertical gap to be as close as possible
            }}
          >
            <Card
              className="w-full shadow-md border rounded-xl bg-black border-black animate-fade-in"
              style={{
                boxShadow: "0 4px 16px 0 rgba(150,150,160,0.10)",
                borderRadius: "1rem",
                background: "#000",
                borderColor: "#000",
              }}
            >
              <CardContent className="flex flex-col px-2 pt-2 pb-3 sm:px-3 sm:pt-3 sm:pb-4">
                <div
                  className="w-full aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 mb-[1px] sm:mb-[1px] overflow-hidden"
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
                        setBrokenImages((prev) => ({
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
                  <div className="text-sm sm:text-base font-semibold text-white text-center break-words leading-tight line-clamp-2 flex items-center gap-1">
                    {video.title}
                    <span className="text-xs text-gray-400" aria-hidden="true">↗</span>
                  </div>
                  <span className="sr-only">(opens in new tab)</span>
                </div>
              </CardContent>
            </Card>
          </a>
        );
      })}
      {filteredVideos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No YouTube videos found
        </div>
      )}
    </div>
  );
}
