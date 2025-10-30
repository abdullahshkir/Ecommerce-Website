CREATE POLICY "Admins can view all addresses" ON public.addresses 
FOR SELECT TO authenticated USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));