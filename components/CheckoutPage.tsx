import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { ChevronRightIcon, CartIcon, ChevronDownIcon, ChevronUpIcon, TagIcon } from './icons';

interface StepProps {
  number: number;
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

const Step: React.FC<StepProps> = ({ number, label, isActive, isCompleted }) => {
  const circleClasses = isActive
    ? 'bg-black text-white'
    : isCompleted
    ? 'bg-gray-800 text-white'
    : 'bg-gray-200 text-gray-500';

  const textClasses = isActive ? 'text-black font-semibold' : 'text-gray-500';

  return (
    <div className="flex items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${circleClasses}`}>
        {isCompleted ? '✓' : number}
      </div>
      <span className={`ml-3 text-sm hidden sm:inline ${textClasses}`}>{label}</span>
    </div>
  );
};

const CheckoutStepper: React.FC<{ currentStep: number }> = ({ currentStep }) => (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
        <Step number={1} label="Shopping Cart" isCompleted={currentStep > 1} isActive={currentStep === 1} />
        <div className="flex-1 h-px bg-gray-200 mx-2"></div>
        <Step number={2} label="Checkout Details" isCompleted={currentStep > 2} isActive={currentStep === 2} />
        <div className="flex-1 h-px bg-gray-200 mx-2"></div>
        <Step number={3} label="Payment" isCompleted={currentStep > 3} isActive={currentStep === 3} />
    </div>
);


const FormInput: React.FC<{ id: string; label: string; type?: string; autoComplete?: string; }> = ({ id, label, type = 'text', autoComplete }) => (
    <div className="relative">
        <input
            id={id}
            name={id}
            type={type}
            autoComplete={autoComplete}
            className="peer w-full border-b border-gray-300 focus:border-black p-3 pt-6 bg-transparent placeholder-transparent focus:outline-none transition-colors"
            placeholder={label}
        />
        <label
            htmlFor={id}
            className="absolute left-3 top-1 text-xs text-gray-500 transition-all 
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4
                       peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500"
        >
            {label}
        </label>
    </div>
);


const CheckoutPage: React.FC = () => {
    const { cartItems, subtotal } = useCart();
    const { formatPrice } = useCurrency();
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    const shippingCost = 0; // Placeholder
    const total = subtotal + shippingCost;

    return (
        <div className="bg-white">
            <div className="min-h-screen lg:grid lg:grid-cols-12">
                {/* Left side - Information */}
                <div className="lg:col-span-7 py-12 px-4 sm:px-6 lg:px-12 xl:px-20">
                    <div className="max-w-2xl mx-auto">
                        <Link to="/" className="text-4xl font-extrabold tracking-tighter text-black">Mobixo</Link>

                        <div className="my-10">
                            <CheckoutStepper currentStep={2} />
                        </div>
                        
                        <form>
                             <div className="space-y-8">
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Contact information</h2>
                                    <FormInput id="email" label="Email address" type="email" autoComplete="email" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Shipping address</h2>
                                    <div className="space-y-6">
                                        <select className="w-full p-3 border-b border-gray-300 bg-white focus:outline-none focus:border-black">
                                            <option>Pakistan</option>
                                            <option>United States</option>
                                        </select>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <FormInput id="firstName" label="First name" autoComplete="given-name"/>
                                            <FormInput id="lastName" label="Last name" autoComplete="family-name"/>
                                        </div>
                                        <FormInput id="address" label="Address" autoComplete="street-address"/>
                                        <FormInput id="apartment" label="Apartment, suite, etc. (optional)" />
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                            <FormInput id="city" label="City" autoComplete="address-level2"/>
                                            <FormInput id="state" label="State" autoComplete="address-level1"/>
                                            <FormInput id="zip" label="ZIP code" autoComplete="postal-code"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-10">
                                <Link to="/cart" className="text-sm text-gray-600 hover:text-black mt-4 sm:mt-0">&lt; Return to cart</Link>
                                <button type="submit" className="w-full sm:w-auto bg-black text-white py-4 px-8 rounded-full font-bold hover:bg-gray-800 transition-colors">
                                    Continue to shipping
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right side - Order Summary */}
                <div className="lg:col-span-5 bg-gray-50 border-l border-gray-200">
                    <div className="py-12 px-4 sm:px-6 lg:px-12 sticky top-0">
                         {/* Mobile summary toggle */}
                        <div className="lg:hidden">
                            <button onClick={() => setIsSummaryOpen(!isSummaryOpen)} className="w-full flex justify-between items-center text-lg">
                                <div className="flex items-center text-black">
                                    <CartIcon className="w-5 h-5 mr-2" />
                                    <span>{isSummaryOpen ? 'Hide' : 'Show'} order summary</span>
                                    {isSummaryOpen ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
                                </div>
                                <span className="font-bold">{formatPrice(total)}</span>
                            </button>
                        </div>
                        
                        <div className={`mt-6 lg:mt-0 ${isSummaryOpen ? 'block' : 'hidden'} lg:block`}>
                            <div className="space-y-5 max-h-80 overflow-y-auto pr-2">
                                {cartItems.map(item => (
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

                            <div className="py-6 border-t border-b my-6">
                                <div className="flex items-center space-x-3">
                                    <input type="text" placeholder="Gift card or discount code" className="flex-grow p-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black transition-colors" />
                                    <button className="bg-gray-300 text-gray-700 py-3 px-5 rounded-full font-semibold hover:bg-gray-400 transition-colors">Apply</button>
                                </div>
                            </div>

                            <div className="space-y-3 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-sm">Calculated at next step</span>
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
        </div>
    );
};

export default CheckoutPage;