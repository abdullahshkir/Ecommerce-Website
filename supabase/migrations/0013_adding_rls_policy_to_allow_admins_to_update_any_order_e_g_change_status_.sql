CREATE POLICY "Admins can update all orders" ON public.orders 
FOR UPDATE TO authenticated USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));