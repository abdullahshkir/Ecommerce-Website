CREATE POLICY "Admins can delete all visitors" ON public.visitors 
FOR DELETE TO authenticated USING (public.is_admin());