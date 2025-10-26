import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSignIcon, CartIcon, UsersIcon, ProductsIcon } from '../icons';
import { Order } from '../../types';

const mockRecentOrders: Order[] = [
    { id: 'MX54321', date: '2025-07-29', status: 'Delivered', total: 180.00, items: [], shippingAddress: {} as any },
    { id: 'MX54322', date: '2025-07-29', status: 'Processing', total: 450.00, items: [], shippingAddress: {} as any },
    { id: 'MX54323', date: '2025-07-28', status: 'Shipped', total: 250.00, items: [], shippingAddress: {} as any },
    { id: 'MX54324', date: '2025-07-28', status: 'Cancelled', total: 40.00, items: [], shippingAddress: {} as any },
    { id: 'MX54325', date: '2025-07-27', status: 'Delivered', total: 1200.00, items: [], shippingAddress: {} as any },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; change: string; changeType: 'increase' | 'decrease' }> = 
({ title, value, icon, change, changeType }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className={`text-xs mt-1 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {change} vs last month
            </p>
        </div>
        <div className={`p-3 rounded-full ${changeType === 'increase' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {icon}
        </div>
    </div>
);

const getStatusClass = (status: Order['status']) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const AdminDashboardPage: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$45,231.89" icon={<DollarSignIcon />} change="+20.1%" changeType="increase" />
                <StatCard title="Total Orders" value="2,350" icon={<CartIcon />} change="+15.5%" changeType="increase" />
                <StatCard title="Total Customers" value="1,210" icon={<UsersIcon />} change="+5.2%" changeType="increase" />
                <StatCard title="Products in Stock" value="532" icon={<ProductsIcon />} change="-1.8%" changeType="decrease" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Sales Overview</h3>
                    <div className="h-72 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">[Sales Chart Placeholder]</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-3">JD</div>
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">John Doe</span> placed an order <span className="font-semibold">#MX54322</span>.
                                </p>
                                <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm mr-3">AS</div>
                            <div>
                                <p className="text-sm">
                                    A new user <span className="font-semibold">Abdullah Shakir</span> has registered.
                                </p>
                                <p className="text-xs text-gray-500">5 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Recent Orders</h3>
                    <Link to="/adminpanel/orders" className="text-sm font-medium text-blue-600 hover:underline">View all</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="text-left text-gray-500">
                            <tr>
                                <th className="p-2">Order ID</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Total</th>
                                <th className="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockRecentOrders.map(order => (
                                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{order.id}</td>
                                    <td className="p-3">{order.date}</td>
                                    <td className="p-3">${order.total.toFixed(2)}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
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

export default AdminDashboardPage;