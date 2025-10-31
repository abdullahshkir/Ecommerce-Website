-- Drop existing admin select policy on orders
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

-- Create a new policy that checks the user's role directly via EXISTS subquery
CREATE POLICY "Admins can view all orders non-recursive" ON public.orders 
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));