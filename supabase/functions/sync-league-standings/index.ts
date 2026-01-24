import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

interface TeamStanding {
  position: number;
  team_name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
}

// Simple HTML parser to extract table rows
function parseLeagueTable(html: string): TeamStanding[] {
  const standings: TeamStanding[] = [];

  // Find all table rows - look for rows within the main table
  const tableMatch = html.match(/<table[^>]*>[\s\S]*?<\/table>/);
  if (!tableMatch) {
    console.log('No table found in HTML');
    return standings;
  }

  const table = tableMatch[0];
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
  const rows = table.match(rowRegex) || [];

  let position = 0;

  for (const row of rows) {
    // Skip header rows
    if (row.includes('<th') || row.includes('thead')) {
      continue;
    }

    // Extract all cells
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
    const cells = [];
    let cell;
    while ((cell = cellRegex.exec(row)) !== null) {
      cells.push(cell[1].trim());
    }

    // Need at least the essential columns: pos, team, p, w, d, l, f, a, gd, pts
    if (cells.length < 10) {
      continue;
    }

    // Parse position - first cell
    const pos = parseInt(cells[0]?.replace(/\D/g, '')) || 0;
    if (pos === 0) continue; // Skip if no valid position

    // Team name - second cell (usually has links, extract text)
    const teamCell = cells[1] || '';
    const teamMatch = teamCell.match(/>([^<]+)</) || teamCell.match(/^([^<]+)/);
    const teamName = teamMatch ? teamMatch[1].trim() : '';

    if (!teamName) continue;

    // Try to extract numeric stats
    // P, W, D, L, F, A are usually in cells 2-7
    // GD and PTS are near the end
    const parseNum = (val: string | undefined) => {
      const num = parseInt((val || '').replace(/\D/g, ''));
      return isNaN(num) ? 0 : num;
    };

    const played = parseNum(cells[2]);
    const wins = parseNum(cells[3]);
    const draws = parseNum(cells[4]);
    const losses = parseNum(cells[5]);
    const goalsFor = parseNum(cells[6]);
    const goalsAgainst = parseNum(cells[7]);

    // GD and PTS - look for negative/positive numbers
    let goalDiff = 0;
    let pts = 0;

    for (let i = 8; i < cells.length; i++) {
      const cellVal = cells[i];
      const num = parseInt(cellVal);
      if (!isNaN(num)) {
        if (goalDiff === 0 && (i === 8 || i === 9)) {
          goalDiff = num;
        } else if (pts === 0 && (i === cells.length - 1 || i === cells.length - 2)) {
          pts = num;
        }
      }
    }

    // If we couldn't parse properly, calculate from other values
    if (goalDiff === 0) {
      goalDiff = goalsFor - goalsAgainst;
    }
    if (pts === 0) {
      pts = (wins * 3) + draws;
    }

    position++;

    standings.push({
      position: pos,
      team_name: teamName,
      played,
      wins,
      draws,
      losses,
      goals_for: goalsFor,
      goals_against: goalsAgainst,
      goal_difference: goalDiff,
      points: pts
    });

    console.log(`✅ Parsed: ${position}. ${teamName} - ${pts} pts`);
  }

  return standings;
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
    console.log('📊 Fetching league standings from nonleaguematters.co.uk...');

    // Fetch league page
    const response = await fetch('https://www.nonleaguematters.co.uk/divisions/114/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch league page: ${response.status}`);
    }

    const html = await response.text();
    const standings = parseLeagueTable(html);

    console.log(`✅ Found ${standings.length} teams in league table`);

    if (standings.length === 0) {
      throw new Error('Could not parse any standings from the page');
    }

    // Initialize Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Upsert league standings
    let upsertedCount = 0;
    const errors: string[] = [];

    for (const standing of standings) {
      try {
        const { error } = await supabase
          .from('league_standings')
          .upsert(
            {
              team_name: standing.team_name,
              position: standing.position,
              played: standing.played,
              wins: standing.wins,
              draws: standing.draws,
              losses: standing.losses,
              goals_for: standing.goals_for,
              goals_against: standing.goals_against,
              goal_difference: standing.goal_difference,
              points: standing.points,
              season: '2025-26',
              league: 'Cheshire Football League - One',
              last_updated: new Date().toISOString()
            },
            { onConflict: 'team_name' }
          );

        if (error) {
          errors.push(`${standing.team_name}: ${error.message}`);
        } else {
          upsertedCount++;
        }
      } catch (err) {
        errors.push(`${standing.team_name}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }

    console.log(`📊 Sync complete: ${upsertedCount} teams upserted`);

    if (errors.length > 0) {
      console.warn(`⚠️ ${errors.length} errors:`, errors);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Synced ${upsertedCount} league standings`,
        teamsFound: standings.length,
        teamsUpserted: upsertedCount,
        errors: errors.length > 0 ? errors : null
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Error syncing league standings:', error);

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
