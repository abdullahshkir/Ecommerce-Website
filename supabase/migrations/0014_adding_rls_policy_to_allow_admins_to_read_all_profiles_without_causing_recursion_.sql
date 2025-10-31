CREATE POLICY "Admins can read all profiles non-recursive" ON public.profiles 
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));