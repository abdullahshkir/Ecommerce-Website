import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';

const FormInput: React.FC<{ id: string, name: string, label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }> = 
({ id, name, label, type = "text", value, onChange, required }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input 
            type={type} 
            id={id} 
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" 
        />
    </div>
);

const AccountDetailsPage: React.FC = () => {
    const { user, updateUserDetails } = useUser();
    // FIX: Use snake_case for form data state to align with type definitions.
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        display_name: '',
        email: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            // FIX: Property 'firstName'/'lastName'/'displayName' does not exist on type 'User'.
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                display_name: user.display_name,
                email: user.email
            });
        }
    }, [user]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUserDetails(formData);
        // Password logic would be handled here
        alert('Account details saved!');
    };
    
    if (!user) return null;

    return (
        <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput id="first_name" name="first_name" label="First Name *" value={formData.first_name} onChange={handleFormChange} required />
                    <FormInput id="last_name" name="last_name" label="Last Name *" value={formData.last_name} onChange={handleFormChange} required />
                </div>
                
                <FormInput id="display_name" name="display_name" label="Display Name *" value={formData.display_name} onChange={handleFormChange} required />
                <p className="text-xs text-gray-500 -mt-4">This will be how your name will be displayed in the account section and in reviews.</p>
                
                <FormInput id="email" name="email" label="Email Address *" type="email" value={formData.email} onChange={handleFormChange} required />

                <fieldset className="border-t pt-6">
                    <legend className="text-lg font-semibold text-gray-800 mb-4">Password change</legend>
                    <div className="space-y-4">
                        <FormInput id="currentPassword" name="currentPassword" label="Current password (leave blank to leave unchanged)" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} />
                        <FormInput id="newPassword" name="newPassword" label="New password (leave blank to leave unchanged)" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
                        <FormInput id="confirmPassword" name="confirmPassword" label="Confirm new password" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                    </div>
                </fieldset>

                <div>
                    <button type="submit" className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors">
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountDetailsPage;
