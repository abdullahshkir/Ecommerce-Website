import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';

const ReturnsPage: React.FC = () => {
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
                title="Returns & Exchanges | Mobixo"
                description="View our returns and exchanges policy. Find out how to initiate a return and get information on refunds."
            />
            <div className={`bg-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Breadcrumb Banner */}
                <div className="bg-gray-100 py-8" style={{backgroundImage: 'url(https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761502936/breadcrumb_bg_xwnbkv.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Returns & Exchanges</h1>
                        <div className="text-sm text-gray-600 mt-2">
                            <Link to="/" className="hover:text-black">Home</Link>
                            <span className="mx-2">/</span>
                            <span>Returns & Exchanges</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-gray-500 mb-8">Last updated: July 30, 2025</p>
                        
                        <Section title="Our Commitment to You">
                            <p>
                                At Mobixo, your satisfaction is our top priority. If you're not completely happy with your purchase, we're here to help. Our Returns & Exchanges policy is designed to be as straightforward and hassle-free as possible.
                            </p>
                        </Section>

                        <Section title="30-Day Return Policy">
                            <p>
                                We offer a 30-day return window for most items. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange. To be eligible for a return, your item must meet the following criteria:
                            </p>
                             <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>The item must be unused and in the same condition that you received it.</li>
                                <li>It must be in the original packaging, with all tags and accessories included.</li>
                                <li>A receipt or proof of purchase is required.</li>
                            </ul>
                        </Section>

                        <Section title="How to Initiate a Return">
                            <p>
                                To start a return, please follow these simple steps:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 pl-4">
                                <li><strong>Contact Customer Support:</strong> Email us at <a href="mailto:Mobixo@domain.com" className="text-blue-600 hover:underline">Mobixo@domain.com</a> or call us at +01 234 567 89 with your order number and the reason for the return.</li>
                                <li><strong>Receive Authorization:</strong> Our team will review your request and provide you with a Return Merchandise Authorization (RMA) number and shipping instructions.</li>
                                <li><strong>Ship Your Item:</strong> Securely pack the item and ship it to the address provided. Please include the RMA number on the package.</li>
                            </ol>
                        </Section>

                        <Section title="Exchanges">
                            <p>
                                If you need to exchange an item for a different size, color, or model, please follow the return process to send back the original item. Once we receive it, we will process the exchange and ship out the new item. If there is a price difference, we will contact you to settle the payment.
                            </p>
                        </Section>

                        <Section title="Refunds">
                           <p>
                                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                           </p>
                           <p>
                                If you are approved, then your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.
                           </p>
                        </Section>

                         <Section title="Exceptions / Non-Returnable Items">
                            <p>
                                Certain types of items cannot be returned, including:
                            </p>
                             <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Gift cards</li>
                                <li>Downloadable software products</li>
                                <li>Some health and personal care items</li>
                            </ul>
                            <p>
                                Please get in touch if you have questions or concerns about your specific item.
                            </p>
                        </Section>
                        
                        <Section title="Questions?">
                            <p>
                                If you have any questions about our Returns and Exchanges Policy, please don't hesitate to <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link>. We're always happy to help!
                            </p>
                        </Section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReturnsPage;