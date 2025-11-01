import React, { useState, useEffect } from 'react';
import { PlusIcon } from '../icons';
import { useUser } from '../../contexts/UserContext';
import { Address } from '../../types';

const AddressCard: React.FC<{ address: Address; onEdit: (address: Address) => void; onRemove: (id: string) => void; onSetDefault: (id: string) => void; }> = ({ address, onEdit, onRemove, onSetDefault }) => (
    <div className="border rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-start">
            <h4 className="font-semibold text-gray-800">{address.first_name} {address.last_name}</h4>
            {address.is_default && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">Default</span>}
        </div>
        <address className="text-sm text-gray-600 mt-2 not-italic flex-grow">
            {address.address}, {address.apartment}<br/>
            {address.city}, {address.state} {address.zip}<br/>
            {address.country}
        </address>
        <div className="mt-4 space-x-4 text-sm pt-2">
            <button onClick={() => onEdit(address)} className="font-medium text-blue-600 hover:underline">Edit</button>
            <button onClick={() => onRemove(address.id)} className="font-medium text-red-500 hover:underline">Remove</button>
            {!address.is_default && <button onClick={() => onSetDefault(address.id)} className="font-medium text-gray-600 hover:underline">Set as Default</button>}
        </div>
    </div>
);

const AddressForm: React.FC<{ onCancel: () => void; editingAddress: Address | null }> = ({ onCancel, editingAddress }) => {
    const { addAddress, updateAddress } = useUser();
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', address: '', apartment: '',
        city: '', state: '', zip: '', country: 'Pakistan', is_default: false
    });

    useEffect(() => {
        if (editingAddress) {
            setFormData({
                first_name: editingAddress.first_name,
                last_name: editingAddress.last_name,
                address: editingAddress.address,
                apartment: editingAddress.apartment,
                city: editingAddress.city,
                state: editingAddress.state,
                zip: editingAddress.zip,
                country: editingAddress.country,
                is_default: editingAddress.is_default,
            });
        } else {
            setFormData({
                first_name: '', last_name: '', address: '', apartment: '',
                city: '', state: '', zip: '', country: 'Pakistan', is_default: false
            });
        }
    }, [editingAddress]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAddress) {
            updateAddress({ ...editingAddress, ...formData });
        } else {
            addAddress(formData);
        }
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="first_name" value={formData.first_name} onChange={handleChange} type="text" placeholder="First name *" required className="w-full p-3 border rounded-full" />
                <input name="last_name" value={formData.last_name} onChange={handleChange} type="text" placeholder="Last name *" required className="w-full p-3 border rounded-full" />
            </div>
            <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Address *" required className="w-full p-3 border rounded-full" />
            <input name="apartment" value={formData.apartment} onChange={handleChange} type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-3 border rounded-full" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="City *" required className="w-full p-3 border rounded-full" />
                <input name="state" value={formData.state} onChange={handleChange} type="text" placeholder="State/Province *" required className="w-full p-3 border rounded-full" />
                <input name="zip" value={formData.zip} onChange={handleChange} type="text" placeholder="ZIP code *" required className="w-full p-3 border rounded-full" />
            </div>
            <div className="flex items-center">
                <input id="is_default" name="is_default" type="checkbox" checked={formData.is_default} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                <label htmlFor="is_default" className="ml-2 text-sm text-gray-700">Set as default address</label>
            </div>
            <div className="flex gap-4 pt-2">
                <button type="submit" className="bg-black text-white px-6 py-2 rounded-full font-semibold">Save Address</button>
                <button type="button" onClick={onCancel} className="bg-gray-100 px-6 py-2 rounded-full font-semibold">Cancel</button>
            </div>
        </form>
    );
};

const AddressesPage: React.FC = () => {
    const { addresses, removeAddress, setDefaultAddress } = useUser();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    const handleAddNew = () => {
        setEditingAddress(null);
        setIsFormVisible(true);
    };

    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setIsFormVisible(true);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setEditingAddress(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">My Addresses</h2>
            
            {!isFormVisible && (
                <>
                    <p className="text-sm text-gray-600 mb-6">The following addresses will be used on the checkout page by default.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {addresses.map(addr => (
                            <AddressCard 
                                key={addr.id} 
                                address={addr} 
                                onEdit={handleEdit}
                                onRemove={removeAddress}
                                onSetDefault={setDefaultAddress}
                            />
                        ))}
                    </div>
                    <button 
                        onClick={handleAddNew}
                        className="flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add a new address
                    </button>
                </>
            )}

            {isFormVisible && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {editingAddress ? 'Edit address' : 'Add a new address'}
                    </h3>
                    <AddressForm onCancel={handleCancel} editingAddress={editingAddress} />
                </div>
            )}
        </div>
    );
};

export default AddressesPage;