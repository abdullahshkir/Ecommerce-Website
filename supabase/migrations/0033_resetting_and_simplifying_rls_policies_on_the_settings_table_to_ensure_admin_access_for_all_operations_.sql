-- Drop existing policies
DROP POLICY IF EXISTS "Admins can read settings" ON public.settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.settings;

-- Policy: Admins can perform all operations (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Admins full access to settings" ON public.settings 
FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());