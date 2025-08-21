
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isExternalUrl, openUrl } from "@/lib/external-link-utils";

// Only the columns that are present in your news_items table!
interface NewsItem {
  id: string;
  title: string | null;
  source: string | null;
  image_url: string | null;
  published_at: string | null;
  url: string | null;
}

export function NewsTable() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();

    // Real-time subscription is disabled or can be readded if needed, but since 'category' doesn't exist, 
    // we can't describe new news by `category` in the toast.
    // You can add a different message if you wish.
    // -- disabled for now:

    // const channel = supabase
    //   .channel('news-changes')
    //   .on('postgres_changes',
    //     { event: '*', schema: 'public', table: 'news_items' },
    //     (payload) => {
    //       fetchNews();

    //       if (payload.eventType === 'INSERT') {
    //         toast({
    //           title: "Breaking News",
    //           description: `New news from ${payload.new.source || "Unknown"}`,
    //         });
    //       }
    //     }
    //   )
    //   .subscribe();

    // return () => {
    //   supabase.removeChannel(channel);
    // };
    // }, [toast]);

  }, [toast]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('id,title,summary,source,image_url,url,published_at,created_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(15);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch news items",
        variant: "destructive",
      });
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  // Format a friendly published time string
  function getRelativeTime(dateString: string | null): string {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      if (seconds < 60) return `${seconds}s ago`;
      if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
      if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
      return date.toLocaleDateString();
    } catch {
      return "";
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">News Intelligence</CardTitle>
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
        <CardTitle className="text-red-600">Latest News Intelligence</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id} className="hover:bg-red-50">
                <TableCell className="font-medium max-w-md">
                  <div className="truncate" title={item.title || undefined}>
                    {item.title || <span className="italic text-gray-400">No title</span>}
                  </div>
                </TableCell>
                <TableCell>{item.source || <span className="italic text-gray-400">Unknown</span>}</TableCell>
                <TableCell>
                  {item.image_url
                    ? <img src={item.image_url} alt="news" className="w-10 h-10 object-cover rounded" />
                    : <span className="italic text-gray-400">No image</span>
                  }
                </TableCell>
                <TableCell>{getRelativeTime(item.published_at)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => item.url && openUrl(item.url)}
                    {...(item.url && isExternalUrl(item.url) && {
                      'aria-label': `Read article (opens in new tab)`
                    })}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {item.url && isExternalUrl(item.url) && (
                      <>
                        <span className="ml-1 text-xs" aria-hidden="true">↗</span>
                        <span className="sr-only">(opens in new tab)</span>
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {news.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No news items available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
