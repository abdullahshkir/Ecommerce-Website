-- 1. Drop the existing public read policy on profiles
DROP POLICY IF EXISTS "Allow public read of profile names for approved reviews" ON public.profiles;

-- 2. Re-create the policy using the EXISTS clause for better performance and reliability in joins
CREATE POLICY "Allow public read of profile names for approved reviews" ON public.profiles 
FOR SELECT USING (
  EXISTS (
    SELECT 1
    FROM public.reviews
    WHERE reviews.user_id = profiles.id AND reviews.is_approved = true
  )
);