import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      )
    }

    const { title } = await req.json()

    if (!title) {
      return new Response(
        JSON.stringify({ error: "Article title is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    console.log(`Scraping news page for article: "${title}"`)

    // Fetch the news page
    const newsPageResponse = await fetch("https://stretfordpaddockfc.com/news/")
    if (!newsPageResponse.ok) {
      throw new Error(`Failed to fetch news page: ${newsPageResponse.status}`)
    }

    const newsPageHtml = await newsPageResponse.text()

    // Create regex to find the article heading (case-insensitive, flexible whitespace)
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const titleRegex = new RegExp(
      `<h[1-6][^>]*>[\\s\\n]*${escapedTitle}[\\s\\n]*</h[1-6]>`,
      "i"
    )

    const titleMatch = newsPageHtml.match(titleRegex)

    if (!titleMatch) {
      console.warn(`Article title not found: "${title}"`)
      return new Response(
        JSON.stringify({
          image: null,
          message: "Article not found on website news page"
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    }

    console.log(`Found matching article title`)

    // Look for image near the title match
    const matchIndex = newsPageHtml.indexOf(titleMatch[0])

    // Look backwards and forwards from the title to find the article container
    const searchStart = Math.max(0, matchIndex - 5000)
    const searchEnd = Math.min(newsPageHtml.length, matchIndex + 3000)
    const context = newsPageHtml.substring(searchStart, searchEnd)

    // Look for image src (jpg, jpeg, png, gif, webp)
    const imgRegex = /<img[^>]+src=["']([^"']*\.(?:jpg|jpeg|png|gif|webp))["'][^>]*>/i
    const imgMatch = context.match(imgRegex)

    if (imgMatch && imgMatch[1]) {
      let imageUrl = imgMatch[1]

      // Handle relative URLs
      if (!imageUrl.startsWith("http")) {
        imageUrl = "https://stretfordpaddockfc.com" +
          (imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl)
      }

      console.log(`Found image URL: ${imageUrl}`)

      return new Response(
        JSON.stringify({
          image: imageUrl,
          success: true
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    }

    console.warn(`No image found near article title: "${title}"`)

    return new Response(
      JSON.stringify({
        image: null,
        message: "No image found for this article on website"
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )

  } catch (error) {
    console.error("Error scraping news image:", error)
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
