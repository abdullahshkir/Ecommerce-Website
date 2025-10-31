-- Drop existing public read policy to ensure clean re-application
DROP POLICY IF EXISTS "Allow public read of approved reviews" ON public.reviews;

-- Create policy to allow authenticated and anonymous users to read approved reviews
CREATE POLICY "Allow public read of approved reviews" ON public.reviews 
FOR SELECT USING (is_approved = true);