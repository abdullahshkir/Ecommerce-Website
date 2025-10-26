import React from 'react';

const FormInput: React.FC<{ id: string, label: string, type?: string, defaultValue?: string, required?: boolean }> = ({ id, label, type = "text", defaultValue, required }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input 
            type={type} 
            id={id} 
            name={id}
            defaultValue={defaultValue}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" 
        />
    </div>
);

const AccountDetailsPage: React.FC = () => {
    return (
        <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Details</h2>
            
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput id="firstName" label="First Name *" defaultValue="Abdullah" required />
                    <FormInput id="lastName" label="Last Name *" defaultValue="Shakir" required />
                </div>
                
                <FormInput id="displayName" label="Display Name *" defaultValue="Abdullah" required />
                <p className="text-xs text-gray-500 -mt-4">This will be how your name will be displayed in the account section and in reviews.</p>
                
                <FormInput id="email" label="Email Address *" type="email" defaultValue="customer@example.com" required />

                <fieldset className="border-t pt-6">
                    <legend className="text-lg font-semibold text-gray-800 mb-4">Password change</legend>
                    <div className="space-y-4">
                        <FormInput id="currentPassword" label="Current password (leave blank to leave unchanged)" type="password" />
                        <FormInput id="newPassword" label="New password (leave blank to leave unchanged)" type="password" />
                        <FormInput id="confirmPassword" label="Confirm new password" type="password" />
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
