
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TransferReport {
  id: number;
  player_name: string;
  transfer_likelihood: string;
  confidence: number;
  urgency_level: string;
  verdict: string;
  timestamp: string;
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood?.toLowerCase()) {
      case 'very likely': return 'bg-green-100 text-green-800';
      case 'likely': return 'bg-blue-100 text-blue-800';
      case 'possible': return 'bg-yellow-100 text-yellow-800';
      case 'unlikely': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <TableHead>Likelihood</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Verdict</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className="hover:bg-red-50">
                <TableCell className="font-medium">{report.player_name}</TableCell>
                <TableCell>
                  <Badge className={getLikelihoodColor(report.transfer_likelihood)}>
                    {report.transfer_likelihood}
                  </Badge>
                </TableCell>
                <TableCell>{report.confidence}%</TableCell>
                <TableCell>
                  <Badge className={getUrgencyColor(report.urgency_level)}>
                    {report.urgency_level}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{report.verdict}</TableCell>
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
