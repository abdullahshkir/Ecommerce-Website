import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { CheckCircleIcon } from '../icons';

const OrderTrackingPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { orders } = useUser();
    const order = orders.find(o => o.id === orderId);
    const { formatPrice } = useCurrency();

    if (!order) {
        return (
            <div className="p-6 bg-white rounded-lg border text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Not Found</h2>
                <p className="text-gray-600">The order ID you are looking for does not exist.</p>
                <Link to="/account/orders" className="mt-4 inline-block text-blue-600 hover:underline">&larr; Back to Orders</Link>
            </div>
        );
    }
    
    const trackingSteps = ['Processing', 'Shipped', 'Delivered'];
    const currentStepIndex = trackingSteps.indexOf(order.status);
    const orderPlacedDate = new Date(order.created_at);

    const getStepDate = (index: number) => {
        if (index > currentStepIndex) return "";
        const stepDate = new Date(orderPlacedDate);
        // Mocking date progression
        stepDate.setDate(stepDate.getDate() + index * 2); 
        return stepDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const TrackingStep: React.FC<{ title: string; date: string; isCompleted: boolean; isLast: boolean; }> = 
    ({ title, date, isCompleted, isLast }) => {
        const circleClass = isCompleted ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300';
        const textClass = isCompleted ? 'text-black' : 'text-gray-500';
        const lineClass = isCompleted ? 'bg-blue-600' : 'bg-gray-300';
        
        return (
            <div className="flex items-start">
                 <div className="flex flex-col items-center mr-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${circleClass}`}>
                        {isCompleted && <CheckCircleIcon className="w-4 h-4 text-white" />}
                    </div>
                    {!isLast && <div className={`w-0.5 h-16 transition-colors duration-300 ${lineClass}`}></div>}
                </div>
                <div>
                    <h4 className={`font-semibold transition-colors duration-300 ${textClass}`}>{title}</h4>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
            </div>
        );
    };


    return (
        <div className="p-6 bg-white rounded-lg border">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                    <p className="text-sm text-gray-500">Order #{order.order_number} &bull; Placed on {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <Link to="/account/orders" className="text-sm font-medium text-blue-600 hover:underline">&larr; Back to Orders</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Tracking Status */}
                <div className="md:col-span-1">
                    <h3 className="font-semibold mb-4">Tracking Status</h3>
                    <div className="space-y-0">
                         {trackingSteps.map((step, index) => (
                           <TrackingStep 
                                key={step}
                                title={step}
                                date={getStepDate(index)}
                                isCompleted={index <= currentStepIndex}
                                isLast={index === trackingSteps.length - 1}
                           />
                         ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="md:col-span-2">
                     <h3 className="font-semibold mb-4">Order Summary</h3>
                    <div className="border rounded-lg">
                        <div className="divide-y">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center p-4 space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain border rounded-md" />
                                    <div className="flex-grow">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-50 border-t space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>{formatPrice(order.total)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>{formatPrice(0)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-base pt-2 border-t mt-2">
                                <span>Total:</span>
                                <span>{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;