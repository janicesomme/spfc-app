import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Result {
  external_id: string;
  home_team: string | null;
  opponent: string | null;
  home_goals: number | null;
  away_goals: number | null;
  kickoff: string | null;
  competition: string | null;
  status: string | null;
}

export default function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
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
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      // Fetch completed SPFC matches (where home_goals is not null = already played)
      const { data, error } = await supabase
        .from('fixtures')
        .select('*')
        .like('external_id', 'spfc_%')
        .not('home_goals', 'is', null)
        .order('kickoff', { ascending: false });

      if (error) throw error;

      setResults(data || []);
    } catch (error) {
      console.error('Error fetching results:', error);
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

  const getResultStatus = (homeGoals: number | null, awayGoals: number | null) => {
    if (homeGoals === null || awayGoals === null) return '';
    if (homeGoals > awayGoals) return 'W';
    if (homeGoals < awayGoals) return 'L';
    return 'D';
  };

  const getResultColor = (homeGoals: number | null, awayGoals: number | null) => {
    if (homeGoals === null || awayGoals === null) return 'text-gray-400';
    if (homeGoals > awayGoals) return 'text-green-400';
    if (homeGoals < awayGoals) return 'text-red-500';
    return 'text-yellow-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading results...</div>
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
          <h1 className="text-xl font-bold text-white">Results</h1>

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
              className="h-full w-[75%] ml-auto mr-0 rounded-none border-none"
              style={{ backgroundColor: '#ec1c24' }}
            >
              <div className="flex flex-col h-full p-6">
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

      {/* Results List */}
      <div className="p-4 mt-16 pb-8">
        {results.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {results.map((result) => {
              const resultStatus = getResultStatus(result.home_goals, result.away_goals);
              const resultColor = getResultColor(result.home_goals, result.away_goals);

              return (
                <div
                  key={result.external_id}
                  className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-red-500 transition-colors"
                >
                  {/* Date and Competition */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div className="flex items-center gap-2 text-youtube-yellow text-sm font-semibold">
                      <Calendar size={16} />
                      {formatDate(result.kickoff)}
                    </div>
                    {result.competition && (
                      <span className="text-gray-400 text-sm mt-1 sm:mt-0">{result.competition}</span>
                    )}
                  </div>

                  {/* Teams and Score */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 text-right">
                      <p className="text-white font-semibold">{result.home_team || 'Home Team'}</p>
                    </div>

                    {/* Score */}
                    <div className="px-3 py-2 bg-red-600/20 rounded text-center min-w-[80px]">
                      <p className={`text-2xl font-bold ${resultColor}`}>
                        {result.home_goals} - {result.away_goals}
                      </p>
                      <p className={`text-xs font-semibold mt-1 ${resultColor}`}>
                        {resultStatus === 'W' && 'VICTORY'}
                        {resultStatus === 'L' && 'LOSS'}
                        {resultStatus === 'D' && 'DRAW'}
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="text-white font-semibold">{result.opponent || 'Away Team'}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <p className="text-lg">No completed matches yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
