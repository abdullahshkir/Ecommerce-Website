import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { supabase } from '../../src/integrations/supabase/client';
import { StarIcon } from '../icons';
import { Link } from 'react-router-dom';

interface UserReview {
    id: string;
    rating: number;
    text: string;
    is_approved: boolean;
    created_at: string;
    product_id: string;
    product_name: string;
}

const UserReviewsPage: React.FC = () => {
    const { user } = useUser();
    const [reviews, setReviews] = useState<UserReview[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchUserReviews = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('reviews')
                .select(`
                    id,
                    rating,
                    text,
                    is_approved,
                    created_at,
                    product_id,
                    products (name)
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching user reviews:', error);
                setIsLoading(false);
                return;
            }

            const userReviews: UserReview[] = data.map((r: any) => ({
                id: r.id,
                rating: r.rating,
                text: r.text,
                is_approved: r.is_approved,
                created_at: r.created_at,
                product_id: r.product_id,
                product_name: r.products?.name || 'Product Not Found',
            }));

            setReviews(userReviews);
            setIsLoading(false);
        };

        fetchUserReviews();
    }, [user]);

    if (isLoading) {
        return <div className="p-6 bg-white rounded-lg border text-center">Loading your reviews...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">My Product Reviews</h2>
            
            {reviews.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-600">You haven't submitted any reviews yet.</p>
                    <Link to="/shop" className="mt-4 inline-block bg-black text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors text-sm">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map(review => (
                        <div key={review.id} className="border p-4 rounded-lg bg-gray-50">
                            <div className="flex justify-between items-start mb-2">
                                <Link to={`/product/${review.product_id}`} className="font-semibold text-blue-600 hover:underline">
                                    {review.product_name}
                                </Link>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${review.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {review.is_approved ? 'Approved' : 'Pending Approval'}
                                </span>
                            </div>
                            <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} filled={i < review.rating} className="w-4 h-4 text-yellow-400" />
                                ))}
                                <span className="ml-2 text-sm text-gray-500">({review.rating}/5)</span>
                            </div>
                            <p className="text-gray-700 italic">"{review.text}"</p>
                            <p className="text-xs text-gray-500 mt-2">Submitted on: {new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserReviewsPage;