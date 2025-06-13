
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Youtube, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TransferReport {
  id: number;
  player_name: string;
  transfer_likelihood: string;
  confidence: number;
  urgency_level: string;
}

export function TransferTargetsDashboard() {
  const [reports, setReports] = useState<TransferReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTransferReports();
  }, []);

  const fetchTransferReports = async () => {
    try {
      const { data, error } = await supabase
        .from('transfer_reports')
        .select('id, player_name, transfer_likelihood, confidence, urgency_level')
        .order('confidence', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching transfer reports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transfer reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getHighPriorityTargets = () => {
    return reports.filter(report => 
      report.urgency_level?.toLowerCase() === 'high' || 
      report.confidence > 75
    ).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer Intelligence Dashboard</h1>
          <p className="text-gray-600">Real-time insights for Mark Goldbridge's broadcast content</p>
        </div>

        {/* Single Column Layout - Cards Stacked Vertically */}
        <div className="space-y-8">
          {/* Active Transfer Reports */}
          <Card className="bg-white border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">Active Transfer Reports</h3>
              <FileText className="h-6 w-6 text-red-500" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">12</div>
            <p className="text-green-500 font-medium">+2 since yesterday</p>
          </Card>

          {/* High Priority Targets */}
          <Card className="bg-white border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">High Priority Targets</h3>
              <TrendingUp className="h-6 w-6 text-red-500" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">5</div>
            <p className="text-red-500 font-medium">3 urgent updates</p>
          </Card>

          {/* YouTube Content */}
          <Card className="bg-white border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">YouTube Content</h3>
              <Youtube className="h-6 w-6 text-red-500" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">8</div>
            <p className="text-gray-600 font-medium">Ready for broadcast</p>
          </Card>

          {/* Last Update */}
          <Card className="bg-white border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">Last Update</h3>
              <Clock className="h-6 w-6 text-red-500" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">2m</div>
            <p className="text-green-500 font-medium">Real-time sync active</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
