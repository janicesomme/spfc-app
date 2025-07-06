
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TransferTarget {
  id: number;
  player_name: string | null;
  confidence: number | null;
  club: string | null;
  position: string | null;
}

export function TransferTargetsList() {
  const [targets, setTargets] = useState<TransferTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTransferTargets();
  }, []);

  const fetchTransferTargets = async () => {
    try {
      const { data, error } = await supabase
        .from('transfer_reports')
        .select('id, player_name, confidence, club, position')
        .order('confidence', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTargets(data || []);
    } catch (error) {
      console.error('Error fetching transfer targets:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transfer targets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPlayerInitials = (name: string) => {
    if (!name) return 'P';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getMarketValue = () => {
    // Generate random market values for demo
    const values = ['€25M', '€40M', '€60M', '€35M', '€80M', '€15M', '€90M'];
    return values[Math.floor(Math.random() * values.length)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-red-600 text-white text-center py-4 px-6">
        <h1 className="text-lg font-semibold">Transfer Targets</h1>
      </div>

      {/* Player list */}
      <div className="divide-y divide-gray-100">
        {targets.map((target) => (
          <div key={target.id} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
            {/* Player avatar */}
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-red-600 font-semibold text-sm">
                {getPlayerInitials(target.player_name)}
              </span>
            </div>

            {/* Player info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 truncate">
                {target.player_name || 'Unknown Player'}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {target.club || 'Unknown Club'} • {target.position || 'Unknown Position'}
              </p>
            </div>

            {/* Stats */}
            <div className="text-right mr-4">
              <div className="text-sm font-semibold text-gray-900">
                {target.confidence}% likely
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                Transfer Target
              </div>
            </div>

            {/* Add button */}
            <button className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors flex-shrink-0">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}

        {targets.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No transfer targets available
          </div>
        )}
      </div>
    </div>
  );
}
