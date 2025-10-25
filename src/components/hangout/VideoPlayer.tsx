import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minimize2, Maximize2 } from "lucide-react";
import hangoutPreview from "@/assets/hangout-video-preview.png";

interface VideoPlayerProps {
  isLive?: boolean;
}

export const VideoPlayer = ({ isLive = false }: VideoPlayerProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* Main Video Player */}
      <div
        className={`relative bg-black transition-all duration-300 ${
          isMinimized ? "hidden" : "h-full w-full"
        }`}
      >
        {/* Video Placeholder */}
        <img 
          src={hangoutPreview} 
          alt="Creator Hangout Video" 
          className="w-full h-full object-contain bg-black"
        />

        {/* Live Badge */}
        {isLive && (
          <Badge className="absolute top-3 left-3 bg-[#C8102E] text-white border-0">
            🔴 LIVE
          </Badge>
        )}

        {!isLive && (
          <Badge className="absolute top-3 left-3 bg-gray-700 text-white border-0">
            Recorded Hangout
          </Badge>
        )}

        {/* Minimize Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white"
          onClick={() => setIsMinimized(true)}
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Floating Minimized Video */}
      {isMinimized && (
        <div className="fixed top-20 left-4 z-50 w-32 h-24 bg-black rounded-lg shadow-2xl overflow-hidden border-2 border-[#C8102E]">
          <img 
            src={hangoutPreview} 
            alt="Creator Hangout Video" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0">
            {isLive && (
              <Badge className="absolute top-1 left-1 text-[10px] bg-[#C8102E] text-white border-0 px-1.5 py-0">
                LIVE
              </Badge>
            )}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-1 right-1 h-6 w-6 bg-black/40 hover:bg-black/60 text-white p-0"
              onClick={() => setIsMinimized(false)}
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
