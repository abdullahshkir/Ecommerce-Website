-- Drop existing reviews table if it exists to recreate with constraints
DROP TABLE IF EXISTS public.reviews CASCADE;

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- User ID is now mandatory
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (REQUIRED)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policies (Re-creating existing policies with NOT NULL user_id assumption)
-- Allow authenticated users to insert reviews
CREATE POLICY "Allow authenticated users to insert reviews" ON public.reviews 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Allow public read of approved reviews
CREATE POLICY "Allow public read of approved reviews" ON public.reviews 
FOR SELECT USING (is_approved = true);

-- Admins can manage all reviews (already exists, ensuring it covers all operations)
-- Assuming the existing admin policy is sufficient for UPDATE/DELETE/SELECT by admin role.
-- Existing policy: "Admins can manage all reviews" ON reviews FOR * USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)))