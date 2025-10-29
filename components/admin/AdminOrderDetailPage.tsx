import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Order } from '../../types';
import { UserIcon, MapPinIcon, TruckIcon } from '../icons';
import { useProducts } from '../../contexts/ProductContext';

const InfoCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center border-b pb-3 mb-4">
            {icon}
            <h3 className="text-lg font-semibold text-gray-800 ml-3">{title}</h3>
        </div>
        <div className="text-sm text-gray-600 space-y-2">{children}</div>
    </div>
);

const AdminOrderDetailPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { formatPrice } = useCurrency();
    const { products } = useProducts();
    const [orderStatus, setOrderStatus] = useState('Processing');
    
    // Mock order data - in a real app this would come from an API
    const mockOrder: Order = {
        id: 'MX54322', 
        order_number: 'MX54322',
        created_at: '2025-07-29T11:00:00Z', 
        status: 'Processing', 
        total: 450.00,
        items: [
            { ...products[2], quantity: 1 }
        ],
        shipping_address: {
            first_name: 'Jane',
            last_name: 'Smith',
            address: '456 Oak Avenue',
            apartment: 'Suite 200',
            city: 'Metropolis',
            state: 'CA',
            zip: '90210',
            country: 'United States',
        }
    };
    
    const formElementStyle = "w-full text-sm py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200";

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Order #{orderId}</h2>
                    <p className="text-sm text-gray-500">{new Date(mockOrder.created_at).toLocaleDateString()}</p>
                </div>
                <Link to="/adminpanel/orders" className="text-sm font-medium text-blue-600 hover:underline">&larr; Back to Orders</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Order Items ({mockOrder.items.length})</h3>
                        <div className="divide-y">
                            {mockOrder.items.map(item => (
                                <div key={item.id} className="flex items-center py-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain rounded-md bg-gray-100 p-1 mr-4"/>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">SKU: MOB-{item.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{formatPrice(item.price)}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Payment Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-600">Subtotal:</span><span>{formatPrice(mockOrder.total)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Shipping:</span><span>{formatPrice(0)}</span></div>
                            <div className="flex justify-between font-bold text-base pt-2 border-t mt-2"><span >Total:</span><span>{formatPrice(mockOrder.total)}</span></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <InfoCard title="Customer" icon={<UserIcon className="w-5 h-5 text-gray-500"/>}>
                        <p className="font-semibold text-gray-800">Jane Smith</p>
                        <p>jane.smith@example.com</p>
                        <p>+1 234 567 890</p>
                    </InfoCard>

                    <InfoCard title="Shipping Address" icon={<MapPinIcon className="w-5 h-5 text-gray-500"/>}>
                        <address className="not-italic">
                            {mockOrder.shipping_address.first_name} {mockOrder.shipping_address.last_name}<br/>
                            {mockOrder.shipping_address.address}<br/>
                            {mockOrder.shipping_address.city}, {mockOrder.shipping_address.state} {mockOrder.shipping_address.zip}<br/>
                            {mockOrder.shipping_address.country}
                        </address>
                    </InfoCard>
                    
                    <InfoCard title="Order Status" icon={<TruckIcon className="w-5 h-5 text-gray-500"/>}>
                        <select
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className={formElementStyle}
                        >
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                        </select>
                         <button className="w-full mt-3 bg-black text-white py-2 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
                            Update Status
                        </button>
                    </InfoCard>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetailPage;