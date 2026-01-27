import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
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

interface LeagueTeam {
  position: number;
  team_name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
}

export default function League() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<LeagueTeam[]>([]);
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
    fetchLeagueData();
  }, []);

  const fetchLeagueData = async () => {
    try {
      // Fetch league standings from league_standings table
      const { data, error } = await supabase
        .from('league_standings')
        .select('*')
        .order('position', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        setTeams([]);
        setLoading(false);
        return;
      }

      // Map database records to LeagueTeam interface
      const teams: LeagueTeam[] = data.map((row: any) => ({
        position: row.position,
        team_name: row.team_name,
        played: row.played,
        wins: row.wins,
        draws: row.draws,
        losses: row.losses,
        goals_for: row.goals_for,
        goals_against: row.goals_against,
        goal_difference: row.goal_difference,
        points: row.points,
      }));

      setTeams(teams);
    } catch (error) {
      console.error('Error fetching league data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading league table...</div>
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
          <h1 className="text-xl font-bold text-white">League Table</h1>

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
              className="h-full w-[75%] ml-auto mr-0 rounded-none border-none flex flex-col"
              style={{ backgroundColor: "#ec1c24" }}
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

      {/* League Table */}
      <div className="p-4 mt-16">
        {teams.length > 0 ? (
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 px-2 text-youtube-yellow">Pos</th>
                  <th className="text-left py-2 px-2 text-youtube-yellow">Team</th>
                  <th className="text-center py-2 px-2 text-youtube-yellow">P</th>
                  <th className="text-center py-2 px-2 text-youtube-yellow">W</th>
                  <th className="text-center py-2 px-2 text-youtube-yellow">D</th>
                  <th className="text-center py-2 px-2 text-youtube-yellow">L</th>
                  <th className="text-center py-2 px-2 text-youtube-yellow">GF</th>
                  <th className="text-center py-2 px-2 text-youtube-yellow">GA</th>
                  <th className="text-center py-2 px-2 text-youtube-yellow">GD</th>
                  <th className="text-center py-2 px-2 text-youtube-yellow">Pts</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.team_name} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                    <td className="py-3 px-2 text-white font-semibold">{team.position}</td>
                    <td className="py-3 px-2 text-white">{team.team_name}</td>
                    <td className="text-center py-3 px-2 text-gray-300">{team.played}</td>
                    <td className="text-center py-3 px-2 text-gray-300">{team.wins}</td>
                    <td className="text-center py-3 px-2 text-gray-300">{team.draws}</td>
                    <td className="text-center py-3 px-2 text-gray-300">{team.losses}</td>
                    <td className="text-center py-3 px-2 text-gray-300">{team.goals_for}</td>
                    <td className="text-center py-3 px-2 text-gray-300">{team.goals_against}</td>
                    <td className="text-center py-3 px-2 text-red-500 font-semibold">{team.goal_difference}</td>
                    <td className="text-center py-3 px-2 text-white font-bold text-lg">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <p className="text-lg">No league data available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
