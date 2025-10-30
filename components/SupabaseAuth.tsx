import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../src/integrations/supabase/client';
import { useSession } from '../contexts/SessionContext';

interface SupabaseAuthProps {
    onSuccess: () => void;
    view?: 'sign_in' | 'sign_up' | 'forgotten_password' | 'update_password';
    redirectTo?: string;
    // New prop to indicate if this is an admin signup attempt
    isAdminSignup?: boolean; 
}

const SupabaseAuth: React.FC<SupabaseAuthProps> = ({ onSuccess, view = 'sign_in', redirectTo, isAdminSignup = false }) => {
    // Removed useEffect that called onSuccess on user change.
    // The parent component (AuthModal) will now handle success detection.
    
    // Custom handler for sign up to set the role to pending_admin
    const handleSignUp = async (data: any) => {
        if (isAdminSignup && data.user) {
            // Logic remains the same, relying on trigger for role assignment.
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Auth
                supabaseClient={supabase}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#2563EB', // Blue-600
                                brandAccent: '#1D4ED8', // Blue-700
                                defaultButtonBackground: '#111827', // Gray-900
                                defaultButtonBackgroundHover: '#374151', // Gray-700
                                defaultButtonText: '#FFFFFF',
                            },
                            borderWidths: {
                                button: '0px',
                                input: '1px',
                            },
                            radii: {
                                button: '9999px', // rounded-full
                                input: '0.375rem', // rounded-md
                            },
                        },
                    },
                }}
                providers={[]}
                theme="light"
                view={view}
                // Set default customer redirect to /#/account
                redirectTo={redirectTo || window.location.origin + '/#/account'}
                localization={{
                    variables: {
                        sign_in: {
                            email_label: 'Email address',
                            password_label: 'Password',
                            email_input_placeholder: 'Your email address',
                            password_input_placeholder: 'Your password',
                            button_label: 'Sign In',
                            loading_button_label: 'Signing In...',
                            link_text: 'Already have an account? Sign In',
                        },
                        sign_up: {
                            email_label: 'Email address',
                            password_label: 'Password',
                            email_input_placeholder: 'Your email address',
                            password_input_placeholder: 'Create a password',
                            button_label: 'Create Account',
                            loading_button_label: 'Creating Account...',
                            link_text: 'Don\'t have an account? Sign Up',
                            social_provider_text: 'Sign up with {{provider}}',
                            confirmation_text: 'Check your email for the confirmation link',
                        },
                        forgotten_password: {
                            email_label: 'Email address',
                            email_input_placeholder: 'Your email address',
                            button_label: 'Send Reset Instructions',
                            loading_button_label: 'Sending...',
                            link_text: 'Forgot your password?',
                        },
                        update_password: {
                            password_label: 'New Password',
                            password_input_placeholder: 'Your new password',
                            button_label: 'Update Password',
                            loading_button_label: 'Updating...',
                        },
                    },
                }}
            />
        </div>
    );
};

export default SupabaseAuth;