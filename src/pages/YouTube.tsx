
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { YouTubeVideoList } from '@/components/YouTubeVideoList';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

export default function YouTube() {
  const navigate = useNavigate();
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
    { label: 'Socials', path: '/socials' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };
  return (
    <div className="min-h-screen bg-black">
      {/* Banner Header - exact replica of home page */}
      <div className="w-full py-1 sm:py-5 px-4" style={{ backgroundColor: '#ec1c24' }}>
        <div className="flex items-center justify-center max-w-4xl mx-auto relative">
          <img
            src="/sp-logo.webp"
            alt="SPFC Logo"
            className="h-20 w-auto sm:h-24 md:h-28 mr-4 sm:mr-6"
            style={{ marginLeft: '-40px' }}
          />
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl">
            Latest Videos
          </h1>
          
          {/* Hamburger Menu */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <button 
                className="absolute md:hidden text-white hover:text-gray-200 transition-colors z-10"
                style={{ 
                  left: 'calc(50% + 90px)', // 40px to the right of "YouTube" text
                  top: '15px'
                }}
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </DrawerTrigger>
            <DrawerContent
              className="h-full w-[75%] ml-auto mr-0 rounded-none border-none flex flex-col"
              style={{ backgroundColor: '#ec1c24' }}
            >
              <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
              <DrawerDescription className="sr-only">Mobile navigation menu</DrawerDescription>

              {/* Close Button - Fixed at top */}
              <div className="p-6 pb-0">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="self-end text-white hover:text-gray-200 mb-4 block"
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* SPFC Logo */}
              <div className="flex justify-center mb-8 px-6" style={{ marginTop: '-60px' }}>
                <img
                  src="/sp-logo.webp"
                  alt="SPFC Logo"
                  className="w-[100px] h-auto border border-white rounded"
                />
              </div>

              {/* Navigation Links - Scrollable */}
              <nav className="flex-1 overflow-y-auto px-6 space-y-0">
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
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      
      <div className="py-6">
        <YouTubeVideoList />
      </div>
    </div>
  );
}
