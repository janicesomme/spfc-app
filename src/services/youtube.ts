
const YOUTUBE_CHANNEL_ID = 'UCOfN8RocOxUmvEBoaBIi18g';

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
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (!apiKey) {
      throw new Error('YouTube API key not configured');
    }

    const url =
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${apiKey}&` +
      `channelId=${YOUTUBE_CHANNEL_ID}&` +
      `part=snippet&` +
      `order=date&` +
      `maxResults=10&` +
      `type=video`;

    console.log('Fetching from YouTube API...');
    console.log('API URL:', url);
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('YouTube API Error:', response.status, errorData);
      throw new Error(`YouTube API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('YouTube API Response:', data);
    console.log('Response has items?', !!data.items);
    console.log('Items count:', data.items ? data.items.length : 'N/A');

    if (data.error) {
      console.error('API returned error:', data.error);
      throw new Error(`YouTube API Error: ${data.error.message}`);
    }

    if (!data.items || data.items.length === 0) {
      console.warn('No videos found in response. Channel ID:', YOUTUBE_CHANNEL_ID);
      console.warn('Full response:', JSON.stringify(data, null, 2));
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: `https://img.youtube.com/vi/${item.id.videoId}/maxresdefault.jpg`,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}
