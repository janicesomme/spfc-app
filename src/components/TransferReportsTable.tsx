
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TransferReport {
  id: number;
  player_name: string | null;
  confidence: number | null;
  timestamp: string;
  club: string | null;
  position: string | null;
  executive_summary: string | null;
  market_competition: string | null;
  news_reliability: string | null;
}

export function TransferReportsTable() {
  const [reports, setReports] = useState<TransferReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('transfer-reports-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'transfer_reports' },
        (payload) => {
          console.log('Transfer report change:', payload);
          fetchReports();
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "New Transfer Report",
              description: `Report for ${payload.new.player_name} has been added`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('transfer_reports')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);

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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Transfer Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">Latest Transfer Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Club</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>News Source</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className="hover:bg-red-50">
                <TableCell className="font-medium">{report.player_name}</TableCell>
                <TableCell>{report.club || 'Unknown'}</TableCell>
                <TableCell>{report.position || 'Unknown'}</TableCell>
                <TableCell>{report.confidence}%</TableCell>
                <TableCell>
                  <Badge className={report.news_reliability === 'High' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {report.news_reliability || 'Unknown'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {reports.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No transfer reports available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
