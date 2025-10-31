-- Drop old policies
DROP POLICY IF EXISTS "Admins can view all orders non-recursive" ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders non-recursive" ON public.orders;

-- Create new policies using is_admin()
CREATE POLICY "Admins can view all orders" ON public.orders 
FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Admins can update all orders" ON public.orders 
FOR UPDATE TO authenticated USING (public.is_admin());