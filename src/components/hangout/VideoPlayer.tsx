import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minimize2, Maximize2 } from "lucide-react";

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
          isMinimized ? "hidden" : "h-[33vh] min-h-[250px]"
        }`}
      >
        {/* Video Placeholder */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="text-center text-white/60">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <p className="text-sm">Creator Hangout Video</p>
          </div>
        </div>

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
          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
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
