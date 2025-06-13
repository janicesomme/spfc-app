
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Clock } from "lucide-react";
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

  const getAverageConfidence = () => {
    if (reports.length === 0) return 0;
    const total = reports.reduce((sum, report) => sum + (report.confidence || 0), 0);
    return Math.round(total / reports.length);
  };

  const getActiveTargets = () => {
    return reports.filter(report => 
      report.transfer_likelihood?.toLowerCase() !== 'unlikely'
    ).length;
  };

  const getRecentUpdates = () => {
    // For demo purposes, showing a static number
    // In real implementation, this would check timestamp
    return 3;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer Targets Dashboard</h1>
        <p className="text-gray-600">Real-time intelligence on Manchester United transfer activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Active Targets */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-red-600">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Active Targets
              </CardTitle>
              <Target className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {getActiveTargets()}
              </div>
              <p className="text-sm text-gray-500">
                Players under consideration
              </p>
            </div>
          </CardContent>
        </Card>

        {/* High Priority */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                High Priority
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {getHighPriorityTargets()}
              </div>
              <p className="text-sm text-gray-500">
                Urgent transfer opportunities
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Average Confidence */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Avg Confidence
              </CardTitle>
              <Users className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {getAverageConfidence()}%
              </div>
              <p className="text-sm text-gray-500">
                Success probability
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Recent Updates
              </CardTitle>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {getRecentUpdates()}
              </div>
              <p className="text-sm text-gray-500">
                New reports today
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
            View All Reports
          </button>
          <button className="bg-white text-red-600 border border-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium">
            Add New Target
          </button>
        </div>
      </div>
    </div>
  );
}
