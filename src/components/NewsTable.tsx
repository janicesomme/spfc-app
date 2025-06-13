
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
  title: string;
  source: string;
  category: string;
  sentiment: string;
  tone: string;
  topic: string;
  url: string;
  created_at: string;
  content_preview: string;
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
          console.log('News change:', payload);
          fetchNews();
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "Breaking News",
              description: `New ${payload.new.category} news from ${payload.new.source}`,
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
    try {
      const { data, error } = await supabase
        .from('news_items')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(15);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: "Failed to fetch news items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'transfer': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-orange-100 text-orange-800';
      case 'injury': return 'bg-red-100 text-red-800';
      case 'contract': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <TableHead>Sentiment</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id} className="hover:bg-red-50">
                <TableCell className="font-medium max-w-md">
                  <div className="truncate" title={item.title}>
                    {item.title}
                  </div>
                  {item.content_preview && (
                    <div className="text-sm text-gray-500 truncate mt-1">
                      {item.content_preview}
                    </div>
                  )}
                </TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell>
                  <Badge className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getSentimentColor(item.sentiment)}>
                    {item.sentiment}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{item.topic}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleTimeString()}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(item.url, '_blank')}
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
