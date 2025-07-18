
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

// Mock video data for FUTV videos
const futvVideos = [
  {
    id: "WmNZ1L2v7FE",
    title: "Man United's Transfer Disaster",
    thumbnailUrl: "https://img.youtube.com/vi/WmNZ1L2v7FE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=WmNZ1L2v7FE"
  },
  {
    id: "yjMk-PsFjI0",
    title: "Ten Hag Out? The Debate",
    thumbnailUrl: "https://img.youtube.com/vi/yjMk-PsFjI0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=yjMk-PsFjI0"
  },
  {
    id: "zwr1qRUJCeA",
    title: "United's Squad Overhaul",
    thumbnailUrl: "https://img.youtube.com/vi/zwr1qRUJCeA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=zwr1qRUJCeA"
  },
  {
    id: "slL3eAhxjbY",
    title: "Rashford's Future at United",
    thumbnailUrl: "https://img.youtube.com/vi/slL3eAhxjbY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=slL3eAhxjbY"
  },
  {
    id: "bqARmJylOlU",
    title: "Match Analysis: What Went Wrong",
    thumbnailUrl: "https://img.youtube.com/vi/bqARmJylOlU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=bqARmJylOlU"
  },
  {
    id: "O1fOYBoJD94",
    title: "New Signings React",
    thumbnailUrl: "https://img.youtube.com/vi/O1fOYBoJD94/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=O1fOYBoJD94"
  }
];

export function YouTubeVideoList() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            FUTV Videos
          </h1>
          <p className="text-muted-foreground">
            Latest content from The United Stand
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futvVideos.map((video) => (
            <Card 
              key={video.id} 
              className="bg-card border-border hover:bg-muted/50 transition-colors group"
            >
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-secondary rounded-t-lg overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-lg leading-tight mb-4 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    onClick={() => window.open(video.videoUrl, '_blank')}
                  >
                    Watch
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
