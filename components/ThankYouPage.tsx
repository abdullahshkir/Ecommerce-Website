import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useCurrency } from '../contexts/CurrencyContext';
import { CheckCircleIcon } from './icons';

const ThankYouPage: React.FC = () => {
    const location = useLocation();
    const { formatPrice } = useCurrency();
    const orderDetails = location.state?.orderDetails;

    if (!orderDetails) {
        return <Navigate to="/" replace />;
    }

    const { orderNumber, deliveryDate, shippingAddress, items, total } = orderDetails;

    return (
        <div className="bg-gray-50 min-h-screen">
             <div className="lg:grid lg:grid-cols-12">
                {/* Left side - Confirmation */}
                <div className="lg:col-span-7 py-16 px-4 sm:px-6 lg:px-12 xl:px-20 flex items-center">
                    <div className="w-full max-w-lg mx-auto">
                        <div className="flex items-center space-x-4 mb-6">
                             <CheckCircleIcon className="w-12 h-12 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-600">Order #{orderNumber}</p>
                                <h1 className="text-3xl font-bold text-gray-900">Thank you, {shippingAddress.firstName}!</h1>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg bg-white p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">Your order is confirmed</h2>
                            <p className="text-gray-600">You'll receive a confirmation email with your order details shortly.</p>
                            <p className="text-gray-600">Estimated delivery date: <span className="font-semibold text-gray-800">{deliveryDate}</span></p>
                        </div>

                        <div className="border border-gray-200 rounded-lg bg-white p-6 mt-6 space-y-3 text-sm">
                           <h3 className="text-lg font-semibold text-gray-800 mb-2">Shipping to</h3>
                            <p className="text-gray-600">{shippingAddress.firstName} {shippingAddress.lastName}</p>
                            <p className="text-gray-600">{shippingAddress.address}</p>
                            <p className="text-gray-600">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
                            <p className="text-gray-600">{shippingAddress.country}</p>
                        </div>
                        
                        <div className="mt-8">
                            <Link to="/" className="w-full sm:w-auto bg-black text-white py-4 px-8 rounded-full font-bold hover:bg-gray-800 transition-colors inline-block text-center">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right side - Order Summary */}
                <div className="lg:col-span-5 bg-gray-100 border-l border-gray-200">
                     <div className="py-16 px-4 sm:px-6 lg:px-12 sticky top-0">
                         <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                         <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-2 mb-6">
                            {items.map((item: any) => (
                                <div key={item.id} className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className="relative w-20 h-20 bg-white border rounded-md">
                                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-1" />
                                            <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">{item.quantity}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 leading-tight">{item.name}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>

                         <div className="space-y-3 text-gray-700 py-6 border-t border-b">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium">{formatPrice(total)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="font-medium">{formatPrice(0)}</span>
                            </div>
                        </div>

                        <div className="border-t mt-6 pt-6 flex justify-between items-center">
                            <span className="text-xl font-semibold">Total</span>
                            <span className="text-2xl font-bold">{formatPrice(total)}</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;