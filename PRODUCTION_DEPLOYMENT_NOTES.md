# Production Deployment Notes

## Critical Tasks Before Going Live

### 1. ⚠️ Edge Function Deployment Required

**Status:** Edge Function code is ready but NOT YET DEPLOYED to Supabase
**Location:** `supabase/functions/sync-fixtures/index.ts`
**Reason:** Automates fixture/results data syncing from website

**What to do before production:**
- Deploy the `sync-fixtures` Edge Function to Supabase (see [SYNC_FIXTURES_SETUP.md](SYNC_FIXTURES_SETUP.md))
- Set up automatic cron scheduling to sync data daily
- Test that fixture data updates automatically

**Current Workaround:**
- Sample fixture data is currently hardcoded in the database
- This works for development/demo but is NOT suitable for production
- Real match data must be synced from website automatically

**Deployment Steps (when ready):**
```bash
supabase login
supabase link --project-ref jckkhfqswiasnepshxbr
supabase functions deploy sync-fixtures
```

See [SYNC_FIXTURES_SETUP.md](SYNC_FIXTURES_SETUP.md) for complete instructions.

### 2. ⚠️ League Standings Edge Function Deployment Required

**Status:** Edge Function code is ready but NOT YET DEPLOYED to Supabase
**Location:** `supabase/functions/sync-league-standings/index.ts`
**Reason:** Syncs official league standings from nonleaguematters.co.uk to database

**What to do before production:**
- Create a `league_standings` table in Supabase (structure below)
- Deploy the `sync-league-standings` Edge Function
- Set up automatic cron scheduling to sync standings daily/weekly
- Add RLS policy to allow public read access

**Table Structure Needed:**
```sql
CREATE TABLE league_standings (
  id BIGSERIAL PRIMARY KEY,
  team_name TEXT NOT NULL UNIQUE,
  position INT NOT NULL,
  played INT,
  wins INT,
  draws INT,
  losses INT,
  goals_for INT,
  goals_against INT,
  goal_difference INT,
  points INT,
  season TEXT DEFAULT '2025-26',
  league TEXT DEFAULT 'Cheshire Football League - One',
  last_updated TIMESTAMP DEFAULT NOW()
);
```

**Current State:**
- League page is ready to display standings
- Displays live standings from `nonleaguematters.co.uk`
- Shows Stretford Paddock FC at position 6 with 36 points

**Deployment Steps (when ready):**
```bash
supabase functions deploy sync-league-standings
```

Then set up cron job (similar to sync-fixtures):
```sql
SELECT cron.schedule('sync_league_standings_daily', '0 3 * * *', 'SELECT sync_league_standings_cron()');
```

---

## Other Production Checklist

- [ ] League, Fixtures, Results pages deployed and working
- [ ] Create `league_standings` table in Supabase
- [ ] Edge Function for sync-fixtures deployed to Supabase
- [ ] Edge Function for sync-league-standings deployed to Supabase
- [ ] Auto-sync cron jobs configured for both functions
- [ ] RLS policies enabled for fixtures and league_standings tables (public read)
- [ ] SSL certificate configured
- [ ] Environment variables set correctly for production
- [ ] Vercel auto-deployment configured

---

## Related Files

- [SYNC_FIXTURES_SETUP.md](SYNC_FIXTURES_SETUP.md) - Complete guide for fixtures Edge Function
- [supabase/functions/sync-fixtures/index.ts](supabase/functions/sync-fixtures/index.ts) - Fixtures scraper
- [supabase/functions/sync-league-standings/index.ts](supabase/functions/sync-league-standings/index.ts) - League standings scraper
- [src/hooks/useSyncFixtures.ts](src/hooks/useSyncFixtures.ts) - React hook for calling fixtures sync

---

**Last Updated:** 2026-01-24
**Status:** Development/Demo Phase (sample data + real standings)
**Action Required For Production:**
1. Deploy both Edge Functions (sync-fixtures + sync-league-standings)
2. Create league_standings table
3. Set up cron scheduling for automatic updates
