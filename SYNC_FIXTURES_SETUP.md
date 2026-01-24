# Sync Fixtures Edge Function Setup

This guide explains how to deploy and use the `sync-fixtures` Edge Function that automatically syncs match data from the website to your Supabase database.

## What it does

- Scrapes match results from `https://stretfordpaddockfc.com/results/`
- Parses teams, dates, and scores
- Syncs the data to your `fixtures` table in Supabase
- Handles both completed matches (with scores) and upcoming fixtures (no scores yet)

## Deployment

### Option 1: Deploy via Supabase CLI (Recommended)

1. Install Supabase CLI if you haven't already:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref jckkhfqswiasnepshxbr
```

4. Deploy the function:
```bash
supabase functions deploy sync-fixtures
```

5. Verify deployment:
```bash
supabase functions list
```

### Option 2: Deploy via Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Navigate to your project
3. Go to Edge Functions
4. Click "Create a new function"
5. Copy the contents of `supabase/functions/sync-fixtures/index.ts`
6. Paste into the editor and save

## Testing the Function

Once deployed, test it by calling the function:

```bash
curl -X GET https://your-supabase-url/functions/v1/sync-fixtures \
  -H "Authorization: Bearer your-anon-key"
```

Or from within the app (see React component below).

## Using from the App

Add this function to your app to manually sync fixtures:

```typescript
async function syncFixtures() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-fixtures`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      }
    );

    const data = await response.json();
    console.log('Fixtures synced:', data);
  } catch (error) {
    console.error('Sync failed:', error);
  }
}
```

## Scheduling Automatic Syncs

To automatically sync fixtures daily, set up a cron job using Supabase's pg_cron extension:

1. Go to your Supabase project
2. Open the SQL Editor
3. Run this query:

```sql
-- Install pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function to call your Edge Function
CREATE OR REPLACE FUNCTION sync_fixtures_cron()
RETURNS void AS $$
BEGIN
  PERFORM
  net.http_get(
    url := 'https://your-supabase-url/functions/v1/sync-fixtures',
    headers := jsonb_build_object('Authorization', 'Bearer your-service-role-key')
  );
END;
$$ LANGUAGE plpgsql;

-- Schedule it to run every day at 2 AM
SELECT cron.schedule('sync_fixtures_daily', '0 2 * * *', 'SELECT sync_fixtures_cron()');
```

Replace:
- `your-supabase-url` with your actual Supabase URL
- `your-service-role-key` with your service role key (from Project Settings > API)

## What Data Gets Synced

The function creates/updates entries in the `fixtures` table with:

- `external_id`: Unique match identifier
- `home_team`: Home team name
- `opponent`: Away team name
- `kickoff`: Match date/time
- `home_goals`: Goals scored (null if upcoming)
- `away_goals`: Goals conceded (null if upcoming)
- `competition`: Competition name (defaults to "League")
- `status`: "completed" or "upcoming"

## Troubleshooting

If the function doesn't work:

1. **Check logs**: View real-time logs in your Supabase dashboard under Edge Functions
2. **Verify environment variables**: Make sure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
3. **Test manually**: Call the function directly to see error messages
4. **Check website structure**: If the website layout changed, the parsing logic might need updating

## Updating the Parser

If the website format changes, update the `parseMatch()` function in `supabase/functions/sync-fixtures/index.ts` to match the new format.
