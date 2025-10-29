import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSignIcon, CartIcon, UsersIcon, ProductsIcon } from '../icons';
import { fetchAllOrders, fetchAllUsers } from '../../src/integrations/supabase/api';
import { useProducts } from '../../contexts/ProductContext';
import { Order, User } from '../../types'; // Import Order and User types

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
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { products } = useProducts();

    useEffect(() => {
        const loadData = async () => {
            try {
                const [fetchedOrdersData, fetchedUsers] = await Promise.all([
                    fetchAllOrders(),
                    fetchAllUsers()
                ]);
                
                // fetchedOrdersData contains joined profile data, but we only need Order fields for stats
                // We map it to ensure it conforms to the Order type for calculations
                const ordersList: Order[] = fetchedOrdersData.map((order: any) => ({
                    id: order.id,
                    order_number: order.order_number,
                    created_at: order.created_at,
                    status: order.status,
                    total: order.total,
                    items: order.items,
                    shipping_address: order.shipping_address,
                    user_id: order.user_id,
                }));
                
                setOrders(ordersList);
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Failed to load admin dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    // Filter out admins and pending admins for customer count
    const totalCustomers = users.filter(u => u.role === 'user').length; 
    const productsInStock = products.filter(p => p.availability === 'In Stock').length;
    const recentOrders = orders.slice(0, 5);
    
    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading Dashboard Data...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={<DollarSignIcon />} change="+20.1%" changeType="increase" />
                <StatCard title="Total Orders" value={totalOrders.toLocaleString()} icon={<CartIcon />} change="+15.5%" changeType="increase" />
                <StatCard title="Total Customers" value={totalCustomers.toLocaleString()} icon={<UsersIcon />} change="+5.2%" changeType="increase" />
                <StatCard title="Products in Stock" value={productsInStock.toLocaleString()} icon={<ProductsIcon />} change="-1.8%" changeType="decrease" />
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
                        {/* Display recent user registrations */}
                        {users.slice(0, 2).map(user => (
                            <div key={user.id} className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm mr-3">
                                    {user.display_name.charAt(0) || user.email.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm">
                                        A new user <span className="font-semibold">{user.display_name || user.email}</span> has registered.
                                    </p>
                                    <p className="text-xs text-gray-500">{new Date(user.created_at || '').toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                        {/* Display recent orders */}
                        {recentOrders.map(order => (
                            <div key={order.id} className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-3">
                                    {order.order_number.slice(-2)}
                                </div>
                                <div>
                                    <p className="text-sm">
                                        Order <span className="font-semibold">#{order.order_number}</span> placed.
                                    </p>
                                    <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
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
                            {recentOrders.map(order => (
                                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{order.order_number}</td>
                                    <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
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
                    {recentOrders.length === 0 && (
                        <div className="text-center py-4 text-gray-500">No recent orders found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;