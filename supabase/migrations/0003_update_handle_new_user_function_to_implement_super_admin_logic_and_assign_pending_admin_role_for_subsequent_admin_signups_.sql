CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  user_role TEXT;
  admin_count INTEGER;
BEGIN
  -- 1. Determine the initial role based on metadata (sent from AdminLoginPage)
  user_role := COALESCE(new.raw_user_meta_data ->> 'initial_role', 'user');

  -- 2. Check for Super Admin condition if the request came from the admin signup flow
  IF user_role = 'pending_admin' THEN
    -- Check if any 'admin' already exists in the profiles table
    SELECT COUNT(*) INTO admin_count FROM public.profiles WHERE role = 'admin';

    IF admin_count = 0 THEN
      -- If no admin exists, this user becomes the Super Admin
      user_role := 'admin';
    END IF;
  END IF;

  -- 3. Insert the profile with the determined role
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data ->> 'first_name', 
    new.raw_user_meta_data ->> 'last_name',
    user_role
  );
  RETURN new;
END;
$$;