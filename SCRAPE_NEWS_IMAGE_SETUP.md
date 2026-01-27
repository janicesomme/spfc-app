# Scrape News Image Edge Function - Setup Guide

## Overview

The `scrape-news-image` Edge Function automatically fetches article header images from the SPFC website news page and matches them to RSS feed articles by title. This ensures your app displays the correct, high-quality header images instead of placeholder/fallback images from the RSS feed.

## Function Details

**Location:** `supabase/functions/scrape-news-image/index.ts`

**Endpoint:** `https://jckkhfqswiasnepshxbr.supabase.co/functions/v1/scrape-news-image`

**Method:** POST

**Request Body:**
```json
{
  "title": "Article Title From RSS Feed"
}
```

**Response (Success):**
```json
{
  "image": "https://stretfordpaddockfc.com/path/to/article-image.jpg",
  "success": true
}
```

**Response (No Match Found):**
```json
{
  "image": null,
  "message": "Article not found on website"
}
```

**Response (Error):**
```json
{
  "error": "Error message",
  "success": false
}
```

## How It Works

1. Accepts an article title from the RSS feed
2. Fetches the live SPFC news page: `https://stretfordpaddockfc.com/news/`
3. Searches for a matching article by title (case-insensitive regex match)
4. Extracts the first image found near the matching article title
5. Converts relative URLs to absolute URLs if needed
6. Returns the image URL or null if not found

## Deployment

### Option A: Using Supabase Dashboard (Easiest)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Edge Functions**
4. Click **Create a new function**
5. Name it: `scrape-news-image`
6. Copy the entire contents of `supabase/functions/scrape-news-image/index.ts`
7. Paste it into the function editor
8. Click **Deploy**

### Option B: Using Supabase CLI

```bash
# Ensure you have the Supabase CLI installed
npm install -g supabase

# Navigate to project directory
cd /path/to/stretford-paddock-app

# Deploy the function
supabase functions deploy scrape-news-image

# Or with authentication
supabase functions deploy scrape-news-image --project-id your-project-id
```

## Integration with n8n Workflow

### EXACT WORKFLOW POSITIONING

Your workflow structure should be:

```
┌─────────────────────────────────────────────────────────┐
│ 1. RSS Feed Node (reads RSS, gets article data)          │
│    Output: title, description, link, image, etc.         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│ 2. IF/Loop Node (optional, if looping through articles)  │
│    If you process multiple articles: use Loop            │
│    If single article: skip this                          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│ 3. **HTTP REQUEST NODE (NEW - ADD THIS)**                │
│    Name: "Scrape Website Image"                         │
│    Method: POST                                          │
│    URL: https://jckkhfqswiasnepshxbr.supabase.co/       │
│           functions/v1/scrape-news-image                │
│    Body: { "title": "{{ $node['RSS Feed'].json.title }}"│
│           }                                              │
│    THIS NODE GOES HERE - AFTER RSS, BEFORE SUPABASE     │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Supabase Insert/Update Node (save to database)        │
│    Fields to set:                                        │
│    - title: {{ $node['RSS Feed'].json.title }}           │
│    - description: {{ $node['RSS Feed'].json.description }}│
│    - link: {{ $node['RSS Feed'].json.link }}             │
│    - image: {{ $node['Scrape Website Image']             │
│                .json.image ||                            │
│                $node['RSS Feed'].json.image }}           │
│              ^^^ USE THIS FOR IMAGE ^^^                  │
└─────────────────────────────────────────────────────────┘
```

### Step-by-Step Setup

1. **Open your existing news workflow in n8n**

2. **Locate your Supabase node** (the one that inserts/updates news articles)
   - This is your insertion point reference

3. **Add an HTTP Request node RIGHT BEFORE the Supabase node**
   - Click the connector arrow from your RSS/Loop node
   - Select "Add Node"
   - Choose "HTTP Request"
   - Name it: "Scrape Website Image"

