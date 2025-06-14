
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Search, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

  // Toolbar state
  const [searchTerm, setSearchTerm] = useState("");
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
        .order("publish_date", { ascending: false }) // fetch all, let filtering happen client-side
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

  // Filtering logic
  const filteredVideos = useMemo(() => {
    // Filter videos by search term
    let filtered = videos.filter((video) =>
      video.title
        ? video.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
        : false
    );

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

    return filtered.slice(0, 20); // in case many are returned, limit to 20 for perf
  }, [videos, searchTerm, dateFilter]);

  // Loading indicator
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

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-4">
      {/* Top Toolbar */}
      <div className="w-full max-w-[370px] sm:max-w-[430px] flex flex-col sm:flex-row items-stretch gap-2 mb-3 sm:mb-5">
        {/* Search input */}
        <div className="flex flex-1 items-center bg-white rounded-lg border border-gray-200 px-3 py-2">
          <Search size={20} className="mr-2 text-gray-500 shrink-0" aria-hidden />
          <Input
            type="text"
            placeholder="Search videos…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none shadow-none px-0 py-0 focus:ring-0 focus-visible:ring-0 text-[1rem] placeholder:text-gray-400 bg-transparent"
            style={{background:"transparent"}}
            aria-label="Search videos by title"
          />
        </div>
        {/* Date filter */}
        <div className="flex items-center">
          <label htmlFor="youtube-date-filter" className="hidden sm:block mr-2 text-sm font-medium text-gray-600">
            Posted:
          </label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger id="youtube-date-filter" className="w-full sm:w-[135px] focus:ring-0 h-10 text-sm bg-white border-gray-200">
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
        <div className="flex items-center justify-end flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="font-bold text-red-600 px-3 h-10 flex gap-1 items-center border-red-300 hover:bg-red-50 ml-auto sm:ml-2"
            style={{
              borderWidth: "1.5px",
              borderColor: "#ef4444",
            }}
            asChild
          >
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch all on YouTube"
              tabIndex={0}
            >
              <Youtube size={20} className="mr-1" /> <span className="hidden xs:inline">Watch all on</span> YouTube
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
            rel="noopener noreferrer"
            className="w-full max-w-[370px] sm:max-w-[430px] block focus:ring-2 focus:ring-red-400 rounded-xl transition"
            tabIndex={0}
            aria-label={`Play video: ${video.title}`}
            style={{
              marginBottom: "2px",
            }}
          >
            <Card
              className="w-full shadow-md border animate-fade-in rounded-xl"
              style={{
                boxShadow: "0 4px 16px 0 rgba(150,150,160,0.10)",
                borderRadius: "1rem",
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
                  <div className="text-sm sm:text-base font-semibold text-gray-900 text-center break-words leading-tight line-clamp-2">
                    {video.title}
                  </div>
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
