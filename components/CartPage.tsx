import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { TrashIcon, PlusIcon, MinusIcon, GiftIcon } from './icons';
import { CartItem } from '../types';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
    const { formatPrice } = useCurrency();
    const [giftWrap, setGiftWrap] = useState(false);
    const [orderNote, setOrderNote] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const navigate = useNavigate();
    
    const giftWrapCost = 5.00;
    const finalSubtotal = giftWrap ? subtotal + giftWrapCost : subtotal;

    const handleUpdateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity > 0) {
            updateQuantity(id, newQuantity);
        }
    };

    const handleCheckout = () => {
        if (agreeTerms) {
            navigate('/checkout');
        }
    };

    const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => (
        <div className="grid grid-cols-12 gap-4 items-center py-4">
            {/* Product */}
            <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain"/>
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 text-sm flex items-center gap-1 mt-1">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {/* Price */}
            <div className="hidden md:block col-span-2">{formatPrice(item.price)}</div>
            {/* Quantity */}
            <div className="col-span-6 md:col-span-2">
                <div className="flex items-center border rounded-full w-fit">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-600"><MinusIcon/></button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-gray-600"><PlusIcon/></button>
                </div>
            </div>
            {/* Total */}
            <div className="col-span-6 md:col-span-2 text-right font-semibold">{formatPrice(item.price * item.quantity)}</div>
        </div>
    );

    return (
        <div className="bg-white">
            <div className="bg-gray-100 py-8" style={{backgroundImage: 'url(https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761502936/breadcrumb_bg_xwnbkv.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Shopping cart</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 md:py-20">
                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-gray-800">Your cart is currently empty.</h2>
                        <Link to="/" className="mt-6 inline-block bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors">
                            RETURN TO SHOP
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Side: Cart Items */}
                        <div className="lg:w-8/12">
                            <div className="hidden md:grid grid-cols-12 gap-4 font-semibold text-gray-500 uppercase text-xs mb-4 pb-2 border-b">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2">Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>
                            <div className="divide-y">
                                {cartItems.map(item => <CartItemRow key={item.id} item={item} />)}
                            </div>
                        </div>
                        
                        {/* Right Side: Summary & Options */}
                        <div className="lg:w-4/12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <GiftIcon className="w-8 h-8 text-gray-700 flex-shrink-0"/>
                                    <div>
                                        <p className="font-semibold">Do you want a gift wrap?</p>
                                        <p className="text-sm text-gray-500">Only {formatPrice(giftWrapCost)}</p>
                                    </div>
                                    <button 
                                        onClick={() => setGiftWrap(!giftWrap)}
                                        className={`ml-auto px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${giftWrap ? 'bg-black text-white border-black' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                                    >
                                        {giftWrap ? 'Remove' : 'Add A Gift Wrap'}
                                    </button>
                                </div>

                                <div>
                                    <label htmlFor="orderNote" className="block font-semibold mb-2 text-gray-800">Add Order Note</label>
                                    <textarea 
                                        id="orderNote"
                                        value={orderNote}
                                        onChange={(e) => setOrderNote(e.target.value)}
                                        placeholder="How can we help you?"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                                        rows={4}
                                    ></textarea>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <div className="flex justify-between font-bold text-xl mb-4 text-gray-800">
                                        <span>SUBTOTAL:</span>
                                        <span>{formatPrice(finalSubtotal)}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">Taxes and shipping calculated at checkout</p>
                                    <div className="flex items-center mb-6">
                                        <input 
                                            id="terms" 
                                            type="checkbox" 
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="terms" className="ml-3 block text-sm text-gray-700">I agree with the terms and conditions.</label>
                                    </div>
                                    <button 
                                        onClick={handleCheckout}
                                        disabled={!agreeTerms}
                                        className="w-full bg-blue-600 text-white py-3.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        Check Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;