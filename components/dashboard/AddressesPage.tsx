import React, { useState } from 'react';
import { PlusIcon } from '../icons';

const AddressCard: React.FC<{ title: string; address: string; isDefault?: boolean }> = ({ title, address, isDefault }) => (
    <div className="border rounded-lg p-4">
        <div className="flex justify-between items-start">
            <h4 className="font-semibold text-gray-800">{title}</h4>
            {isDefault && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">Default</span>}
        </div>
        <p className="text-sm text-gray-600 mt-2">{address}</p>
        <div className="mt-4 space-x-4 text-sm">
            <button className="font-medium text-blue-600 hover:underline">Edit</button>
            <button className="font-medium text-red-500 hover:underline">Remove</button>
        </div>
    </div>
);

const AddressForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => (
     <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="First name *" required className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="Last name *" required className="w-full p-3 border rounded-md" />
        </div>
        <input type="text" placeholder="Address *" required className="w-full p-3 border rounded-md" />
        <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-3 border rounded-md" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="City *" required className="w-full p-3 border rounded-md" />
            <input type="text" placeholder="ZIP code *" required className="w-full p-3 border rounded-md" />
        </div>
         <div className="flex items-center">
            <input id="default-address" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="default-address" className="ml-2 text-sm text-gray-700">Set as default address</label>
        </div>
        <div className="flex gap-4 pt-2">
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-full font-semibold">Save Address</button>
            <button type="button" onClick={onCancel} className="bg-gray-100 px-6 py-2 rounded-full font-semibold">Cancel</button>
        </div>
    </form>
);


const AddressesPage: React.FC = () => {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">My Addresses</h2>
            
            <p className="text-sm text-gray-600 mb-6">The following addresses will be used on the checkout page by default.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <AddressCard 
                    title="Billing Address"
                    address="Abdullah Shakir, D Ground, Faisalabad, Punjab, Pakistan"
                    isDefault
                />
                 <AddressCard 
                    title="Shipping Address"
                    address="You have not set a default shipping address."
                />
            </div>
            
            {!isAdding && (
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add a new address
                </button>
            )}

            {isAdding && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Add a new address</h3>
                    <AddressForm onCancel={() => setIsAdding(false)} />
                </div>
            )}
        </div>
    );
};

export default AddressesPage;
