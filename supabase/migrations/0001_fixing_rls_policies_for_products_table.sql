-- Enable RLS if not already enabled
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Allow public read access to products
CREATE POLICY "Allow public read access to products"
ON public.products
FOR SELECT
USING (true);

-- Allow admins to manage products
CREATE POLICY "Admins can manage products"
ON public.products
FOR ALL
USING (
  auth.uid() IN (
    SELECT id
    FROM public.profiles
    WHERE role = 'admin'
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT id
    FROM public.profiles
    WHERE role = 'admin'
  )
);