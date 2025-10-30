-- Re-enable RLS (REQUIRED for security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create secure policies for each operation
-- Policy 1: Users can read their own profile
DROP POLICY IF EXISTS profiles_select_policy ON public.profiles;
CREATE POLICY "profiles_select_policy" ON public.profiles 
FOR SELECT TO authenticated USING (auth.uid() = id);

-- Policy 2: Users can insert their own profile (used by trigger)
DROP POLICY IF EXISTS profiles_insert_policy ON public.profiles;
CREATE POLICY "profiles_insert_policy" ON public.profiles 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Policy 3: Users can update their own profile
DROP POLICY IF EXISTS profiles_update_policy ON public.profiles;
CREATE POLICY "profiles_update_policy" ON public.profiles 
FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Policy 4: Users can delete their own profile
DROP POLICY IF EXISTS profiles_delete_policy ON public.profiles;
CREATE POLICY "profiles_delete_policy" ON public.profiles 
FOR DELETE TO authenticated USING (auth.uid() = id);

-- Policy 5: Admins can view all profiles (needed for AdminUsersPage)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles 
FOR SELECT USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));