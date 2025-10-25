import React, { useEffect, FC, useState } from 'react';
import { CloseIcon, EnvelopeIcon, EyeIcon, EyeOffIcon } from './icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-modal="true"
        role="dialog"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Login Panel */}
      <div 
        className={`relative w-full max-w-md bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold tracking-wider text-gray-800 uppercase">LOGIN</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Login Form */}
            <div className="flex-grow p-8">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="bg-white appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="bg-white appearance-none block w-full px-4 py-3 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                             <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-gray-600 hover:text-blue-500 underline">
                            Forgot your password?
                        </a>
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                 <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        New customer?{' '}
                        <a href="#" className="font-medium text-gray-600 hover:text-blue-500 underline">
                           Create your account
                        </a>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;