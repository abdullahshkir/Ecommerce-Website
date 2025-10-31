-- 1. Drop the existing public read policy on reviews
DROP POLICY IF EXISTS "Allow public read of approved reviews" ON public.reviews;

-- 2. Re-create the policy to allow all users (anonymous and authenticated) to read approved reviews
CREATE POLICY "Allow public read of approved reviews" ON public.reviews 
FOR SELECT USING (is_approved = true);