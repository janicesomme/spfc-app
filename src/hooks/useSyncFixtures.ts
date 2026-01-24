import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SyncResult {
  success: boolean;
  message?: string;
  matchesFound?: number;
  matchesUpserted?: number;
  error?: string;
  timestamp?: string;
}

export function useSyncFixtures() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const { toast } = useToast();

  const syncFixtures = async () => {
    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing');
      }

      const response = await fetch(
        `${supabaseUrl}/functions/v1/sync-fixtures`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data: SyncResult = await response.json();
      setResult(data);

      if (data.success) {
        toast({
          title: 'Success',
          description: `Synced ${data.matchesUpserted} fixtures from the website`,
          variant: 'default'
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to sync fixtures',
          variant: 'destructive'
        });
      }

      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult({
        success: false,
        error: errorMessage
      });
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    syncFixtures,
    loading,
    result
  };
}
