import React, { useState, useEffect } from 'react';
import { fetchAllReviews, updateReviewStatus, deleteReview } from '../../src/integrations/supabase/api';
import { TrashIcon, EditIcon } from '../icons';

const AdminReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadReviews = async () => {
        setIsLoading(true);
        try {
            const fetchedReviews = await fetchAllReviews();
            setReviews(fetchedReviews);
        } catch (error) {
            console.error("Failed to load reviews:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleApproveToggle = async (reviewId: string, currentStatus: boolean) => {
        try {
            await updateReviewStatus(reviewId, !currentStatus);
            loadReviews();
        } catch (error) {
            alert('Failed to update review status.');
        }
    };

    const handleDelete = async (reviewId: string) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await deleteReview(reviewId);
                loadReviews();
            } catch (error) {
                alert('Failed to delete review.');
            }
        }
    };

    const getStatusClass = (isApproved: boolean) => 
        isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading Reviews...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Product Reviews ({reviews.length})</h2>
                <button onClick={loadReviews} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors">
                    Refresh
                </button>
            </div>

            {reviews.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No reviews found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase">
                            <tr>
                                <th className="px-4 py-3 font-medium">Product</th>
                                <th className="px-4 py-3 font-medium">Author</th>
                                <th className="px-4 py-3 font-medium">Rating</th>
                                <th className="px-4 py-3 font-medium">Review Text</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {reviews.map(review => {
                                const authorName = `${review.profiles?.first_name || ''} ${review.profiles?.last_name || ''}`.trim() || 'N/A';
                                return (
                                    <tr key={review.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-semibold text-blue-600">{review.products?.name || 'Deleted Product'}</td>
                                        <td className="px-4 py-3 text-gray-800">{authorName}</td>
                                        <td className="px-4 py-3 text-gray-600">{review.rating}/5</td>
                                        <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{review.text}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusClass(review.is_approved)}`}>
                                               {review.is_approved ? 'Approved' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center space-x-2">
                                            <button 
                                                onClick={() => handleApproveToggle(review.id, review.is_approved)}
                                                className={`py-1 px-3 rounded-full text-xs font-semibold transition-colors ${review.is_approved ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-600 text-white hover:bg-green-700'}`}
                                            >
                                                {review.is_approved ? 'Unapprove' : 'Approve'}
                                            </button>
                                            <button onClick={() => handleDelete(review.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminReviewsPage;