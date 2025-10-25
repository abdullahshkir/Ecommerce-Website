import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';

const TermsPage: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
                {children}
            </div>
        </div>
    );

    return (
        <>
            <SEO
                title="Terms & Conditions | Mobixo"
                description="Read the terms and conditions for using the Mobixo website and services. Understand your rights and obligations."
            />
            <div className={`bg-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Breadcrumb Banner */}
                <div className="bg-gray-100 py-8" style={{backgroundImage: 'url(https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761502936/breadcrumb_bg_xwnbkv.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Terms & Conditions</h1>
                        <div className="text-sm text-gray-600 mt-2">
                            <Link to="/" className="hover:text-black">Home</Link>
                            <span className="mx-2">/</span>
                            <span>Terms & Conditions</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-gray-500 mb-8">Last updated: July 30, 2025</p>
                        
                        <Section title="1. Agreement to Terms">
                            <p>
                                By accessing or using our website Mobixo (the "Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who wish to access or use the Service.
                            </p>
                        </Section>

                        <Section title="2. Intellectual Property Rights">
                            <p>
                                The Service and its original content, features, and functionality are and will remain the exclusive property of Mobixo and its licensors. The Service is protected by copyright, trademark, and other laws of both Pakistan and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Mobixo.
                            </p>
                        </Section>

                        <Section title="3. User Accounts">
                            <p>
                                When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                            </p>
                        </Section>

                        <Section title="4. Prohibited Activities">
                            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</p>
                        </Section>

                        <Section title="5. Purchases and Payment">
                            <p>
                                We accept the following forms of payment: Cash on Delivery. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us.
                            </p>
                        </Section>

                        <Section title="6. Governing Law">
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                            </p>
                        </Section>

                        <Section title="7. Disclaimer">
                            <p>
                                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                            </p>
                        </Section>
                        
                        <Section title="8. Limitation of Liability">
                            <p>In no event shall Mobixo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                        </Section>

                        <Section title="9. Contact Us">
                            <p>
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <ul className="list-disc list-inside">
                                <li>By email: Mobixo@domain.com</li>
                                <li>By phone number: +01 234 567 89</li>
                                <li>By visiting this page on our website: <Link to="/contact" className="text-blue-600 hover:underline">Contact Page</Link></li>
                            </ul>
                        </Section>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsPage;
