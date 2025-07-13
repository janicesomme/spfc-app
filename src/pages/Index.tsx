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
        {/* Hero Section with DAY 39! */}
        <header className="px-6 pt-8 pb-4">
          {/* DAY 39! Header - Large and Bold */}
          <div className="text-center mb-6">
            <div className="mb-2">
              <h1 className="text-8xl font-black text-white leading-none tracking-tight drop-shadow-lg">
                DAY
              </h1>
            </div>
            <div className="mb-6">
              <h1 className="text-8xl font-black leading-none tracking-tight drop-shadow-lg"
                  style={{ color: '#fc3f2b', WebkitTextStroke: '2px white' }}>
                39!
              </h1>
            </div>
          </div>

          {/* Watch the Latest Button - Prominent Red Button */}
          <div className="flex justify-center mb-8">
            <Button 
              className="text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-xl border-0 w-full max-w-sm text-center"
              style={{ backgroundColor: '#fc3f2b' }}
              asChild
            >
              <Link to="/youtube" className="flex items-center justify-center gap-3">
                WATCH THE LATEST
                <span className="text-2xl">≫</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Let Me Hear Your Voice Section */}
        <section className="px-6 mb-8">
          <h2 className="text-3xl font-black text-white mb-6 text-center tracking-wide">
            LET ME HEAR YOUR VOICE
          </h2>
          
          <div className="bg-[#F5F5DC] rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#F5F5DC] rounded-full border-4 border-black flex items-center justify-center text-3xl font-bold flex-shrink-0">
                "
              </div>
              <div className="flex-1">
                <p className="text-black text-xl font-medium leading-relaxed mb-4">
                  "We're not just WATCHING United, we're SURVIVING United together."
                </p>
                <p className="text-yellow-600 font-bold text-lg">
                  @RedDevil_4_Life
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Did You Play Section */}
        <section className="px-6 mb-8">
          <h2 className="text-4xl font-black text-white mb-6 text-center tracking-wide">
            DID YOU PLAY?
          </h2>
          
          <div className="bg-[#F5F5DC] rounded-3xl p-6 shadow-lg mb-6">
            <div className="bg-yellow-400 text-black font-bold text-2xl px-6 py-3 rounded-2xl mb-6 text-center shadow-md">
              MATCHDAY 17
            </div>
            <CountdownTimer />
          </div>

          {/* Prediction Game Button */}
          <Button 
            className="bg-black hover:bg-gray-800 text-white font-bold text-xl px-8 py-6 rounded-2xl w-full shadow-xl"
            asChild
          >
            <Link to="/players" className="flex items-center justify-center gap-3">
              <Users className="w-6 h-6" />
              Play Our Prediction Game!!
            </Link>
          </Button>
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