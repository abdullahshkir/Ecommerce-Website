-- 1. Create the function to calculate and update product rating and review count
CREATE OR REPLACE FUNCTION public.update_product_rating()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
DECLARE
    product_id_to_update UUID;
BEGIN
    -- Determine which product ID to update based on the operation
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        product_id_to_update := NEW.product_id;
    ELSE -- DELETE
        product_id_to_update := OLD.product_id;
    END IF;

    -- Recalculate rating and count for the affected product, considering only approved reviews
    UPDATE public.products
    SET
        rating = (
            SELECT AVG(rating)
            FROM public.reviews
            WHERE product_id = product_id_to_update
            AND is_approved = true
        ),
        review_count = (
            SELECT COUNT(*)
            FROM public.reviews
            WHERE product_id = product_id_to_update
            AND is_approved = true
        )
    WHERE id = product_id_to_update;

    -- Return the appropriate row based on the operation
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$;

-- 2. Create the trigger to run the function after relevant changes to the reviews table
DROP TRIGGER IF EXISTS on_review_change ON public.reviews;

CREATE TRIGGER on_review_change
AFTER INSERT OR UPDATE OF rating, is_approved OR DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_product_rating();