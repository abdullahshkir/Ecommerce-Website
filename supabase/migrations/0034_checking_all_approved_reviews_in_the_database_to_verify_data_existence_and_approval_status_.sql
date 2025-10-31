SELECT 
    r.id, 
    r.product_id, 
    r.rating, 
    r.text, 
    r.is_approved, 
    p.name AS product_name,
    pr.first_name || ' ' || pr.last_name AS reviewer_name
FROM 
    reviews r
JOIN 
    products p ON r.product_id = p.id
JOIN
    profiles pr ON r.user_id = pr.id
WHERE 
    r.is_approved = TRUE;