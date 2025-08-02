export async function onRequest(context) {
  const { request, env } = context;
  
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  try {
    const data = await request.json();
    
    // Validate security report data
    const { 
      type, 
      userAgent, 
      timestamp, 
      url, 
      ip,
      botScore,
      action 
    } = data;
    
    // Log security incident
    const securityEvent = {
      timestamp: new Date().toISOString(),
      type: type || 'unknown',
      userAgent: userAgent || request.headers.get('User-Agent'),
      clientIP: ip || request.headers.get('CF-Connecting-IP'),
      url: url || request.headers.get('Referer'),
      botScore: botScore || request.cf?.botManagement?.score || 0,
      action: action || 'logged',
      country: request.cf?.country || 'unknown',
      asn: request.cf?.asn || 'unknown'
    };
    
    // In production, you would send this to your logging service
    console.log('Security Event:', JSON.stringify(securityEvent));
    
    // For high-severity events, you might want to trigger alerts
    if (securityEvent.botScore > 90 || type === 'attack') {
      // Trigger alert (implement your alerting mechanism)
      console.warn('HIGH SEVERITY SECURITY EVENT:', securityEvent);
    }
    
    return new Response(JSON.stringify({
      status: 'recorded',
      eventId: `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: securityEvent.timestamp
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Invalid request data'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}