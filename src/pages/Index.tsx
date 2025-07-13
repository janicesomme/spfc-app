import React, { useEffect, useState } from "react";
import { HomeBottomNav } from "@/components/HomeBottomNav";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Countdown timer component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 9,
    minutes: 31,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-3xl font-bold text-black">
      {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes
    </div>
  );
}

// Main homepage component
export default function Index() {
  return (
    <div 
      className="relative min-h-screen w-full max-w-md mx-auto pb-24 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #fc3f2b 0%, #d63384 50%, #1a1a1a 100%)'
      }}
    >
      {/* Background Image with Fans - positioned behind content */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('/lovable-uploads/0bba34e4-bd67-425a-b5e2-c565b65d75a0.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* YouTube Video Thumbnail */}
        <div className="px-4 pt-4 mb-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/0f7f61b6-945e-4ce1-b734-17f8ca7b8380.png"
              alt="DAY 39! YouTube Video Thumbnail"
              className="w-full h-full object-cover"
            />
            {/* YouTube Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/80 rounded-full p-4 hover:bg-black/60 transition-colors">
                <Play className="w-12 h-12 text-white fill-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Fan Comment Card */}
        <section className="px-4 mb-6">
          <div className="bg-white/90 rounded-lg p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#fc3f2b] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                R
              </div>
              <div className="flex-1">
                <p className="text-black text-sm mb-1">
                  "We're not just WATCHING United, we're SURVIVING United together."
                </p>
                <p className="text-gray-600 text-xs font-medium">
                  @RedDevil_4_Life
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prediction Game Section */}
        <section className="px-4 mb-8">
          <div className="bg-white/90 rounded-lg p-4 shadow-md text-center">
            <p className="text-black text-sm mb-3 font-medium">
              Make sure you make your predictions before Saturday!!
            </p>
            <Button 
              className="bg-black hover:bg-gray-800 text-white font-bold px-6 py-2 rounded-lg w-full"
              asChild
            >
              <Link to="/players">
                Play Now
              </Link>
            </Button>
          </div>
        </section>

        {/* Quick Hits Section */}
        <section className="px-6 pb-8">
          <h2 className="text-4xl font-black text-white mb-6 tracking-wide">
            QUICK HITS
          </h2>
          
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full bg-black/40 border-white/50 text-white hover:bg-black/60 text-left justify-start py-6 text-lg font-semibold rounded-xl"
              asChild
            >
              <Link to="/news">
                Latest Transfer News
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full bg-black/40 border-white/50 text-white hover:bg-black/60 text-left justify-start py-6 text-lg font-semibold rounded-xl"
              asChild
            >
              <Link to="/hot-o-meter">
                Hot-O-Meter Rankings
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full bg-black/40 border-white/50 text-white hover:bg-black/60 text-left justify-start py-6 text-lg font-semibold rounded-xl"
              asChild
            >
              <Link to="/youtube">
                <Play className="w-5 h-5 mr-3" />
                Watch Latest Videos
              </Link>
            </Button>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="mt-auto">
          <HomeBottomNav />
        </div>
      </div>
    </div>
  );
}