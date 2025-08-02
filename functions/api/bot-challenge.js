export async function onRequest(context) {
  const { request, env } = context;
  
  // Enhanced bot detection using Cloudflare's bot score
  const botScore = request.cf?.botManagement?.score || 0;
  const verifiedBot = request.cf?.botManagement?.verifiedBot || false;
  
  // Get request details
  const userAgent = request.headers.get('User-Agent') || '';
  const referer = request.headers.get('Referer') || '';
  const clientIP = request.headers.get('CF-Connecting-IP') || '';
  
  // Aggressive bot patterns
  const suspiciousPatterns = [
    /headless/i,
    /phantom/i,
    /selenium/i,
    /crawl/i,
    /bot/i,
    /spider/i,
    /scraper/i,
    /python-requests/i,
    /curl/i,
    /wget/i,
    /httpclient/i,
    /scanner/i,
    /attack/i
  ];
  
  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent));
  
  // High-confidence bot detection
  if ((botScore > 80 && !verifiedBot) || isSuspicious) {
    return new Response(JSON.stringify({
      error: 'Access denied',
      reason: 'Automated traffic detected',
      timestamp: new Date().toISOString(),
      ip: clientIP
    }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'X-Bot-Score': botScore.toString()
      }
    });
  }
  
  // Challenge suspicious traffic (30-80 bot score)
  if (botScore > 30 && botScore <= 80) {
    return new Response(JSON.stringify({
      challenge: true,
      message: 'Please complete verification',
      botScore: botScore
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'CF-Challenge': 'js_challenge'
      }
    });
  }
  
  // Allow legitimate traffic
  return new Response(JSON.stringify({
    status: 'allowed',
    botScore: botScore,
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}