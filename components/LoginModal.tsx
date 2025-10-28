import React, { useEffect, FC, useState } from 'react';
import { CloseIcon, EnvelopeIcon, EyeIcon, EyeOffIcon } from './icons';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const [isMounted, setIsMounted] = useState(isOpen);
    const [isActive, setIsActive] = useState(isOpen);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        let mountTimeout: number;
        let activeTimeout: number;

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsMounted(true);
            mountTimeout = window.setTimeout(() => {
                 setIsActive(true);
            }, 10);
        } else {
            setIsActive(false);
            activeTimeout = window.setTimeout(() => {
                setIsMounted(false);
                document.body.style.overflow = 'unset';
            }, 300); // Animation duration
        }
        
        return () => {
            window.clearTimeout(mountTimeout);
            window.clearTimeout(activeTimeout);
            if (document.body.style.overflow === 'hidden') {
                document.body.style.overflow = 'unset';
            }
        };
    }, [isOpen]);

    useEffect(() => {
        // Reset to login form when modal is closed
        if (!isOpen) {
            const timer = setTimeout(() => {
                setFormType('login');
                setFormData({ firstName: '', lastName: '', email: '', password: '' });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = {
            firstName: formData.firstName || 'Customer',
            lastName: formData.lastName || '',
            displayName: formData.firstName || 'Customer',
            email: formData.email
        };
        onLoginSuccess(user);
    };


  if (!isMounted) return null;

  return (
    <div 
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
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
        className={`relative w-full max-w-md bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold tracking-wider text-gray-800 uppercase">
                    {formType === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
                </h2>
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Form Container */}
            <div className="flex-grow p-8 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {formType === 'register' && (
                        <>
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="bg-white appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="bg-white appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </>
                    )}

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
                                value={formData.email}
                                onChange={handleInputChange}
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
                                value={formData.password}
                                onChange={handleInputChange}
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

                    {formType === 'login' && (
                      <div className="text-sm">
                          <a href="#" className="font-medium text-gray-600 hover:text-blue-500 underline">
                              Forgot your password?
                          </a>
                      </div>
                    )}
                    
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {formType === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </div>
                </form>

                 <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      {formType === 'login' ? (
                          <>
                              New customer?{' '}
                              <button 
                                  type="button" 
                                  onClick={() => setFormType('register')} 
                                  className="font-medium text-gray-600 hover:text-blue-500 underline bg-transparent border-none p-0 cursor-pointer"
                              >
                                 Create your account
                              </button>
                          </>
                      ) : (
                           <>
                              Already have an account?{' '}
                              <button 
                                  type="button" 
                                  onClick={() => setFormType('login')} 
                                  className="font-medium text-gray-600 hover:text-blue-500 underline bg-transparent border-none p-0 cursor-pointer"
                              >
                                 Login
                              </button>
                          </>
                      )}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;