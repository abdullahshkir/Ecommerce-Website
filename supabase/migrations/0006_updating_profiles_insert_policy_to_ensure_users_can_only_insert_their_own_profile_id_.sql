-- Drop the existing permissive insert policy
DROP POLICY IF EXISTS profiles_insert_policy ON public.profiles;

-- Create a new, more secure insert policy
CREATE POLICY "Users can only insert their own profile" ON public.profiles 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);