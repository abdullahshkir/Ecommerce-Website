UPDATE public.profiles
SET role = 'admin'
WHERE id IN (
    SELECT id
    FROM auth.users
    WHERE email = 'abdullahshakir940@gmail.com'
);