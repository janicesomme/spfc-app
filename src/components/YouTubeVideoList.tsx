
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { ExternalLinkDiv } from '@/lib/external-link-utils';

interface Video {
  title: string;
  url: string;
  thumbnail: string;
}

export function YouTubeVideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHardcodedVideos();
  }, []);

  const loadHardcodedVideos = () => {
    // Hardcoded list of SPFC videos for demo
    const hardcodedVideos: Video[] = [
      {
        title: 'SPFC vs Winsford - Full Match',
        url: 'https://www.youtube.com/watch?v=LIw7wfiJ49U',
        thumbnail: 'https://img.youtube.com/vi/LIw7wfiJ49U/maxresdefault.jpg'
      },
      {
        title: 'SPFC Match Highlights',
        url: 'https://www.youtube.com/watch?v=x1u3iUPMyRg',
        thumbnail: 'https://img.youtube.com/vi/x1u3iUPMyRg/maxresdefault.jpg'
      },
      {
        title: 'SPFC Game Review',
        url: 'https://www.youtube.com/watch?v=Xibq38jCRow',
        thumbnail: 'https://img.youtube.com/vi/Xibq38jCRow/maxresdefault.jpg'
      }
    ];

    setVideos(hardcodedVideos);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="bg-black px-4 sm:px-8 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto">
        {/* Video Grid - Stacked vertically, one per row */}
        <div className="space-y-6">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={index} className="flex flex-col">
                {/* Thumbnail with rounded corners and thin red border */}
                <ExternalLinkDiv
                  url={video.url}
                  className="relative group w-full"
                >
                  <div className="relative rounded-lg overflow-hidden border border-red-600 shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-auto aspect-video object-cover hover:opacity-90 transition-opacity"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback thumbnail
                        (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/3KWW17dgzzY/maxresdefault.jpg';
                      }}
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <Play className="h-16 w-16 text-white drop-shadow-lg fill-white" />
                    </div>
                  </div>
                </ExternalLinkDiv>

                {/* Video Title - One line header underneath */}
                <h3 className="text-white text-lg sm:text-xl font-bold mt-2 leading-tight line-clamp-2">
                  {video.title}
                </h3>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg">No videos available at the moment.</p>
              <p className="text-sm mt-2">Check back soon for latest match highlights and content!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
