import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const DashboardPage: React.FC = () => {
    const { user, orders, addresses } = useUser();

    const recentOrder = orders.length > 0 ? orders[0] : null;
    // FIX: Property 'isDefault' does not exist on type 'Address'. Did you mean 'is_default'?
    const defaultAddress = addresses.find(a => a.is_default);

    return (
        <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
            <p className="text-gray-600 mb-6">
                {/* FIX: Property 'displayName' does not exist on type 'User'. Did you mean 'display_name'? */}
                Hello, <span className="font-semibold text-gray-800">{user?.display_name || 'Customer'}</span>! From your account dashboard you can view your{' '}
                <Link to="/account/orders" className="text-blue-600 hover:underline">recent orders</Link>, manage your{' '}
                <Link to="/account/addresses" className="text-blue-600 hover:underline">shipping and billing addresses</Link>, and{' '}
                <Link to="/account/details" className="text-blue-600 hover:underline">edit your password and account details</Link>.
            </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800 mb-2">Recent Order</h3>
                    {recentOrder ? (
                        <div>
                            <p className="text-sm text-gray-500">Order #{recentOrder.order_number} - {recentOrder.status}</p>
                            {/* FIX: Property 'date' does not exist on type 'Order'. */}
                            <p className="text-sm text-gray-500">{new Date(recentOrder.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">You have no recent orders.</p>
                    )}
                     <Link to="/account/orders" className="text-sm text-blue-600 hover:underline mt-4 inline-block">View All Orders &rarr;</Link>
                </div>
                 <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800 mb-2">Primary Address</h3>
                    {defaultAddress ? (
                         <address className="text-sm text-gray-500 not-italic">
                            {/* FIX: Property 'firstName'/'lastName' does not exist on type 'Address'. Did you mean 'first_name'/'last_name'? */}
                            {defaultAddress.first_name} {defaultAddress.last_name}<br/>
                            {defaultAddress.address}<br/>
                            {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zip}
                        </address>
                    ) : (
                        <p className="text-sm text-gray-500">You have not set a primary address.</p>
                    )}
                     <Link to="/account/addresses" className="text-sm text-blue-600 hover:underline mt-4 inline-block">Manage Addresses &rarr;</Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
