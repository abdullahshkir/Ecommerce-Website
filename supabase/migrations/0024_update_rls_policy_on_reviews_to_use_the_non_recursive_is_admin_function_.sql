-- Drop old policy
DROP POLICY IF EXISTS "Admins can view all reviews" ON public.reviews;

-- Create new policy using is_admin()
CREATE POLICY "Admins can view all reviews" ON public.reviews 
FOR SELECT TO authenticated USING (public.is_admin());