import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Order } from '../../types';
import { MoreVerticalIcon } from '../icons';

// FIX: Object literal may only specify known properties, and 'date' does not exist in type 'Order'.
const mockOrders: (Omit<Order, 'items' | 'shipping_address' | 'user_id'> & { customer: string })[] = [
    { id: 'MX54321', customer: 'John Doe', order_number: 'MX54321', created_at: '2025-07-29T10:00:00Z', status: 'Delivered', total: 180.00 },
    { id: 'MX54322', customer: 'Jane Smith', order_number: 'MX54322', created_at: '2025-07-29T11:00:00Z', status: 'Processing', total: 450.00 },
    { id: 'MX54323', customer: 'Bob Johnson', order_number: 'MX54323', created_at: '2025-07-28T14:30:00Z', status: 'Shipped', total: 250.00 },
    { id: 'MX54324', customer: 'Alice Williams', order_number: 'MX54324', created_at: '2025-07-28T09:00:00Z', status: 'Cancelled', total: 40.00 },
    { id: 'MX54325', customer: 'Charlie Brown', order_number: 'MX54325', created_at: '2025-07-27T18:00:00Z', status: 'Delivered', total: 1200.00 },
    { id: 'MX54326', customer: 'Diana Miller', order_number: 'MX54326', created_at: '2025-07-26T12:00:00Z', status: 'Shipped', total: 285.00 },
];

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

    const handleRowClick = (orderId: string) => {
        navigate(`/adminpanel/orders/${orderId}`);
    };
    
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
                        {mockOrders.map(order => (
                            <tr key={order.id} onClick={() => handleRowClick(order.id)} className="hover:bg-gray-50 cursor-pointer">
                                <td className="px-4 py-3 font-semibold text-blue-600">#{order.order_number}</td>
                                <td className="px-4 py-3 text-gray-800">{order.customer}</td>
                                {/* FIX: Property 'date' does not exist on type 'Order'. */}
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrdersPage;
