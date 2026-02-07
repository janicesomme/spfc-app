import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Send } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';

type NavigationItem = {
  label: string;
  path?: string;
  submenu?: Array<{ label: string; path: string }>;
};

export default function Community() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
    { label: 'YT Videos', path: '/youtube' },
    { label: 'League', path: '/league' },
    { label: 'Fixtures', path: '/fixtures' },
    { label: 'Results', path: '/results' },
    { label: 'Play', submenu: [
      { label: 'Starting XI', path: '/pick-your-xi' },
      { label: 'Match Predictions', path: '/predict' },
      { label: 'Player Ratings', path: '/player-ratings' },
      { label: 'Final Player Ratings', path: '/final-player-ratings' },
      { label: 'Leaderboard', path: '/leaderboard' },
    ]},
    { label: 'Shop', path: '/shop' },
    { label: 'Community', path: '/community' },
    { label: 'Socials', path: '/socials' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const handleOpenTelegram = () => {
    window.open('tg://resolve?domain=stretfordpaddockfcmembers', '_blank');
    setTimeout(() => {
      window.open('https://t.me/stretfordpaddockfcmembers', '_blank');
    }, 500);
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

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
            Community
          </h1>

          {/* Hamburger Menu */}
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
              className="h-full w-[75%] ml-auto mr-0 rounded-none border-none flex flex-col"
              style={{ backgroundColor: "#ec1c24" }}
            >
              <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
              <DrawerDescription className="sr-only">Mobile navigation menu</DrawerDescription>

              {/* Close Button */}
              <div className="flex justify-end p-6 pb-0 relative z-50">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-white hover:text-gray-200 mb-4 cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* SPFC Logo */}
              <div className="flex justify-center mb-8 px-6" style={{ marginTop: "-60px" }}>
                <img
                  src="/sp-logo.webp"
                  alt="SPFC Logo"
                  className="w-[100px] h-auto border border-white rounded"
                />
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-6 space-y-0">
                {navigationItems.map((item, index) => (
                  <div key={item.label} className="w-full">
                    {item.submenu ? (
                      <>
                        <div className="py-4 text-white text-lg font-medium">
                          {item.label}
                        </div>
                        {item.submenu.map((subitem) => (
                          <button
                            key={subitem.path}
                            onClick={() => handleNavigation(subitem.path)}
                            className="w-full text-left py-3 pl-4 text-gray-300 hover:text-white text-base font-medium transition-colors"
                          >
                            {subitem.label}
                          </button>
                        ))}
                      </>
                    ) : (
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className="w-full text-left py-4 text-white hover:text-gray-200 text-lg font-medium transition-colors"
                      >
                        {item.label}
                      </button>
                    )}
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

      {/* Community Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Community Card */}
          <div className="rounded-lg overflow-hidden border border-red-600 bg-gray-900 hover:shadow-xl transition-shadow">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-white text-3xl sm:text-4xl font-bold mb-2">
                    Stretford Paddock FC Members
                  </h2>
                  <p className="text-white/90 text-lg sm:text-xl font-semibold">
                    216 Members
                  </p>
                </div>
                <Send size={48} className="text-white opacity-80" />
              </div>
            </div>

            {/* Content */}
            <div className="bg-black p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-white text-xl font-bold mb-3">About This Community</h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  Join our active Telegram community to discuss match strategies, player insights, and upcoming games with fellow SPFC supporters. Get real-time updates, share your predictions, and connect with the community.
                </p>
              </div>

              <div>
                <h3 className="text-white text-xl font-bold mb-3">What You'll Find</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-lg">•</span>
                    <span>Match discussions and tactical analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-lg">•</span>
                    <span>Player performance and lineup predictions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-lg">•</span>
                    <span>Real-time updates during matches</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-lg">•</span>
                    <span>Community challenges and predictions game discussions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-lg">•</span>
                    <span>Team news and upcoming fixtures</span>
                  </li>
                </ul>
              </div>

              {/* Call to Action Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleOpenTelegram}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-10 rounded-lg transition-all text-lg w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white"
                >
                  <Send size={24} />
                  Open Community Chat
                </Button>
              </div>

              <p className="text-center text-gray-400 text-sm">
                Click above to open Telegram and join the discussion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
