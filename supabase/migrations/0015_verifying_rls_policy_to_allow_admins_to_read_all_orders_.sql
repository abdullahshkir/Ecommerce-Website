-- Drop existing admin read policy on orders if it exists to re-apply the correct one
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

-- Re-create the policy to ensure it's active and correct
CREATE POLICY "Admins can view all orders" ON public.orders 
FOR SELECT TO authenticated USING (auth.uid() IN ( SELECT id FROM profiles WHERE role = 'admin'::text));