
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Transfer Intelligence Dashboard</h1>
          <p className="text-lg text-gray-600">Real-time insights for Mark Goldbridge's broadcast content</p>
        </div>

        {/* Single Column Layout - Matching Reference Image */}
        <div className="space-y-6">
          {/* Active Transfer Reports */}
          <Card className="bg-white rounded-2xl border border-red-200 shadow-sm hover:shadow-md transition-shadow p-8">
            <CardHeader className="pb-6 px-0 pt-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium text-gray-700">Active Transfer Reports</CardTitle>
                <FileText className="h-6 w-6 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="text-5xl font-bold text-gray-900 mb-2">12</div>
              <p className="text-lg text-green-500 font-medium">+2 since yesterday</p>
            </CardContent>
          </Card>

          {/* High Priority Targets */}
          <Card className="bg-white rounded-2xl border border-red-200 shadow-sm hover:shadow-md transition-shadow p-8">
            <CardHeader className="pb-6 px-0 pt-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium text-gray-700">High Priority Targets</CardTitle>
                <TrendingUp className="h-6 w-6 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="text-5xl font-bold text-gray-900 mb-2">5</div>
              <p className="text-lg text-red-500 font-medium">3 urgent updates</p>
            </CardContent>
          </Card>

          {/* YouTube Content */}
          <Card className="bg-white rounded-2xl border border-red-200 shadow-sm hover:shadow-md transition-shadow p-8">
            <CardHeader className="pb-6 px-0 pt-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium text-gray-700">YouTube Content</CardTitle>
                <Youtube className="h-6 w-6 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="text-5xl font-bold text-gray-900 mb-2">8</div>
              <p className="text-lg text-gray-600 font-medium">Ready for broadcast</p>
            </CardContent>
          </Card>

          {/* Last Update */}
          <Card className="bg-white rounded-2xl border border-red-200 shadow-sm hover:shadow-md transition-shadow p-8">
            <CardHeader className="pb-6 px-0 pt-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium text-gray-700">Last Update</CardTitle>
                <Clock className="h-6 w-6 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="text-5xl font-bold text-gray-900 mb-2">2m</div>
              <p className="text-lg text-green-500 font-medium">Real-time sync active</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
