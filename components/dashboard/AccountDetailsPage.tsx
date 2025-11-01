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
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition" 
        />
    </div>
);

const AccountDetailsPage: React.FC = () => {
    const { user, updateUserDetails } = useUser();
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
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);


    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                // Note: Display name is derived from first/last name in context, 
                // but we allow editing it here for flexibility.
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            // 1. Update Profile Details
            await updateUserDetails({
                first_name: formData.first_name,
                last_name: formData.last_name,
                // We don't save display_name directly as it's derived, but we can update it if needed.
                // For simplicity, we rely on the context to derive it from first/last name.
            });
            
            // 2. Handle Password Change (Supabase Auth API call needed here, currently placeholder)
            if (passwordData.newPassword) {
                if (passwordData.newPassword !== passwordData.confirmPassword) {
                    setMessage({ type: 'error', text: 'New passwords do not match.' });
                    setIsSaving(false);
                    return;
                }
                // In a real app, we would call supabase.auth.updateUser({ password: newPassword })
                // For now, we just show a message.
                setMessage({ type: 'success', text: 'Account details saved! (Password change functionality is pending implementation)' });
            } else {
                setMessage({ type: 'success', text: 'Account details saved successfully!' });
            }
            
            // Clear password fields after successful save attempt
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save changes. Please try again.' });
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };
    
    if (!user) return null;

    return (
        <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Details</h2>
            
            {message && (
                <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput id="first_name" name="first_name" label="First Name *" value={formData.first_name} onChange={handleFormChange} required />
                    <FormInput id="last_name" name="last_name" label="Last Name *" value={formData.last_name} onChange={handleFormChange} required />
                </div>
                
                {/* Display name is now read-only and derived from first/last name */}
                <FormInput id="display_name" name="display_name" label="Display Name" value={`${formData.first_name} ${formData.last_name}`.trim()} onChange={() => {}} required={false} />
                <p className="text-xs text-gray-500 -mt-4">Your display name is automatically generated from your first and last name.</p>
                
                {/* Email is read-only as changing it requires a separate Supabase flow */}
                <FormInput id="email" name="email" label="Email Address *" type="email" value={formData.email} onChange={() => {}} required />

                <fieldset className="border-t pt-6">
                    <legend className="text-lg font-semibold text-gray-800 mb-4">Password change</legend>
                    <div className="space-y-4">
                        <FormInput id="currentPassword" name="currentPassword" label="Current password (leave blank to leave unchanged)" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} />
                        <FormInput id="newPassword" name="newPassword" label="New password (leave blank to leave unchanged)" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
                        <FormInput id="confirmPassword" name="confirmPassword" label="Confirm new password" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                    </div>
                </fieldset>

                <div>
                    <button type="submit" disabled={isSaving} className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-400">
                        {isSaving ? 'Saving...' : 'Save changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountDetailsPage;