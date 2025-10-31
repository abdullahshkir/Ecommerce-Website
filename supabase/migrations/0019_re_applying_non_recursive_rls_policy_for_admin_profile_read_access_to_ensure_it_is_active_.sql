-- Drop any existing non-recursive admin read policy to ensure clean re-creation
DROP POLICY IF EXISTS "Admins can read all profiles non-recursive" ON public.profiles;

-- Create the non-recursive policy for admins to read all profiles
CREATE POLICY "Admins can read all profiles non-recursive" ON public.profiles 
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));