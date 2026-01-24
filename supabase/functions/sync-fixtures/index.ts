import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

interface ParsedMatch {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number | null;
  awayGoals: number | null;
  competition: string;
}

function parseDate(dateStr: string): string {
  try {
    // Parse "Jan 17, 2026" format
    const date = new Date(dateStr);
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function parseMatch(line: string): ParsedMatch | null {
  // Format: "Jan 17, 2026: PADDOCK 2-2 Winsford Town"
  const match = line.match(/^(.*?): (.*)$/);
  if (!match) return null;

  const dateStr = match[1].trim();
  const matchInfo = match[2].trim();

  // Parse the match info to get teams and score
  // Handles both "TEAM1 X-Y TEAM2" and "TEAM1 - TEAM2" (no score yet)
  const scoreMatch = matchInfo.match(/^(.+?)\s+(\d+)-(\d+)\s+(.+)$|^(.+?)\s+-\s+(.+)$/);

  if (!scoreMatch) return null;

  let homeTeam = '';
  let awayTeam = '';
  let homeGoals: number | null = null;
  let awayGoals: number | null = null;

  if (scoreMatch[1]) {
    // Has score
    homeTeam = scoreMatch[1].trim();
    homeGoals = parseInt(scoreMatch[2]);
    awayGoals = parseInt(scoreMatch[3]);
    awayTeam = scoreMatch[4].trim();
  } else {
    // No score (upcoming match)
    homeTeam = scoreMatch[5].trim();
    awayTeam = scoreMatch[6].trim();
  }

  return {
    date: parseDate(dateStr),
    homeTeam,
    awayTeam,
    homeGoals,
    awayGoals,
    competition: 'League' // Default competition
  };
}

function extractMatchesFromHtml(html: string): ParsedMatch[] {
  const matches: ParsedMatch[] = [];

  // Split by lines and process each
  const lines = html.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    // Look for lines that start with a date pattern
    if (/^[A-Za-z]+\s+\d+,\s+\d{4}:/.test(trimmed)) {
      const parsed = parseMatch(trimmed);
      if (parsed) {
        matches.push(parsed);
      }
    }
  }

  return matches;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    console.log('📥 Fetching fixtures from stretfordpaddockfc.com/results/...');

    // Fetch results page
    const response = await fetch('https://stretfordpaddockfc.com/results/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch results page: ${response.status}`);
    }

    const html = await response.text();
    const matches = extractMatchesFromHtml(html);

    console.log(`✅ Found ${matches.length} matches on the website`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Upsert matches into fixtures table
    let upsertedCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < matches.length; i++) {
      const m = matches[i];

      // Generate a unique ID based on date and teams
      const externalId = `${new Date(m.date).getTime()}-${m.homeTeam.replace(/\s+/g, '')}-${m.awayTeam.replace(/\s+/g, '')}`;

      try {
        const { error } = await supabase
          .from('fixtures')
          .upsert(
            {
              external_id: externalId,
              home_team: m.homeTeam,
              opponent: m.awayTeam,
              kickoff: m.date,
              home_goals: m.homeGoals,
              away_goals: m.awayGoals,
              competition: m.competition,
              status: m.homeGoals !== null ? 'completed' : 'upcoming',
              is_active: true
            },
            { onConflict: 'external_id' }
          );

        if (error) {
          errors.push(`Match ${m.homeTeam} vs ${m.awayTeam}: ${error.message}`);
        } else {
          upsertedCount++;
          console.log(`✅ Upserted: ${m.homeTeam} vs ${m.awayTeam} (${m.homeGoals !== null ? `${m.homeGoals}-${m.awayGoals}` : 'upcoming'})`);
        }
      } catch (err) {
        errors.push(`Match ${m.homeTeam} vs ${m.awayTeam}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }

    console.log(`📊 Sync complete: ${upsertedCount} matches upserted`);

    if (errors.length > 0) {
      console.warn(`⚠️ ${errors.length} errors during sync:`, errors);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Synced ${upsertedCount} fixtures from website`,
        matchesFound: matches.length,
        matchesUpserted: upsertedCount,
        errors: errors.length > 0 ? errors : null
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Error syncing fixtures:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})
