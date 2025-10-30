-- Drop existing admin policy on products
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Create a new policy that checks the user's role directly via JOIN (or simplified subquery if JOIN is not possible in RLS USING clause)
-- Since RLS policies are limited, we will use a non-recursive subquery that checks the role.
-- The previous subquery was correct, but the profiles policy was causing the recursion.
-- Now that the recursive profiles policy is removed, we re-apply the products policy.

CREATE POLICY "Admins can manage products" ON public.products 
FOR ALL USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));