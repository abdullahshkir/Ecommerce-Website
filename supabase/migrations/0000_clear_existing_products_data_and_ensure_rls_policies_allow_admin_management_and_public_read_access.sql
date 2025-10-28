-- Delete all existing mock data from the products table
DELETE FROM public.products;

-- RLS policies are already defined in the schema:
-- 1. "Admins can manage products" (command: *)
-- 2. "Allow public read access to products" (command: SELECT)
-- These policies ensure security and functionality.