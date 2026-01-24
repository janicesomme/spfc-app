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

---

## Other Production Checklist

- [ ] League, Fixtures, Results pages deployed and working
- [ ] Edge Function for sync-fixtures deployed to Supabase
- [ ] Auto-sync cron job configured (or manual sync schedule established)
- [ ] SSL certificate configured
- [ ] Environment variables set correctly for production
- [ ] Vercel auto-deployment configured

---

## Related Files

- [SYNC_FIXTURES_SETUP.md](SYNC_FIXTURES_SETUP.md) - Complete guide for Edge Function deployment
- [supabase/functions/sync-fixtures/index.ts](supabase/functions/sync-fixtures/index.ts) - The Edge Function code
- [src/hooks/useSyncFixtures.ts](src/hooks/useSyncFixtures.ts) - React hook for calling the sync function

---

**Last Updated:** 2026-01-24
**Status:** Development/Demo Phase (sample data)
**Action Required For Production:** Deploy Edge Function
