import React, { FC, useEffect, useState, useRef } from 'react';
import { CloseIcon } from './icons';
import SupabaseAuth from './SupabaseAuth';
import { useUser } from '../contexts/UserContext';
import { useLocation } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    const { user, isLoggedIn, logout, isLoadingUser } = useUser();
    const location = useLocation();
    const [isMounted, setIsMounted] = useState(isOpen);
    const [isActive, setIsActive] = useState(isOpen);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    // Ref to track if the user was logged in before this render cycle
    const wasLoggedInRef = useRef(isLoggedIn);

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
                setErrorMessage(null);
            }, 300);
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
        // Check if the user just transitioned to logged in state
        const justLoggedIn = isLoggedIn && !wasLoggedInRef.current;
        
        if (justLoggedIn) {
            // Wait for user profile data to load before checking role
            if (isLoadingUser) return; 
            
            if (user?.role === 'admin') {
                // If an admin logs in via the customer modal, log them out immediately
                setErrorMessage('Admin accounts must log in via the Admin Panel.');
                logout();
            } else if (user?.role === 'pending_admin') {
                 // If a pending admin logs in via the customer modal, log them out immediately
                setErrorMessage('Your admin access request is pending approval. Please use the Admin Panel login page.');
                logout();
            } else {
                // Successful customer login (role is 'user' or profile was missing but basic user loaded): navigate away and close modal
                onLoginSuccess();
            }
        }
        
        // Update ref for next render cycle
        wasLoggedInRef.current = isLoggedIn;

    }, [isLoggedIn, user, onLoginSuccess, logout, isLoadingUser]);


    if (!isMounted) return null;

    return (
        <div 
            className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="absolute inset-0 bg-black bg-opacity-50" 
                onClick={onClose}
                aria-hidden="true"
            ></div>
            
            <div 
                className={`relative w-full max-w-md bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold tracking-wider text-gray-800 uppercase">
                            Authentication
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-black">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex-grow p-8 overflow-y-auto">
                        {errorMessage && (
                            <div className="p-3 mb-4 rounded-md text-sm bg-red-100 text-red-800">
                                {errorMessage}
                            </div>
                        )}
                        <SupabaseAuth onSuccess={onLoginSuccess} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;