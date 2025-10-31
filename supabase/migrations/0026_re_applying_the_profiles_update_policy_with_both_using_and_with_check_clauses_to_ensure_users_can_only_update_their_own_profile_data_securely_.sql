-- Drop existing policy
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;

-- Create robust update policy
CREATE POLICY "profiles_update_policy" ON public.profiles 
FOR UPDATE TO authenticated 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);