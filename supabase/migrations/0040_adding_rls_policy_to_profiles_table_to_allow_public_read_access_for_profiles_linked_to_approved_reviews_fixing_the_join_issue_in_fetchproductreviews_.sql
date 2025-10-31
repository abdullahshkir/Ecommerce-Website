-- 1. Drop the existing public read policy on profiles (if it exists)
DROP POLICY IF EXISTS "Allow public read of profile names for approved reviews" ON public.profiles;

-- 2. Create a new policy allowing public read access ONLY for profiles whose IDs are linked to an approved review.
CREATE POLICY "Allow public read of profile names for approved reviews" ON public.profiles 
FOR SELECT USING (
  id IN (
    SELECT reviews.user_id
    FROM reviews
    WHERE reviews.is_approved = true
  )
);