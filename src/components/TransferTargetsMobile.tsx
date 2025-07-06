
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MoreVertical, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface TransferTarget {
  id: number;
  player_name: string | null;
  confidence: number | null;
  club: string | null;
  position: string | null;
  executive_summary: string | null;
  value?: string;
  initials?: string;
}

export function TransferTargetsMobile() {
  const navigate = useNavigate();
  const [targets, setTargets] = useState<TransferTarget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransferTargets();
  }, []);

  const fetchTransferTargets = async () => {
    try {
      const { data, error } = await supabase
        .from('transfer_reports')
        .select('id, player_name, confidence, club, position, executive_summary')
        .order('confidence', { ascending: false })
        .limit(7);

      if (error) throw error;

      const processedTargets = data?.map((target) => {
        // Use data from database or generate defaults
        const club = target.club || 'Unknown Club';
        const position = target.position || 'Unknown Position';
        const value = 'TBD'; // Generate random value for demo

        // Generate initials
        const names = target.player_name?.split(' ') || ['Unknown', 'Player'];
        const initials = names.length >= 2 
          ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
          : names[0][0]?.toUpperCase() || 'UP';

        return {
          ...target,
          club,
          position,
          value,
          initials
        };
      }) || [];

      setTargets(processedTargets);
    } catch (error) {
      console.error('Error fetching transfer targets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLikelihoodColor = (confidence: number) => {
    if (confidence >= 70) return '#DC143C';
    if (confidence >= 50) return '#FF8800';
    return '#888888';
  };

  const getInitialColor = (index: number) => {
    const colors = ['#DC143C', '#FF6B35', '#F7931E', '#FFD700', '#32CD32', '#00CED1', '#9370DB'];
    return colors[index % colors.length];
  };

  const handlePlayerClick = (playerId: number) => {
    // Navigate to player detail page (for now just log)
    console.log('Navigate to player details:', playerId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transfer targets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 hover:bg-red-700 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Transfer Targets</h1>
          <button className="p-2 -mr-2 hover:bg-red-700 rounded-lg transition-colors">
            <MoreVertical size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Title Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">Priority Players</h2>
          <p className="text-gray-600">Top transfer targets based on AI analysis</p>
        </div>

        {/* Player Cards */}
        <div className="space-y-2">
          {targets.map((target, index) => (
            <div
              key={target.id}
              onClick={() => handlePlayerClick(target.id)}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer active:bg-gray-50"
            >
              <div className="flex items-center">
                {/* Player Initials Circle */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0"
                  style={{ backgroundColor: getInitialColor(index) }}
                >
                  {target.initials}
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-black truncate">
                    {target.player_name}
                  </h3>
                  <p className="text-gray-600 text-sm truncate">
                    {target.club}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {target.position} • {target.value}
                  </p>
                </div>

                {/* Likelihood and Add Button */}
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <span 
                    className="text-lg font-bold"
                    style={{ color: getLikelihoodColor(target.confidence) }}
                  >
                    {Math.round(target.confidence)}%
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayerClick(target.id);
                    }}
                    className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {targets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No transfer targets found</p>
          </div>
        )}
      </div>
    </div>
  );
}
