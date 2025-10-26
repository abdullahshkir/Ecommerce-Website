import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Order } from '../../types';
import { EyeIcon, MoreVerticalIcon } from '../icons';

const mockOrders: (Order & { customer: string })[] = [
    { id: 'MX54321', customer: 'John Doe', date: '2025-07-29', status: 'Delivered', total: 180.00, items: [], shippingAddress: {} as any },
    { id: 'MX54322', customer: 'Jane Smith', date: '2025-07-29', status: 'Processing', total: 450.00, items: [], shippingAddress: {} as any },
    { id: 'MX54323', customer: 'Bob Johnson', date: '2025-07-28', status: 'Shipped', total: 250.00, items: [], shippingAddress: {} as any },
    { id: 'MX54324', customer: 'Alice Williams', date: '2025-07-28', status: 'Cancelled', total: 40.00, items: [], shippingAddress: {} as any },
    { id: 'MX54325', customer: 'Charlie Brown', date: '2025-07-27', status: 'Delivered', total: 1200.00, items: [], shippingAddress: {} as any },
    { id: 'MX54326', customer: 'Diana Miller', date: '2025-07-26', status: 'Shipped', total: 285.00, items: [], shippingAddress: {} as any },
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
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
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
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-semibold text-blue-600">#{order.id}</td>
                                <td className="px-4 py-3 text-gray-800">{order.customer}</td>
                                <td className="px-4 py-3 text-gray-600">{order.date}</td>
                                <td className="px-4 py-3 text-gray-600">{formatPrice(order.total)}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusClass(order.status)}`}>
                                       {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                     <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
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