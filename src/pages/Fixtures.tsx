import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, Calendar, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface Fixture {
  external_id: string;
  home_team: string | null;
  opponent: string | null;
  kickoff: string | null;
  venue: string | null;
  competition: string | null;
  status: string | null;
}

export default function Fixtures() {
  const navigate = useNavigate();
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
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
    { label: 'Socials', path: '/socials' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    fetchFixtures();
  }, []);

  const fetchFixtures = async () => {
    try {
      // Fetch upcoming SPFC fixtures (where home_goals is null = not yet played)
      const { data, error } = await supabase
        .from('fixtures')
        .select('*')
        .like('external_id', 'spfc_%')
        .is('home_goals', null)
        .order('kickoff', { ascending: true });

      if (error) throw error;

      setFixtures(data || []);
    } catch (error) {
      console.error('Error fetching fixtures:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading fixtures...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 z-50">
        <div className="flex items-center justify-between p-4 relative">
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">Fixtures</h1>

          {/* Hamburger Menu */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <button
                className="md:hidden text-white hover:text-gray-200 transition-colors z-10"
                style={{ marginLeft: '40px' }}
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </DrawerTrigger>
            <DrawerContent
              className="h-full w-[75%] ml-auto mr-0 rounded-none border-none overflow-y-auto"
              style={{ backgroundColor: '#ec1c24' }}
            >
              <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
              <DrawerDescription className="sr-only">Mobile navigation menu</DrawerDescription>
              <div className="flex flex-col p-6">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="self-end text-white hover:text-gray-200 mb-4"
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>

                <div className="flex justify-center mb-8" style={{ marginTop: '-80px' }}>
                  <img
                    src="/sp-logo.webp"
                    alt="SPFC Logo"
                    className="w-[100px] h-auto border border-white rounded"
                  />
                </div>

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

      {/* Fixtures List */}
      <div className="p-4 mt-16 pb-8">
        {fixtures.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {fixtures.map((fixture) => (
              <div
                key={fixture.external_id}
                className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-red-500 transition-colors"
              >
                {/* Date and Competition */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div className="flex items-center gap-2 text-youtube-yellow text-sm font-semibold">
                    <Calendar size={16} />
                    {formatDate(fixture.kickoff)}
                  </div>
                  {fixture.competition && (
                    <span className="text-gray-400 text-sm mt-1 sm:mt-0">{fixture.competition}</span>
                  )}
                </div>

                {/* Teams and Score */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-white font-semibold">{fixture.home_team || 'Home Team'}</p>
                  </div>
                  <div className="px-4 py-2 bg-red-600/20 rounded text-red-500 font-bold text-lg">
                    vs
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-white font-semibold">{fixture.opponent || 'Away Team'}</p>
                  </div>
                </div>

                {/* Venue */}
                {fixture.venue && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin size={16} />
                    {fixture.venue}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <p className="text-lg">No upcoming fixtures available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
