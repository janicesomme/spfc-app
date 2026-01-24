
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { ExternalLinkDiv } from '@/lib/external-link-utils';

export default function Shop() {
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
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const shopItems = [
    {
      title: 'Team Jersey',
      description: 'Official SPFC Home Jersey',
      image: '/lovable-uploads/a96c0d33-e126-4bfe-8dc4-47c4088dcb9f.png',
      url: 'https://stretfordpaddockfc.com/shop'
    },
    {
      title: 'Training Kit',
      description: 'SPFC Training Wear',
      image: '/lovable-uploads/a96c0d33-e126-4bfe-8dc4-47c4088dcb9f.png',
      url: 'https://stretfordpaddockfc.com/shop'
    },
    {
      title: 'Accessories',
      description: 'Caps, Scarves & More',
      image: '/lovable-uploads/a96c0d33-e126-4bfe-8dc4-47c4088dcb9f.png',
      url: 'https://stretfordpaddockfc.com/shop'
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
            Shop
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
              <div className="flex flex-col h-full p-6">
                {/* Close Button */}
                <DrawerClose asChild>
                  <button
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

      {/* Shop Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Shop Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopItems.map((item, index) => (
              <ExternalLinkDiv
                key={index}
                url={item.url}
                className="group rounded-lg overflow-hidden border border-red-600 hover:shadow-xl transition-shadow"
              >
                <div className="relative bg-gray-800 aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <div className="bg-black p-4">
                  <h3 className="text-white text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                  <div className="mt-3 text-red-600 text-sm font-semibold">Shop Now →</div>
                </div>
              </ExternalLinkDiv>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-red-600/10 border border-red-600 rounded-lg p-6 text-center">
            <h2 className="text-white text-2xl font-bold mb-2">Complete Store</h2>
            <p className="text-gray-300 mb-4">Browse our full collection of official SPFC merchandise</p>
            <ExternalLinkDiv
              url="https://stretfordpaddockfc.com/shop"
              className="inline-block"
            >
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Visit Full Store
              </button>
            </ExternalLinkDiv>
          </div>
        </div>
      </div>
    </div>
  );
}
