
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TransferTarget {
  id: number;
  player_name: string;
  transfer_likelihood: string;
  confidence: number;
  verdict: string;
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
        .select('id, player_name, transfer_likelihood, confidence, verdict')
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
      <div className="min-h-screen bg-gray-50">
        <div className="bg-red-600 text-white p-4 text-center">
          <h1 className="text-lg font-semibold">Transfer Targets</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Red header bar - exact match to image */}
      <div className="bg-red-600 text-white p-4 text-center relative">
        <h1 className="text-lg font-semibold">Transfer Targets</h1>
      </div>

      {/* Player cards list - exact spacing and layout */}
      <div className="bg-white">
        {targets.map((target, index) => (
          <div key={target.id} className="border-b border-gray-100">
            <div className="flex items-center p-4 space-x-3">
              {/* Player circle - matching the image exactly */}
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-semibold text-sm">
                  {getPlayerInitials(target.player_name)}
                </span>
              </div>
              
              {/* Player info - exact layout from image */}
              <div className="flex-1 min-w-0">
                <div className="text-base font-medium text-gray-900 truncate">
                  {target.player_name || 'Unknown Player'}
                </div>
                <div className="text-sm text-gray-600">
                  Market Value {getMarketValue()}
                </div>
              </div>
              
              {/* Stats section - matching image layout */}
              <div className="text-right mr-3">
                <div className="text-sm font-medium text-gray-900">
                  {target.confidence}% likely
                </div>
                <div className="text-xs text-gray-500">
                  {target.transfer_likelihood || 'Possible'}
                </div>
              </div>
              
              {/* Red + button - exact match to image */}
              <button className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
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
