UPDATE public.products p
SET
    rating = sub.avg_rating,
    review_count = sub.review_count
FROM (
    SELECT
        product_id,
        AVG(rating) AS avg_rating,
        COUNT(*) AS review_count
    FROM public.reviews
    WHERE is_approved = true
    GROUP BY product_id
) AS sub
WHERE p.id = sub.product_id;

-- Set rating and count to 0 for products that have no approved reviews
UPDATE public.products
SET
    rating = 0,
    review_count = 0
WHERE id NOT IN (SELECT product_id FROM public.reviews WHERE is_approved = true);