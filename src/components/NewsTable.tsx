
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string | null;
  source: string | null;
  category: string | null;
  summary: string | null;
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

    // Set up real-time subscription
    const channel = supabase
      .channel('news-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'news_items' },
        (payload) => {
          // You can uncomment console.log for debugging:
          // console.log('News change:', payload);
          fetchNews();

          if (payload.eventType === 'INSERT') {
            toast({
              title: "Breaking News",
              description: `New ${payload.new.category || "General"} news from ${payload.new.source || "Unknown"}`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_items')
        .select('id,title,source,category,summary,image_url,published_at,url')
        .order('published_at', { ascending: false })
        .limit(15);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      // console.error('Error fetching news:', error);
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

  // We'll just color category badges, skip 'sentiment'
  const getCategoryColor = (category: string | null | undefined) => {
    switch (category?.toLowerCase()) {
      case 'transfer': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-orange-100 text-orange-800';
      case 'injury': return 'bg-red-100 text-red-800';
      case 'contract': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <TableHead>Category</TableHead>
              <TableHead>Summary</TableHead>
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
                  <Badge className={getCategoryColor(item.category)}>
                    {item.category || "General"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="truncate max-w-xs text-xs text-gray-500">
                    {item.summary ? item.summary : <span className="italic text-gray-400">–</span>}
                  </div>
                </TableCell>
                <TableCell>{getRelativeTime(item.published_at)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => item.url && window.open(item.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
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
