import React, { FC, useEffect, useState } from 'react';
import { CloseIcon } from './icons';
import SupabaseAuth from '../src/components/SupabaseAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isMounted, setIsMounted] = useState(isOpen);
    const [isActive, setIsActive] = useState(isOpen);

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
                        <SupabaseAuth onSuccess={onLoginSuccess} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;