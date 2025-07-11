import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  source: {
    name: string;
    logo: string;
  };
  publishedAt: string;
  relevanceScore: number;
  rank: number;
  hasImage: boolean;
  categories: {
    isBreaking: boolean;
    isTransfer: boolean;
    isMatchReport: boolean;
  };
}

interface WebhookPayload {
  articles: NewsArticle[];
  timestamp: string;
  count: number;
}

serve(async (req) => {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    // Parse the JSON body
    const data: WebhookPayload = await req.json();

    // Basic validation
    if (!data.articles || !Array.isArray(data.articles)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid articles data' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!data.timestamp || !data.count) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing timestamp or count' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Log the received data
    console.log('📰 News webhook received:');
    console.log(`📅 Timestamp: ${data.timestamp}`);
    console.log(`📊 Count: ${data.count}`);
    console.log(`📋 Articles: ${data.articles.length}`);
    
    // Log each article for debugging
    data.articles.forEach((article, index) => {
      console.log(`\n📰 Article ${index + 1}:`);
      console.log(`   Title: ${article.title}`);
      console.log(`   Source: ${article.source.name}`);
      console.log(`   URL: ${article.url}`);
      console.log(`   Breaking: ${article.categories.isBreaking}`);
      console.log(`   Transfer: ${article.categories.isTransfer}`);
      console.log(`   Match Report: ${article.categories.isMatchReport}`);
      console.log(`   Relevance Score: ${article.relevanceScore}`);
    });

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Articles received',
        processed: data.articles.length
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Invalid JSON or server error' 
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});