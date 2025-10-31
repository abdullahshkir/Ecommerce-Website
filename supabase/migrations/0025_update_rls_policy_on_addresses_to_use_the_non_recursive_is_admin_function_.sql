-- Drop old policy
DROP POLICY IF EXISTS "Admins can view all addresses" ON public.addresses;

-- Create new policy using is_admin()
CREATE POLICY "Admins can view all addresses" ON public.addresses 
FOR SELECT TO authenticated USING (public.is_admin());