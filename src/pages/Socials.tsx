import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Twitter, Play } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

type NavigationItem = {
  label: string;
  path?: string;
  submenu?: Array<{ label: string; path: string }>;
};

export default function Socials() {
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
    { label: 'Socials', path: '/socials' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
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

  const socialPlatforms = [
    {
      name: 'Instagram',
      followers: '40.2K',
      url: 'https://www.instagram.com/stretfordpaddck',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600'
    },
    {
      name: 'Facebook',
      followers: '20K',
      url: 'https://www.facebook.com/StretfordPaddck/',
      icon: Facebook,
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'X',
      followers: '18.2K',
      url: 'https://x.com/SPaddockFC',
      icon: Twitter,
      color: 'from-gray-800 to-black'
    },
    {
      name: 'Twitch',
      followers: '1.3K',
      url: 'https://www.twitch.tv/stretford_paddock_fc',
      icon: Play,
      color: 'from-purple-500 to-purple-700'
    }
  ];

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
            Socials
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
              className="h-full w-[75%] ml-auto mr-0 rounded-none border-none flex flex-col"
              style={{ backgroundColor: "#ec1c24" }}
            >
              <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
              <DrawerDescription className="sr-only">Mobile navigation menu</DrawerDescription>

              {/* Close Button - Fixed at top */}
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

              {/* Navigation Links - Scrollable */}
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

      {/* Socials Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Socials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {socialPlatforms.map((platform, index) => {
              const IconComponent = platform.icon;
              return (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-red-600 bg-gray-900 hover:shadow-xl transition-shadow"
                >
                  {/* Platform Header with Icon */}
                  <div className={`bg-gradient-to-r ${platform.color} p-6 flex items-center justify-between`}>
                    <div>
                      <h3 className="text-white text-2xl font-bold">{platform.name}</h3>
                      <p className="text-white/80 text-lg">{platform.followers} followers</p>
                    </div>
                    <IconComponent size={48} className="text-white" />
                  </div>

                  {/* Follow Button */}
                  <div className="bg-black p-6 flex justify-center">
                    <button
                      onClick={() => window.open(platform.url, '_blank')}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
