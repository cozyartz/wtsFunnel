// Dynamic robots.txt with additional bot blocking
export async function onRequest(context) {
  const { request } = context;
  
  // Get user agent for logging
  const userAgent = request.headers.get('User-Agent') || '';
  
  // Additional AI/ML crawlers to block
  const aiCrawlers = [
    'GPTBot',
    'ChatGPT-User',
    'CCBot',
    'anthropic-ai',
    'Claude-Web',
    'PerplexityBot',
    'YouBot',
    'BingBot/2.0',
    'facebookexternalhit',
    'Twitterbot',
    'LinkedInBot',
    'WhatsApp',
    'TelegramBot',
    'DataForSeoBot',
    'PetalBot',
    'MegaIndex.ru',
    'YandexBot',
    'SeznamBot',
    'BaiduSpider'
  ];
  
  // Log robots.txt access for monitoring
  console.log(`robots.txt accessed by: ${userAgent}`);
  
  // Build dynamic robots.txt content
  let robotsContent = `# Enhanced robots.txt with AI crawler protection
# Generated dynamically with bot detection

`;

  // Block AI crawlers
  aiCrawlers.forEach(bot => {
    robotsContent += `User-agent: ${bot}
Disallow: /

`;
  });

  // Add the rest of the robots.txt content
  robotsContent += `# Allow legitimate search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Block aggressive crawlers and scrapers
User-agent: ia_archiver
Disallow: /

User-agent: Wayback
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Default policy for other bots
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://wantthissite.com/sitemap.xml

# Block access to admin areas and sensitive files
Disallow: /admin/
Disallow: /.git/
Disallow: /node_modules/
Disallow: /dist/
Disallow: /.env
Disallow: /wrangler.toml
Disallow: /functions/

# Crawl delay for rate limiting
Crawl-delay: 1

# Last updated: ${new Date().toISOString()}
`;

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}