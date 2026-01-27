import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Menu, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ExternalLinkButton } from '@/lib/external-link-utils';
import { PriceworxAdBanner } from '../components/PriceworxAdBanner';
import { JoinRevolutionBanner } from '../components/JoinRevolutionBanner';
import { WeeklyShoutSubscription } from '../components/WeeklyShoutSubscription';
import { SPFCNewsSection } from '../components/SPFCNewsSection';

interface Video {
  video_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  youtube_url: string;
  published_at: string;
}


export default function HomePage() {
  console.log("SPFC HOME PAGE RENDERING - IF YOU SEE THIS THE NEW CODE IS LOADED");
  const navigate = useNavigate();
  const [latestVideo, setLatestVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
    { label: 'YT Videos', path: '/youtube' },
    { label: 'League', path: '/league' },
    { label: 'Fixtures', path: '/fixtures' },
    { label: 'Results', path: '/results' },
    { label: 'Starting XI', path: '/pick-your-xi' },
    { label: 'Player Ratings', path: '/player-ratings' },
    { label: 'Final Player Ratings', path: '/final-player-ratings' },
    { label: 'Shop', path: '/shop' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');

      // Set hardcoded video from YouTube URL
      const youtubeUrl = 'https://www.youtube.com/watch?v=StdEFn9Zt04';
      const videoId = 'StdEFn9Zt04';

      const transformedVideo: Video = {
        video_id: videoId,
        title: 'Latest Match Analysis',
        description: 'Watch the latest football match analysis',
        thumbnail_url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        youtube_url: youtubeUrl,
        published_at: new Date().toISOString()
      };

      setLatestVideo(transformedVideo);
      console.log('Set latest video:', transformedVideo);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Banner Header */}
      <div className="w-full py-1 sm:py-5 px-4" style={{ backgroundColor: '#ec1c24' }}>
        <div className="flex items-center justify-center max-w-4xl mx-auto relative">
          <img
            src="/sp-logo.webp"
            alt="SPFC Logo"
            className="h-20 w-auto sm:h-24 md:h-28 mr-4 sm:mr-6"
            style={{ marginLeft: '-40px' }}
          />
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl">
            SPFC App
          </h1>
          
          {/* Hamburger Menu - Mobile First */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <button 
                className="absolute md:hidden text-white hover:text-gray-200 transition-colors z-10"
                style={{ 
                  right: '15px',
                  top: '15px'
                }}
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </DrawerTrigger>
            <DrawerContent
              className="h-full w-[75%] ml-auto mr-0 rounded-none border-none"
              style={{ backgroundColor: '#ec1c24' }}
            >
              <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
              <DrawerDescription className="sr-only">Mobile navigation menu</DrawerDescription>
              <div className="flex flex-col h-full p-6">
                {/* Close Button */}
                <DrawerClose asChild>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="self-end text-white hover:text-gray-200 mb-4"
                    aria-label="Close navigation menu"
                  >
                    <X size={24} />
                  </button>
                </DrawerClose>
                
                {/* SPFC Logo */}
                <div className="flex justify-center mb-8" style={{ marginTop: '-80px' }}>
                  <img
                    src="/sp-logo.webp"
                    alt="SPFC Logo"
                    className="w-[100px] h-auto border border-white rounded"
                  />
                </div>
                
                {/* Navigation Links */}
                <nav className="flex flex-col items-start space-y-0" style={{ marginTop: '-50px' }}>
                  {navigationItems.map((item, index) => (
                    <div key={item.path} className="w-full">
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className="w-full text-left py-4 text-white hover:text-gray-200 text-lg font-medium transition-colors"
                      >
                        {item.label}
                      </button>
                      {index < navigationItems.length - 1 && (
                        <div className="w-full h-px bg-white/30" />
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* YouTube Video Section */}
      <div className="px-3 sm:px-4 py-6 sm:py-8 flex flex-col items-center">
        {latestVideo?.youtube_url ? (
          <ExternalLinkButton
            url={latestVideo.youtube_url}
            className="w-full max-w-[340px] sm:max-w-4xl mx-auto block"
          >
            <div className="relative group cursor-pointer w-full">
              <img 
                src={latestVideo?.thumbnail_url || "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"}
                alt={latestVideo?.title || "Latest Video"}
                className="rounded-lg shadow-lg w-full h-auto border-2 border-red-500 object-contain"
                loading="lazy"
              />
              {/* YouTube Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-100 hover:bg-black/30 transition-all rounded-lg">
                <div className="bg-red-600 hover:bg-red-700 rounded-full p-3 sm:p-4 shadow-lg transition-colors">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </ExternalLinkButton>
        ) : (
          <button
            className="w-full max-w-[340px] sm:max-w-4xl mx-auto block"
            onClick={() => navigate('/youtube')}
          >
            <div className="relative group cursor-pointer w-full">
              <img 
                src={latestVideo?.thumbnail_url || "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"}
                alt={latestVideo?.title || "Latest Video"}
                className="rounded-lg shadow-lg w-full h-auto border-2 border-red-500 object-contain"
                loading="lazy"
              />
              {/* YouTube Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-100 hover:bg-black/30 transition-all rounded-lg">
                <div className="bg-red-600 hover:bg-red-700 rounded-full p-3 sm:p-4 shadow-lg transition-colors">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        )}
        {/* Video Title - Below thumbnail with same width */}
        {latestVideo && (
          <div className="w-full max-w-[340px] sm:max-w-4xl mx-auto" style={{ marginTop: '-15px' }}>
            <h3 className="text-white text-2xl sm:text-3xl font-bold text-center mt-1 leading-tight px-1">
              {latestVideo.title}
            </h3>
          </div>
        )}

        {/* Priceworx Ad Banner */}
        <div className="w-full" style={{ marginTop: '15px' }}>
          <PriceworxAdBanner />
        </div>

        {/* Join the Revolution Banner */}
        <div className="w-full" style={{ marginTop: '15px' }}>
          <JoinRevolutionBanner />
        </div>

        {/* Weekly Shout Subscription */}
        <WeeklyShoutSubscription />
      </div>

      {/* Latest News Section */}
      <SPFCNewsSection />

      {/* Pick Your XI Section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-6 mt-[15px] sm:mt-0">
        <div className="bg-blue-950/40 rounded-lg p-6 border border-white">
          <h2 className="text-youtube-yellow text-2xl sm:text-3xl font-bold text-center mb-3">Fan Football Starts Now</h2>
          <p className="text-white text-lg sm:text-xl text-center mb-4">Rate the players who featured in the match!</p>
          <div className="w-full h-0.5 bg-red-600 mb-6 max-w-4xl mx-auto"></div>
          <h3 className="text-white text-xl sm:text-2xl font-bold text-center mb-2 uppercase">Rate The Match Line-Up</h3>
          <p className="text-youtube-yellow text-base sm:text-lg text-center mb-1 sm:mb-4">Pick It, Share It, Discuss It</p>
          <button
            onClick={() => navigate('/pick-your-xi')}
            className="w-full relative max-w-4xl mx-auto block mt-2.5"
          >
            <div className="relative rounded-lg overflow-hidden w-full h-[320px] sm:h-[474px] md:h-[538px] lg:h-[602px]">
              <img
                src="/Startign XI home page image.png"
                alt="Pick Your XI"
                className="w-full h-full object-cover"
              />
              {/* Clickable indicator triangle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-y-[30px] -translate-x-[30px] bg-white/90 rounded-full p-4 sm:p-5 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.58L13.17 12L8.59 7.42L10 6l6 6-6 6-1.41-1.42z"/>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Red line above Player Ratings */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-8 pb-2">
        <div className="w-full h-0.5 bg-red-600 max-w-4xl mx-auto"></div>
      </div>

      {/* Player Ratings Section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-6">
        <div className="bg-blue-950/40 rounded-lg p-3 sm:p-6 border border-white">
          <h3 className="text-white text-xl sm:text-2xl font-bold text-center mb-2 uppercase mt-2 sm:mt-5">Submit Your Player Ratings</h3>
          <p className="text-youtube-yellow text-base sm:text-lg text-center mb-2 sm:mb-4">Rate the Players After Every Match</p>
        <button 
          onClick={() => navigate('/player-ratings')}
          className="w-full relative max-w-4xl mx-auto block mt-2.5"
        >
          <div className="relative rounded-lg overflow-hidden w-full h-[260px] sm:h-[474px] md:h-[538px] lg:h-[602px]">
            <img
              src="/Rate the Players home page.png"
              alt="Submit Your Player Ratings"
              className="w-full h-full object-contain"
            />
            {/* Clickable indicator triangle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-full p-4 sm:p-5 shadow-lg">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.58L13.17 12L8.59 7.42L10 6l6 6-6 6-1.41-1.42z"/>
              </svg>
            </div>
          </div>
        </button>
        
          {/* Final Player Ratings Button */}
          <button 
            onClick={() => navigate('/final-player-ratings')}
            className="w-full max-w-4xl mx-auto block mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base"
          >
            Final Player Ratings
          </button>
        </div>
      </div>

      {/* Red line above Shop */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-8 pb-2">
        <div className="w-full h-0.5 bg-red-600 max-w-4xl mx-auto"></div>
      </div>

      {/* Shop Section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-6">
        <div className="bg-blue-950/40 rounded-lg pt-2 px-6 pb-6 border border-white">
          <h3 className="text-white text-xl sm:text-2xl font-bold text-center mb-2 uppercase mt-5">SHOP THE LATEST MERCH</h3>
          <p className="text-youtube-yellow text-base sm:text-lg text-center mb-4">Stretford Paddock FC Gear</p>
          <div className="w-full relative max-w-4xl mx-auto block mt-2.5">
            <div className="relative rounded-lg overflow-hidden w-full">
              <img
                src="/Shop Home Page.png"
                alt="Shop the Latest Merch"
                className="w-full h-auto object-contain rounded-lg"
              />
              {/* Shop Now Button */}
              <button
                onClick={() => window.open('https://shop.stretfordpaddockfc.com/collections/fused', '_blank')}
                className="absolute bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-2.5 sm:px-3 rounded-lg transition-colors text-xs sm:text-sm whitespace-nowrap left-[calc(100%_-_90px)] sm:left-[calc(100%_-_190px)]"
                style={{
                  top: 'calc(50% + 20px)',
                  transform: 'translateY(-50%)'
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}