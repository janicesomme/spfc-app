
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Transfer Intelligence Dashboard</h1>
          <p className="text-xl text-gray-500">Real-time insights for Mark Goldbridge's broadcast content</p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          {/* Active Transfer Reports */}
          <Card className="bg-white rounded-3xl border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow p-6">
            <CardHeader className="pb-4 px-0 pt-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium text-gray-600">Active Transfer Reports</CardTitle>
                <FileText className="h-6 w-6 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="text-6xl font-bold text-gray-900 mb-3">12</div>
              <p className="text-base text-green-500 font-medium">+2 since yesterday</p>
            </CardContent>
          </Card>

          {/* High Priority Targets */}
          <Card className="bg-white rounded-3xl border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow p-6">
            <CardHeader className="pb-4 px-0 pt-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium text-gray-600">High Priority Targets</CardTitle>
                <TrendingUp className="h-6 w-6 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="text-6xl font-bold text-gray-900 mb-3">5</div>
              <p className="text-base text-red-500 font-medium">3 urgent updates</p>
            </CardContent>
          </Card>

          {/* YouTube Content */}
          <Card className="bg-white rounded-3xl border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow p-6">
            <CardHeader className="pb-4 px-0 pt-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium text-gray-600">YouTube Content</CardTitle>
                <Youtube className="h-6 w-6 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="text-6xl font-bold text-gray-900 mb-3">8</div>
              <p className="text-base text-gray-600 font-medium">Ready for broadcast</p>
            </CardContent>
          </Card>

          {/* Last Update */}
          <Card className="bg-white rounded-3xl border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow p-6">
            <CardHeader className="pb-4 px-0 pt-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium text-gray-600">Last Update</CardTitle>
                <Clock className="h-6 w-6 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="text-6xl font-bold text-gray-900 mb-3">2m</div>
              <p className="text-base text-green-500 font-medium">Real-time sync active</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
