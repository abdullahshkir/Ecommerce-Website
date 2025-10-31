CREATE POLICY "Admins can read all profiles" ON public.profiles 
FOR SELECT TO authenticated USING (auth.uid() IN ( SELECT id FROM profiles WHERE role = 'admin'::text));