import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Order } from '../../types';
import { useCurrency } from '../../contexts/CurrencyContext';

const mockUser = { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    registrationDate: '2025-07-29',
    phone: '+1 234 567 890',
    address: {
        street: '456 Oak Avenue, Suite 200',
        city: 'Metropolis',
        state: 'CA',
        zip: '90210',
        country: 'United States',
    }
};

const mockUserOrders: Omit<Order, 'items' | 'shipping_address' | 'user_id'>[] = [
    { id: 'MX54322', order_number: 'MX54322', created_at: '2025-07-29T11:00:00Z', status: 'Processing', total: 450.00 },
    { id: 'MX51109', order_number: 'MX51109', created_at: '2025-06-15T10:00:00Z', status: 'Delivered', total: 85.00 },
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

const AdminUserDetailPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                <Link to="/adminpanel/users" className="text-sm font-medium text-blue-600 hover:underline">&larr; Back to Users</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-4xl mx-auto mb-4">
                            {mockUser.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{mockUser.name}</h3>
                        <p className="text-sm text-gray-500">{mockUser.email}</p>
                        <p className="text-sm text-gray-500 mt-1">Customer since {mockUser.registrationDate}</p>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Full Name</p>
                                <p className="font-medium text-gray-800">{mockUser.name}</p>
                            </div>
                             <div>
                                <p className="text-gray-500">Email Address</p>
                                <p className="font-medium text-gray-800">{mockUser.email}</p>
                            </div>
                             <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium text-gray-800">{mockUser.phone}</p>
                            </div>
                             <div>
                                <p className="text-gray-500">Default Address</p>
                                <address className="font-medium text-gray-800 not-italic">
                                    {mockUser.address.street}<br/>
                                    {mockUser.address.city}, {mockUser.address.state} {mockUser.address.zip}
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order History</h3>
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
                            {mockUserOrders.map(order => (
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
            </div>
        </div>
    );
};

export default AdminUserDetailPage;