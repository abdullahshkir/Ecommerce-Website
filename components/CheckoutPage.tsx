import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { CartIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon, MinusIcon, TrashIcon } from './icons';
import { CartItem, Address } from '../types';
import { useUser } from '../contexts/UserContext';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const FormInput: React.FC<{ id: string; label: string; type?: string; autoComplete?: string; required?: boolean; value: string; onChange: (e: InputChangeEvent) => void; }> = ({ id, label, type = 'text', autoComplete, required = true, value, onChange }) => (
    <div className="relative">
        <input
            id={id}
            name={id}
            type={type}
            autoComplete={autoComplete}
            className="peer w-full border-b border-gray-300 focus:border-black p-3 pt-6 bg-transparent placeholder-transparent focus:outline-none transition-colors"
            placeholder={label}
            required={required}
            value={value}
            onChange={onChange}
        />
        <label
            htmlFor={id}
            className="absolute left-3 top-1 text-xs text-gray-500 transition-all 
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4
                       peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500"
        >
            {label} {required && '*'}
        </label>
    </div>
);


const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const { cartItems: contextCartItems, subtotal: contextSubtotal, clearCart, updateQuantity, removeFromCart } = useCart();
    const { user, addOrder, addresses } = useUser();
    const { formatPrice } = useCurrency();
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const initialBuyNowItem = location.state?.buyNowItem as CartItem | undefined;
    const [buyNowItem, setBuyNowItem] = useState<CartItem | undefined>(initialBuyNowItem);

    const itemsToDisplay = buyNowItem ? [buyNowItem] : contextCartItems;
    const subtotalToDisplay = itemsToDisplay.reduce((total, item) => total + item.price * item.quantity, 0);
    
    const [formData, setFormData] = useState({
        email: user?.email || '',
        country: 'Pakistan',
        first_name: '',
        last_name: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
    });

    useEffect(() => {
        const defaultAddress = addresses.find(a => a.is_default);
        if (defaultAddress) {
            setFormData(prev => ({
                ...prev,
                first_name: defaultAddress.first_name,
                last_name: defaultAddress.last_name,
                address: defaultAddress.address,
                apartment: defaultAddress.apartment || '',
                city: defaultAddress.city,
                state: defaultAddress.state,
                zip: defaultAddress.zip,
                country: defaultAddress.country,
            }));
        } else if (user) {
            setFormData(prev => ({
                ...prev,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            }));
        }
    }, [addresses, user]);

    const handleBuyNowQuantityChange = (newQuantity: number) => {
        if (buyNowItem && newQuantity > 0) {
            setBuyNowItem({ ...buyNowItem, quantity: newQuantity });
        }
    };

    const handleInputChange = (e: InputChangeEvent) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const shippingCost = 0; // Placeholder
    const totalToDisplay = subtotalToDisplay + shippingCost;


    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        const orderDetailsForThankYou = {
            orderNumber: `MX${Math.floor(Math.random() * 90000) + 10000}`,
            deliveryDate: new Date(new Date().setDate(new Date().getDate() + 5)).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            }),
            shippingAddress: formData,
            items: itemsToDisplay,
            total: totalToDisplay
        };

        addOrder({
            items: itemsToDisplay,
            total: totalToDisplay,
            shipping_address: formData,
        });

        navigate('/thank-you', { state: { orderDetails: orderDetailsForThankYou } });
        
        if (!buyNowItem) {
            clearCart();
        }
    };

    return (
        <div className={`bg-white transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="min-h-screen lg:grid lg:grid-cols-12">
                {/* Right side - Order Summary */}
                <div className="lg:col-span-5 lg:col-start-8 bg-gray-50 lg:border-l border-b lg:border-b-0 border-gray-200">
                    <div className="py-6 lg:py-12 px-4 sm:px-6 lg:px-12 lg:sticky top-0">
                         {/* Mobile summary toggle */}
                        <div className="lg:hidden">
                            <button onClick={() => setIsSummaryOpen(!isSummaryOpen)} className="w-full flex justify-between items-center text-lg">
                                <div className="flex items-center text-black">
                                    <CartIcon className="w-5 h-5 mr-2" />
                                    <span>{isSummaryOpen ? 'Hide' : 'Show'} order summary</span>
                                    {isSummaryOpen ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
                                </div>
                                <span className="font-bold">{formatPrice(totalToDisplay)}</span>
                            </button>
                        </div>
                        
                        <div className={`mt-6 lg:mt-0 ${isSummaryOpen ? 'block' : 'hidden'} lg:block`}>
                             <div className="space-y-4 max-h-[20rem] lg:max-h-80 overflow-y-auto pr-2 -mr-2">
                                {itemsToDisplay.map(item => (
                                    <div key={item.id} className="flex items-start justify-between bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                        <div className="flex items-start space-x-3 flex-grow min-w-0">
                                            <div className="relative w-16 h-16 flex-shrink-0">
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain rounded" />
                                                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">{item.quantity}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-800 text-sm leading-tight truncate">{item.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end space-y-2 ml-2">
                                            <p className="font-semibold text-gray-800 text-sm">{formatPrice(item.price * item.quantity)}</p>
                                            <div className="flex items-center border rounded-full">
                                                <button
                                                    onClick={() => buyNowItem ? handleBuyNowQuantityChange(item.quantity - 1) : updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={item.quantity <= 1}
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                >
                                                    <MinusIcon className="w-4 h-4" />
                                                </button>
                                                <span className="px-1 text-sm font-medium w-6 text-center" aria-live="polite">{item.quantity}</span>
                                                <button
                                                    onClick={() => buyNowItem ? handleBuyNowQuantityChange(item.quantity + 1) : updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
                                                     aria-label={`Increase quantity of ${item.name}`}
                                                >
                                                    <PlusIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {itemsToDisplay.length > 1 && !buyNowItem && (
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 text-xs flex items-center gap-1">
                                                    <TrashIcon className="w-3 h-3" /> Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="py-6 border-t border-b my-6">
                                <div className="flex items-center space-x-3">
                                    <input type="text" placeholder="Gift card or discount code" className="flex-grow p-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black transition-colors" />
                                    <button className="flex-shrink-0 bg-gray-300 text-gray-700 py-3 px-5 rounded-full font-semibold hover:bg-gray-400 transition-colors">Apply</button>
                                </div>
                            </div>

                            <div className="space-y-3 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium">{formatPrice(subtotalToDisplay)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium">{formatPrice(shippingCost)}</span>
                                </div>
                            </div>

                            <div className="border-t mt-6 pt-6 flex justify-between items-center">
                                <span className="text-xl font-semibold">Total</span>
                                <span className="text-2xl font-bold">{formatPrice(totalToDisplay)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Left side - Information */}
                <div className="lg:col-span-7 lg:row-start-1 py-8 lg:py-12 px-4 sm:px-6 lg:px-12 xl:px-20">
                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={handlePlaceOrder} className="mt-6">
                             <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Contact information</h2>
                                    <FormInput id="email" label="Email address" type="email" autoComplete="email" value={formData.email} onChange={handleInputChange} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Shipping address</h2>
                                    <div className="space-y-6">
                                        <div className="relative">
                                            <select 
                                                name="country" 
                                                value={formData.country} 
                                                onChange={handleInputChange} 
                                                className="peer w-full border-b border-gray-300 focus:border-black p-3 pt-6 bg-white placeholder-transparent focus:outline-none transition-colors appearance-none"
                                            >
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="United States">United States</option>
                                            </select>
                                            <label
                                                htmlFor="country"
                                                className="absolute left-3 top-1 text-xs text-gray-500 transition-all 
                                                           peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4
                                                           peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500"
                                            >
                                                Country *
                                            </label>
                                            <ChevronDownIcon className="absolute right-3 top-1/2 mt-1 w-4 h-4 text-gray-500 pointer-events-none" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <FormInput id="first_name" label="First name" autoComplete="given-name" value={formData.first_name} onChange={handleInputChange}/>
                                            <FormInput id="last_name" label="Last name" autoComplete="family-name" value={formData.last_name} onChange={handleInputChange}/>
                                        </div>
                                        <FormInput id="address" label="Address" autoComplete="street-address" value={formData.address} onChange={handleInputChange}/>
                                        <FormInput id="apartment" label="Apartment, suite, etc." required={false} value={formData.apartment} onChange={handleInputChange}/>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                            <FormInput id="city" label="City" autoComplete="address-level2" value={formData.city} onChange={handleInputChange}/>
                                            <FormInput id="state" label="State" autoComplete="address-level1" value={formData.state} onChange={handleInputChange}/>
                                            <FormInput id="zip" label="ZIP code" autoComplete="postal-code" value={formData.zip} onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Payment</h2>
                                    <p className="text-sm text-gray-500 mb-2">All payments are handled via Cash on Delivery.</p>
                                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                                        <p className="font-semibold text-gray-800">Cash on Delivery (COD)</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-10">
                                <Link to="/cart" className="text-sm text-gray-600 hover:text-black mt-4 sm:mt-0">&lt; Return to cart</Link>
                                <button type="submit" className="w-full sm:w-auto bg-black text-white py-4 px-8 rounded-full font-bold hover:bg-gray-800 transition-colors">
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;