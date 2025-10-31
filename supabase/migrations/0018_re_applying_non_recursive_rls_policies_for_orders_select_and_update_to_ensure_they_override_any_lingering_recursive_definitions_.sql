-- Re-confirm non-recursive SELECT policy on orders
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders non-recursive" ON public.orders;
CREATE POLICY "Admins can view all orders non-recursive" ON public.orders 
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Re-confirm non-recursive UPDATE policy on orders
DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders non-recursive" ON public.orders;
CREATE POLICY "Admins can update all orders non-recursive" ON public.orders 
FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));