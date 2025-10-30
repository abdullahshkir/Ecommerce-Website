CREATE POLICY "Admins can view all orders" ON public.orders 
FOR SELECT TO authenticated USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));