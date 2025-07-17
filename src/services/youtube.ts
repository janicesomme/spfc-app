
import { supabase } from '@/integrations/supabase/client';

const YOUTUBE_CHANNEL_ID = 'UCgKW4TrjzGXiPbJ3yXoEdjQ';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  publishedAt: string;
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    // Get the API key from Supabase secrets
    const { data: secrets } = await supabase.functions.invoke('get-secret', {
      body: { name: 'YOUTUBE_API_KEY' }
    });
    
    if (!secrets?.value) {
      throw new Error('YouTube API key not found');
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${secrets.value}&` +
      `channelId=${YOUTUBE_CHANNEL_ID}&` +
      `part=snippet&` +
      `order=date&` +
      `maxResults=10&` +
      `type=video`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch YouTube videos');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}
