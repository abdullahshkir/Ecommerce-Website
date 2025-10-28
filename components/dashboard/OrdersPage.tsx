import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Order } from '../../types';

const OrdersPage: React.FC = () => {
    const { formatPrice } = useCurrency();
    const { orders } = useUser();

    const getStatusClass = (status: Order['status']) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">My Orders</h2>
            
            {orders.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-600">You haven't placed any orders yet.</p>
                    <Link to="/shop" className="mt-4 inline-block bg-black text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors text-sm">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase">
                            <tr>
                                <th className="px-6 py-3 font-medium">Order</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Total</th>
                                <th className="px-6 py-3 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-800">#{order.order_number}</td>
                                    {/* FIX: Property 'date' does not exist on type 'Order'. */}
                                    <td className="px-6 py-4 text-gray-600">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{formatPrice(order.total)} for {order.items.length} items</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            to={`/account/orders/${order.id}`}
                                            className="font-semibold text-blue-600 hover:text-blue-800 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
