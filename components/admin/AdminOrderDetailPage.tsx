import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Order } from '../../types';
import { UserIcon, MapPinIcon, TruckIcon } from '../icons';
import { fetchOrderById, updateOrderStatus } from '../../src/integrations/supabase/api';

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
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orderStatus, setOrderStatus] = useState<Order['status']>('Processing');
    const [isUpdating, setIsUpdating] = useState(false);

    const formElementStyle = "w-full text-sm py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200";

    useEffect(() => {
        if (orderId) {
            const loadOrder = async () => {
                setIsLoading(true);
                try {
                    const fetchedOrder = await fetchOrderById(orderId);
                    if (fetchedOrder) {
                        setOrder(fetchedOrder);
                        setOrderStatus(fetchedOrder.status);
                    }
                } catch (error) {
                    console.error("Failed to load order details:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            loadOrder();
        }
    }, [orderId]);
    
    const handleStatusUpdate = async () => {
        if (!order || orderStatus === order.status) return;
        
        setIsUpdating(true);
        try {
            await updateOrderStatus(order.id, orderStatus);
            setOrder(prev => prev ? { ...prev, status: orderStatus } : null);
            alert(`Order #${order.order_number} status updated to ${orderStatus}`);
        } catch (error) {
            alert('Failed to update order status.');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading order details...</div>;
    }
    
    if (!order) {
        return <div className="text-center py-10 text-red-600">Order not found.</div>;
    }
    
    // Extract customer name and email from the joined data (assuming it's attached to the order object)
    const customerName = (order as any).customer?.name || order.shipping_address.first_name + ' ' + order.shipping_address.last_name;
    const customerEmail = (order as any).customer?.email || 'N/A';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Order #{order.order_number}</h2>
                    <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <Link to="/adminpanel/orders" className="text-sm font-medium text-blue-600 hover:underline">&larr; Back to Orders</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Order Items ({order.items.length})</h3>
                        <div className="divide-y">
                            {order.items.map(item => (
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
                            <div className="flex justify-between"><span className="text-gray-600">Subtotal:</span><span>{formatPrice(order.total)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Shipping:</span><span>{formatPrice(0)}</span></div>
                            <div className="flex justify-between font-bold text-base pt-2 border-t mt-2"><span >Total:</span><span>{formatPrice(order.total)}</span></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <InfoCard title="Customer" icon={<UserIcon className="w-5 h-5 text-gray-500"/>}>
                        <p className="font-semibold text-gray-800">{customerName}</p>
                        <p>{customerEmail}</p>
                        <p>User ID: {order.user_id}</p>
                    </InfoCard>

                    <InfoCard title="Shipping Address" icon={<MapPinIcon className="w-5 h-5 text-gray-500"/>}>
                        <address className="not-italic">
                            {order.shipping_address.first_name} {order.shipping_address.last_name}<br/>
                            {order.shipping_address.address}<br/>
                            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}<br/>
                            {order.shipping_address.country}
                        </address>
                    </InfoCard>
                    
                    <InfoCard title="Order Status" icon={<TruckIcon className="w-5 h-5 text-gray-500"/>}>
                        <select
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value as Order['status'])}
                            className={formElementStyle}
                            disabled={isUpdating}
                        >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                         <button 
                            onClick={handleStatusUpdate}
                            disabled={isUpdating || orderStatus === order.status}
                            className="w-full mt-3 bg-black text-white py-2 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                        >
                            {isUpdating ? 'Updating...' : 'Update Status'}
                        </button>
                    </InfoCard>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetailPage;