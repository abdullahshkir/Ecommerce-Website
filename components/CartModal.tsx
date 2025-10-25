import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseIcon, EmptyCartIcon, TrashIcon, PlusIcon, MinusIcon, EyeIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const newImageUrl = 'https://darlingretail.com/cdn/shop/products/1_7b64958c-304b-43bd-b759-c5366bfa9914_600x.jpg?v=1661581431';

const recommendedProduct = {
    name: 'Video & Air Quality...',
    price: 239.00,
    oldPrice: 312.00,
    imageUrl: newImageUrl,
};

const CartModal: FC<CartModalProps> = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleViewCart = () => {
        onClose();
        navigate('/cart');
    };

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <div 
            className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="absolute inset-0 bg-black bg-opacity-50" 
                onClick={onClose}
                aria-hidden="true"
            ></div>
            
            <div 
                className={`relative w-full max-w-sm bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold tracking-wider text-gray-800 uppercase">SHOPPING CART</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-black">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                            <EmptyCartIcon className="w-20 h-20 text-gray-300 mb-4" />
                            <p className="text-lg text-gray-600 mb-6">Your cart is empty.</p>
                            <button
                                onClick={onClose}
                                className="w-full max-w-xs flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                RETURN TO SHOP
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex-grow overflow-y-auto p-6">
                                {/* Cart Items */}
                                <div className="space-y-4 mb-6">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex items-center space-x-4">
                                            <div className="w-20 h-20 flex-shrink-0">
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                                <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center border border-gray-300 rounded-full">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={item.quantity <= 1}><MinusIcon className="w-4 h-4"/></button>
                                                        <input type="text" value={item.quantity} readOnly className="w-8 text-center border-0 p-0 text-sm focus:outline-none focus:ring-0 bg-transparent"/>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-full transition-colors"><PlusIcon className="w-4 h-4"/></button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-500 hover:text-red-500 transition-colors">
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* You may also like */}
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-4">You may also like</h4>
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img src={recommendedProduct.imageUrl} alt={recommendedProduct.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-sm font-medium text-gray-800">{recommendedProduct.name}</p>
                                            <div className="flex items-baseline space-x-2 mt-1">
                                                <span className="text-sm font-bold text-red-600">{formatPrice(recommendedProduct.price)}</span>
                                                <span className="text-xs text-gray-400 line-through">{formatPrice(recommendedProduct.oldPrice)}</span>
                                            </div>
                                        </div>
                                        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                                            <EyeIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Footer */}
                            <div className="p-6 border-t border-gray-200 mt-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold">Subtotal:</span>
                                    <span className="text-lg font-bold">{formatPrice(subtotal)}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">Taxes and shipping calculated at checkout</p>
                                <div className="flex items-center mb-4">
                                    <input id="terms" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">I agree with the terms and conditions.</label>
                                </div>
                                <div className="space-y-3">
                                    <button onClick={handleViewCart} className="w-full bg-gray-100 text-gray-800 py-3 rounded-full font-bold hover:bg-gray-200">VIEW CART</button>
                                    <button onClick={handleCheckout} className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700">CHECK OUT</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartModal;
