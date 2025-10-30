import React, { useState, useEffect } from 'react';
import SupabaseAuth from '../SupabaseAuth';
import { supabase } from '../../src/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { EyeIcon, EyeOffIcon } from '../icons';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUser();
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Check if the user is logged in but not an admin (e.g., pending_admin)
  useEffect(() => {
      if (isLoggedIn && user?.role !== 'admin') {
          const roleMessage = user?.role === 'pending_admin' 
              ? 'Your admin access request is pending approval. Please wait for the Super Admin to approve your account.'
              : 'You do not have administrative privileges.';
              
          setMessage({
              type: 'error',
              text: roleMessage
          });
          
          // Force logout if they are logged in but not an admin
          if (user) {
              logout();
          }
      } else if (isLoggedIn && user?.role === 'admin') {
          // If they are admin, navigate to dashboard immediately
          navigate('/adminpanel/dashboard', { replace: true });
      }
  }, [isLoggedIn, user, logout, navigate]);

  const handleAuthSuccess = () => {
    // This function is called by SupabaseAuth on successful sign-in/sign-up.
    // The useEffect hook above will handle the redirection or error message based on the fetched user role.
  };
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;
    const confirmPassword = (form.elements.namedItem('confirm_password') as HTMLInputElement)?.value;
    const firstName = (form.elements.namedItem('first_name') as HTMLInputElement)?.value;
    const lastName = (form.elements.namedItem('last_name') as HTMLInputElement)?.value;


    if (!email || !password || !firstName || !lastName || !confirmPassword) {
        setMessage({ type: 'error', text: 'Please fill in all required fields.' });
        return;
    }
    
    if (password !== confirmPassword) {
        setMessage({ type: 'error', text: 'Password and Confirm Password do not match.' });
        return;
    }

    // 1. Sign up the user, passing 'pending_admin' role hint via metadata
    const { data: { user: newUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                initial_role: 'pending_admin',
                first_name: firstName,
                last_name: lastName,
            }
        }
    });

    if (signUpError) {
        setMessage({ type: 'error', text: signUpError.message });
        return;
    }
    
    if (newUser) {
        // We will show a success message and switch to sign in view.
        setMessage({ 
            type: 'success', 
            text: 'Account created! Please check your email for verification. Your admin access is pending approval (unless you are the first admin).' 
        });
        setView('sign_in');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-sm">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-wide text-black font-orbitron">Mobixo</h1>
            <p className="mt-2 text-gray-600">Admin Panel {view === 'sign_in' ? 'Login' : 'Sign Up'}</p>
        </div>
        
        {message && (
            <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.text}
            </div>
        )}

        <div className="mt-8">
            {/* We use a custom form for sign up to pass metadata, but rely on SupabaseAuth for sign in */}
            {view === 'sign_in' ? (
                <>
                    <SupabaseAuth 
                        onSuccess={handleAuthSuccess}
                        view="sign_in"
                        // Redirect to admin dashboard on successful sign-in
                        redirectTo={window.location.origin + '/#/adminpanel/dashboard'}
                    />
                    <button 
                        onClick={() => { setView('sign_up'); setMessage(null); }}
                        className="w-full mt-4 text-sm text-blue-600 hover:underline"
                    >
                        Request Admin Access (Sign Up)
                    </button>
                </>
            ) : (
                <>
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" id="first_name" name="first_name" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" placeholder="First Name" />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" id="last_name" name="last_name" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Last Name" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                            <input type="email" id="email" name="email" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Your email address" />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="password" name="password" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition pr-10" placeholder="Create a password" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 mt-1.5 text-gray-500 hover:text-gray-700">
                                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="relative">
                            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="confirm_password" name="confirm_password" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition pr-10" placeholder="Confirm your password" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 mt-1.5 text-gray-500 hover:text-gray-700">
                                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                            Request Admin Access
                        </button>
                    </form>
                    <button 
                        onClick={() => { setView('sign_in'); setMessage(null); }}
                        className="w-full mt-4 text-sm text-gray-600 hover:underline"
                    >
                        Already requested? Sign In
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;