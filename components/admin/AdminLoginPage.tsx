import React from 'react';
import SupabaseAuth from '../SupabaseAuth';

const AdminLoginPage: React.FC = () => {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-sm">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-wide text-black font-orbitron">Mobixo</h1>
            <p className="mt-2 text-gray-600">Admin Panel Login</p>
        </div>
        <div className="mt-8">
            {/* SupabaseAuth handles the actual login process and redirect */}
            <SupabaseAuth 
                // Redirect to the dashboard after successful login/signup
                onSuccess={() => { /* Handled by App.tsx logic */ }}
                view="sign_in"
                redirectTo={window.location.origin + '/#/adminpanel/dashboard'}
            />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;