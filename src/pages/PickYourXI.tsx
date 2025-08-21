import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Share, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Player {
  id: string;
  name: string;
  image: string;
}

interface SelectedPlayers {
  [position: string]: Player | null;
}

const formations = {
  '1-3-4-3': {
    GK: { top: 'calc(75% + 0.5cm)', left: '50%' },
    LB: { top: '55%', left: '25%' },
    CB: { top: '55%', left: '50%' },
    RB: { top: '55%', left: '75%' },
    LM: { top: '33%', left: '7.5%' },
    CM1: { top: '29%', left: '37.5%' },
    CM2: { top: '29%', left: '62.5%' },
    RM: { top: '33%', left: '92.5%' },
    LW: { top: 'calc(12% - 0.5cm)', left: '25%' },
    ST: { top: 'calc(8% - 0.5cm)', left: '50%' },
    RW: { top: 'calc(12% - 0.5cm)', left: '75%' },
  }
};

const positionNames = {
  GK: 'Goalkeeper',
  LB: 'Left Back',
  CB: 'Centre Back',
  RB: 'Right Back',
  LM: 'Left Midfielder',
  CM1: 'Centre Midfielder',
  CM2: 'Centre Midfielder',
  RM: 'Right Midfielder',
  LW: 'Left Winger',
  ST: 'Striker',
  RW: 'Right Winger',
};

export default function PickYourXI() {
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayers>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
    { label: 'YT Videos', path: '/youtube' },
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
    const saved = localStorage.getItem('selectedPlayers');
    if (saved) {
      setSelectedPlayers(JSON.parse(saved));
    }
  }, []);

  const handlePositionClick = (position: string) => {
    navigate(`/pick-player?position=${position}`);
  };

  const allPositionsFilled = Object.keys(formations['1-3-4-3']).every(
    position => selectedPlayers[position]
  );

  const handleSubmitXI = () => {
    console.log('Submitting XI:', selectedPlayers);
  };

  const handleShare = async () => {
    const shareData = {
      text: "Here's who I'm starting for United this weekend ⚽🔥 #FUTVXI",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      alert("Sharing isn't supported on this device.");
    }
  };

  return (
    <div 
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: "url('https://jckkhfqswiasnepshxbr.supabase.co/storage/v1/object/public/player-headshots//best%20pitch%20for%20app.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10 p-4 h-screen flex flex-col">
        <div className="relative text-center pt-2 pb-8">
          {/* Hamburger Menu */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <button 
                className="absolute md:hidden text-white hover:text-gray-200 transition-colors z-10"
                style={{ 
                  left: 'calc(50% - 130px)', // 80px to the left of "P" in "Pick"
                  top: '5px'
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
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="self-end text-white hover:text-gray-200 mb-4"
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>
                
                {/* FUTV Logo */}
                <div className="flex justify-center mb-8" style={{ marginTop: '-80px' }}>
                  <img 
                    src="/lovable-uploads/703f5319-120d-4554-a7b3-94147e86ee93.png"
                    alt="FUTV Logo"
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

          <h1 className="text-2xl font-bold text-white mb-4">Pick Your XI</h1>
          
          {/* Share Button */}
          <Button
            onClick={handleShare}
            className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg border border-white shadow-lg"
            size="sm"
          >
            Share
          </Button>
        </div>

        <div className="flex-1 relative max-w-md mx-auto w-full" style={{ marginTop: '0.75cm' }}>
          {Object.entries(formations['1-3-4-3']).map(([position, coords]) => {
            const player = selectedPlayers[position];
            return (
              <button
                key={position}
                onClick={() => handlePositionClick(position)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: coords.top, left: coords.left }}
              >
                <div className="w-16 h-16 rounded-full border border-white bg-red-600 flex items-center justify-center shadow-lg">
                  {player ? (
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Plus className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2">
                  <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                    {player ? player.name.split(' ').pop() : position}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {allPositionsFilled && (
          <div className="pb-6 px-4 flex justify-center" style={{ marginTop: '-0.75cm' }}>
            <Button
              onClick={handleSubmitXI}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg border border-white"
            >
              Submit Your Starting XI
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}