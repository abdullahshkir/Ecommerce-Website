-- Drop the old recursive policy
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Create the new policy using is_admin()
CREATE POLICY "Admins can manage products" ON public.products 
FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());