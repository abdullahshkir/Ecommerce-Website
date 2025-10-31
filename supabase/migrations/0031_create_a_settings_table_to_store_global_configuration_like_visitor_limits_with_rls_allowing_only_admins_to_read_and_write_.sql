-- Create settings table
CREATE TABLE public.settings (
  id INT PRIMARY KEY,
  visitor_limit INT DEFAULT 1000,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial default row
INSERT INTO public.settings (id, visitor_limit) VALUES (1, 1000) ON CONFLICT (id) DO NOTHING;

-- Enable RLS (REQUIRED)
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Policy: Only Admins can read settings
CREATE POLICY "Admins can read settings" ON public.settings 
FOR SELECT TO authenticated USING (public.is_admin());

-- Policy: Only Admins can update settings
CREATE POLICY "Admins can update settings" ON public.settings 
FOR UPDATE TO authenticated USING (public.is_admin());