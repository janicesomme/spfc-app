import React, { useEffect, useState } from "react";
import { HomeBottomNav } from "@/components/HomeBottomNav";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow, parseISO } from "date-fns";

interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
  source: string | null;
  published_at: string | null;
}

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
  const [topNews, setTopNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const { data, error } = await supabase
          .from("man_utd_news")
          .select("id, title, description, url, image_url, source, published_at")
          .eq("is_active", true)
          .order("rank", { ascending: true, nullsFirst: false })
          .order("relevance_score", { ascending: false, nullsFirst: false })
          .order("published_at", { ascending: false, nullsFirst: false })
          .limit(3);

        if (error) throw error;
        setTopNews(data || []);
      } catch (err) {
        console.error("Error fetching top news:", err);
      }
    };

    fetchTopNews();
  }, []);

  const getRelativeTime = (dateString: string | null): string => {
    if (!dateString) return "";
    try {
      const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true }).replace("about ", "");
    } catch {
      return "";
    }
  };
  return (
    <div 
      className="relative min-h-screen w-full max-w-md mx-auto pb-24 overflow-hidden bg-black"
    >
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* YouTube Video Thumbnail */}
        <div className="px-4 pt-4 mb-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/9d59c50e-3dcd-4ecb-a539-0445a08e3552.png"
              alt="BEST & FINAL - Transfer News YouTube Video"
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

        {/* Latest News Section */}
        <section className="px-4 mb-8">
          <h2 className="text-white text-lg font-bold mb-4">Latest News</h2>
          <div className="space-y-2">
            {topNews.map((article) => (
              <div key={article.id} className="bg-black rounded-lg p-3">
                {article.url ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="flex items-start gap-3">
                      {article.image_url && (
                        <div className="w-16 h-12 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            src={article.image_url} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-sm font-semibold leading-tight group-hover:text-red-400 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-3">
                    {article.image_url && (
                      <div className="w-16 h-12 flex-shrink-0 rounded overflow-hidden">
                        <img 
                          src={article.image_url} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Buttons */}
        <section className="px-6 pb-8">
          
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