import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Order } from '../../types';
import { MoreVerticalIcon } from '../icons';
import { fetchAllOrders } from '../../src/integrations/supabase/api';

// Define a type for the fetched order data including joined profile info
interface FetchedOrder extends Order {
    profiles: {
        first_name: string;
        last_name: string;
    } | null;
}

const getStatusClass = (status: Order['status']) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const AdminOrdersPage: React.FC = () => {
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<FetchedOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadOrders = async () => {
        setIsLoading(true);
        try {
            const fetchedOrders = await fetchAllOrders();
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Failed to load orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleRowClick = (orderId: string) => {
        navigate(`/adminpanel/orders/${orderId}`);
    };
    
    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading orders...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors">
                    Export CSV
                </button>
            </div>

             <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase">
                        <tr>
                            <th className="px-4 py-3 font-medium">Order ID</th>
                            <th className="px-4 py-3 font-medium">Customer</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Total</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map(order => {
                            const customerName = `${order.profiles?.first_name || ''} ${order.profiles?.last_name || ''}`.trim() || 'N/A';
                            return (
                                <tr key={order.id} onClick={() => handleRowClick(order.id)} className="hover:bg-gray-50 cursor-pointer">
                                    <td className="px-4 py-3 font-semibold text-blue-600">#{order.order_number}</td>
                                    <td className="px-4 py-3 text-gray-800">{customerName}</td>
                                    <td className="px-4 py-3 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 text-gray-600">{formatPrice(order.total)}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusClass(order.status)}`}>
                                           {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                         <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                                            <MoreVerticalIcon className="w-5 h-5" />
                                         </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {orders.length === 0 && !isLoading && (
                    <div className="text-center py-10 text-gray-500">No orders found.</div>
                )}
            </div>
        </div>
    );
};

export default AdminOrdersPage;