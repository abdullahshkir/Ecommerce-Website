-- Create visitors table
CREATE TABLE public.visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT
);

-- Enable RLS (REQUIRED)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all visitor data
CREATE POLICY "Admins can view all visitors" ON public.visitors 
FOR SELECT TO authenticated USING (public.is_admin());

-- Policy: Allow anonymous/authenticated users to insert data (via Edge Function)
-- We allow insert for all users because the Edge Function will handle the tracking call.
CREATE POLICY "Allow all users to insert visitor data" ON public.visitors 
FOR INSERT WITH CHECK (true);