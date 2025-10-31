-- Drop all policies again to ensure no duplicates or conflicts remain
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can only insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can only update their own profile" ON public.profiles;

-- 1. SELECT (Customer): User can read their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles 
FOR SELECT TO authenticated USING (auth.uid() = id);

-- 2. SELECT (Admin): Admin can read all profiles
CREATE POLICY "Admins can read all profiles" ON public.profiles 
FOR SELECT TO authenticated USING (public.is_admin());

-- 3. INSERT (Customer): User can only insert their own profile (handled by trigger)
CREATE POLICY "Users can only insert their own profile" ON public.profiles 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- 4. UPDATE (Customer): User can only update their own profile
CREATE POLICY "Users can only update their own profile" ON public.profiles 
FOR UPDATE TO authenticated 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);