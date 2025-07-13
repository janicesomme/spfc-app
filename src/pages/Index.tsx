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
    <div className="text-2xl font-bold text-black">
      {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes
    </div>
  );
}

// Main homepage component
export default function Index() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#C8102E] w-full max-w-md mx-auto pb-24">
      {/* Header Section */}
      <header className="w-full px-6 py-8 text-center">
        {/* FUTV Logo */}
        <div className="mb-6 flex justify-center">
          <img 
            src="/lovable-uploads/432acbd8-c991-4838-8a6b-9b9b51fa3989.png" 
            alt="FUTV Logo" 
            className="w-20 h-20 object-contain"
          />
        </div>
        
        {/* DAY 39! Header */}
        <div className="mb-6">
          <h1 className="text-7xl font-black text-white leading-none tracking-tight">
            DAY
          </h1>
          <h1 className="text-7xl font-black text-white leading-none tracking-tight">
            39!
          </h1>
        </div>

        {/* Watch the Latest Button */}
        <Button 
          className="bg-[#B8102A] hover:bg-[#A00D26] text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg border-2 border-white/20 w-full max-w-xs"
          asChild
        >
          <Link to="/youtube" className="flex items-center justify-center gap-2">
            WATCH THE LATEST
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </header>

      {/* Fan Quote Section */}
      <section className="px-6 py-8 bg-black/20 mx-4 rounded-2xl mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          LET ME HEAR YOUR VOICE
        </h2>
        
        <div className="bg-[#F5F5DC] rounded-2xl p-6 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#F5F5DC] rounded-full border-4 border-black flex items-center justify-center text-2xl font-bold">
              "
            </div>
            <div className="flex-1">
              <p className="text-black text-lg font-medium leading-relaxed mb-3">
                "We're not just WATCHING United, we're SURVIVING United together."
              </p>
              <p className="text-yellow-600 font-bold text-sm">
                @RedDevil_4_Life
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="px-6 py-6">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          DID YOU PLAY?
        </h2>
        
        <div className="bg-[#F5F5DC] rounded-2xl p-6 mb-4">
          <div className="bg-yellow-400 text-black font-bold text-xl px-4 py-2 rounded-lg mb-4 text-center">
            MATCHDAY 17
          </div>
          <CountdownTimer />
        </div>

        {/* Prediction Game Button */}
        <Button 
          className="bg-black hover:bg-gray-800 text-white font-bold text-lg px-6 py-4 rounded-lg w-full mb-4"
          asChild
        >
          <Link to="/players" className="flex items-center justify-center gap-2">
            <Users className="w-5 h-5" />
            Play Our Prediction Game!!
          </Link>
        </Button>
      </section>

      {/* Quick Hits Section */}
      <section className="px-6 py-4">
        <h2 className="text-3xl font-bold text-white mb-4">
          QUICK HITS
        </h2>
        
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 text-left justify-start py-6"
            asChild
          >
            <Link to="/news">
              Latest Transfer News
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 text-left justify-start py-6"
            asChild
          >
            <Link to="/hot-o-meter">
              Hot-O-Meter Rankings
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 text-left justify-start py-6"
            asChild
          >
            <Link to="/youtube">
              <Play className="w-4 h-4 mr-2" />
              Watch Latest Videos
            </Link>
          </Button>
        </div>
      </section>

      {/* Bottom Navigation */}
      <HomeBottomNav />
    </div>
  );
}