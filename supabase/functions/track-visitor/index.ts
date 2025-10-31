import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple function to parse User Agent string (basic implementation)
function parseUserAgent(userAgent: string | null) {
    if (!userAgent) return { device_type: 'Unknown', browser: 'Unknown', os: 'Unknown' };

    let browser = 'Unknown';
    let os = 'Unknown';
    let device_type = 'Desktop';

    if (userAgent.match(/Mobile|Android|iPhone|iPad|iPod|Windows Phone/i)) {
        device_type = 'Mobile';
    } else if (userAgent.match(/Tablet|iPad/i)) {
        device_type = 'Tablet';
    }

    if (userAgent.match(/Chrome/i) && !userAgent.match(/Edg/i)) browser = 'Chrome';
    else if (userAgent.match(/Firefox/i)) browser = 'Firefox';
    else if (userAgent.match(/Safari/i) && !userAgent.match(/Chrome/i)) browser = 'Safari';
    else if (userAgent.match(/Edg/i)) browser = 'Edge';
    else if (userAgent.match(/MSIE|Trident/i)) browser = 'IE';

    if (userAgent.match(/Windows/i)) os = 'Windows';
    else if (userAgent.match(/Macintosh|Mac OS X/i)) os = 'macOS';
    else if (userAgent.match(/Android/i)) os = 'Android';
    else if (userAgent.match(/iPhone|iPad|iPod/i)) os = 'iOS';
    else if (userAgent.match(/Linux/i)) os = 'Linux';

    return { device_type, browser, os };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get IP address from the request headers (Supabase/Deno environment provides this)
    const ip_address = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'N/A';
    const user_agent = req.headers.get('user-agent');
    const referrer = req.headers.get('referer') || 'Direct';
    
    const { device_type, browser, os } = parseUserAgent(user_agent);

    // Create Supabase client (using service role key is safer for server-side inserts, 
    // but since we enabled RLS for anonymous insert, we use the standard client for simplicity)
    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')! // Using anon key as RLS allows public insert
    );

    const { error } = await supabaseClient
      .from('visitors')
      .insert({
        ip_address,
        user_agent,
        referrer,
        device_type,
        browser,
        os,
      });

    if (error) {
      console.error('Supabase Insert Error:', error);
      return new Response(JSON.stringify({ error: 'Database insert failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Visitor tracked successfully' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('General Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});