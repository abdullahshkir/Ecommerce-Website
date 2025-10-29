import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Order, User, Address } from '../../types';
import { useCurrency } from '../../contexts/CurrencyContext';
import { fetchUserDetail, UserDetail } from '../../src/integrations/supabase/api';

const getStatusClass = (status: Order['status']) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const AdminUserDetailPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;

        const loadUserDetail = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchUserDetail(userId);
                setUserDetail(data);
            } catch (err) {
                console.error("Failed to load user detail:", err);
                setError("Failed to load user details. Check console for API errors.");
            } finally {
                setIsLoading(false);
            }
        };
        loadUserDetail();
    }, [userId]);

    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading user details...</div>;
    }

    if (error || !userDetail?.profile) {
        return <div className="text-center py-10 text-red-600">{error || "User not found."}</div>;
    }
    
    const user = userDetail.profile;
    const defaultAddress = userDetail.addresses.find(a => a.is_default) || userDetail.addresses[0];
    const userOrders = userDetail.orders;

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                <Link to="/adminpanel/users" className="text-sm font-medium text-blue-600 hover:underline">&larr; Back to Customers</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-4xl mx-auto mb-4">
                            {user.display_name.charAt(0) || user.email.charAt(0)}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{user.display_name || user.email}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500 mt-1">Customer since {new Date(user.created_at || '').toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Full Name</p>
                                <p className="font-medium text-gray-800">{user.first_name} {user.last_name}</p>
                            </div>
                             <div>
                                <p className="text-gray-500">Email Address</p>
                                <p className="font-medium text-gray-800">{user.email}</p>
                            </div>
                             <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium text-gray-800">{user.phone || 'N/A'}</p>
                            </div>
                             <div>
                                <p className="text-gray-500">Default Address</p>
                                {defaultAddress ? (
                                    <address className="font-medium text-gray-800 not-italic">
                                        {defaultAddress.address}<br/>
                                        {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zip}
                                    </address>
                                ) : (
                                    <p className="font-medium text-gray-800">No address saved.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order History ({userOrders.length})</h3>
                 {userOrders.length === 0 ? (
                     <p className="text-gray-500">This user has not placed any orders yet.</p>
                 ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Order ID</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Total</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {userOrders.map(order => (
                                    <tr key={order.id} onClick={() => navigate(`/adminpanel/orders/${order.id}`)} className="hover:bg-gray-50 cursor-pointer">
                                        <td className="px-4 py-3 font-semibold text-blue-600">#{order.order_number}</td>
                                        <td className="px-4 py-3 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-gray-600">{formatPrice(order.total)}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusClass(order.status)}`}>
                                               {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default AdminUserDetailPage;