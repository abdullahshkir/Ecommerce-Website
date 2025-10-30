CREATE POLICY "Admins can view all reviews" ON public.reviews 
FOR SELECT TO authenticated USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));