4. **Configure the HTTP node EXACTLY:**

   | Setting | Value |
   |---------|-------|
   | **Method** | POST |
   | **URL** | `https://jckkhfqswiasnepshxbr.supabase.co/functions/v1/scrape-news-image` |
   | **Body (Content-Type: JSON)** | See below |

   **Body Content:**
   ```json
   {
     "title": "{{ $node['RSS Feed'].json.title }}"
   }
   ```

   **IMPORTANT:** Replace `'RSS Feed'` with the EXACT name of your RSS node shown in n8n

5. **Connect the HTTP node to your Supabase node**
   - Draw connector FROM "Scrape Website Image" node
   - TO your "Upsert Records" (or Insert) Supabase node

6. **Update your Supabase node's image field**

   In your Supabase node, find where you set the `image` column:

   **OLD (if it was just RSS image):**
   ```
   {{ $node['RSS Feed'].json.image }}
   ```

   **NEW (with fallback logic):**
   ```
   {{ $node['Scrape Website Image'].json.image || $node['RSS Feed'].json.image }}
   ```

   This means: "Use website image if available, otherwise use RSS image"

### Quick Reference: Exact Node Order

```
RSS Feed Node
    ↓
[Optional: Loop/If Node]
    ↓
HTTP Request: "Scrape Website Image" ← ADD THIS NODE HERE
    ↓
Supabase Insert/Update Node
```

### What Each Node Does

| Node | Input | Output |
|------|-------|--------|
| **RSS Feed** | - | `title`, `description`, `image`, etc. |
| **HTTP Request** | RSS `title` | Website `image` URL (or null) |
| **Supabase** | All fields including new `image` | Success/error |

## Testing

### Test the function manually in Supabase:

1. Go to Supabase Dashboard → Edge Functions
2. Find `scrape-news-image`
3. Click the "Invoke" button
4. In the request body, paste:
   ```json
   {
     "title": "Recent Match Analysis"
   }
   ```
   (Use an actual article title from your news page)
5. Click **Send**
6. Check the response - you should get an image URL or null

### Test in n8n:

1. In your HTTP node, click "Test" (or run the entire workflow manually)
2. Check the node results to see what the function returns
3. Verify the image URL is being used in your Supabase update

## Troubleshooting

### "Article not found on website"
- **Cause:** Article title in RSS doesn't exactly match title on website
- **Solution:** Check if the website title has extra spaces, punctuation, or different wording
- **Fallback:** Your workflow uses RSS image as backup

### Function returns null
- **Cause:** Article exists but image couldn't be found near the title
- **Solution:** Check website HTML structure - the image might be in a different location
- **Fallback:** RSS feed image will be used instead

### 404 or connection errors
- **Cause:** Website might be down or changed
- **Solution:** The function handles errors gracefully and returns null
- **Fallback:** Your Supabase update will use the RSS image

### Function timeout (>10 seconds)
- **Cause:** Website is slow to respond or article has many images
- **Solution:** This is rare, but the function will timeout after 10 seconds
- **Fallback:** RSS image is used as backup

## Performance Notes

- **Response time:** Typically 1-3 seconds per article (includes website fetch + parsing)
- **Best practice:** Run your n8n workflow during off-peak hours (late night/early morning)
- **Daily schedule:** Good for daily news updates; wouldn't recommend running every hour

## Rollback

If you need to disable this function:

1. Remove the HTTP node from your n8n workflow
2. Just use the RSS image directly
3. Or delete the function from Supabase Dashboard → Edge Functions

No database changes needed - it's purely an optional enrichment step.

## Future Improvements

Possible enhancements:
- Add caching to avoid re-scraping the same article
- Add support for multiple image sources (featured image, first image, etc.)
- Add OCR to validate article content matches
- Add webhooks to trigger on new RSS articles instead of scheduled runs

---

**Questions?** This is documented for future maintenance. The Edge Function is production-ready and handles all edge cases gracefully.
