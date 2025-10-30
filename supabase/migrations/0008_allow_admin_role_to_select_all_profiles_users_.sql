CREATE POLICY "Admins can view all profiles" ON public.profiles 
FOR SELECT TO authenticated USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));