-- Drop existing policy if it conflicts (though unlikely, good practice)
DROP POLICY IF EXISTS "Allow public read of profile names for approved reviews" ON public.profiles;

-- Create a new policy allowing SELECT access if the profile ID is linked to an approved review.
CREATE POLICY "Allow public read of profile names for approved reviews" ON public.profiles 
FOR SELECT USING (
  id IN (
    SELECT user_id 
    FROM public.reviews 
    WHERE is_approved = true
  )
);