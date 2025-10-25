import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';

const ShippingPage: React.FC = () => {
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
                title="Shipping & Delivery | Mobixo"
                description="Find out everything you need to know about our shipping policies, delivery times, and costs at Mobixo."
            />
            <div className={`bg-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Breadcrumb Banner */}
                <div className="bg-gray-100 py-8" style={{backgroundImage: 'url(https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761502936/breadcrumb_bg_xwnbkv.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Shipping & Delivery</h1>
                        <div className="text-sm text-gray-600 mt-2">
                            <Link to="/" className="hover:text-black">Home</Link>
                            <span className="mx-2">/</span>
                            <span>Shipping & Delivery</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-gray-500 mb-8">Last updated: July 30, 2025</p>
                        
                        <Section title="Shipment Processing Time">
                           <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
                           <p>If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in the shipment of your order, we will contact you via email or telephone.</p>
                        </Section>

                        <Section title="Shipping Rates & Delivery Estimates">
                            <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
                            <div className="overflow-x-auto mt-4">
                                <table className="min-w-full bg-white border text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-4 border-b font-semibold">Shipment Method</th>
                                            <th className="py-3 px-4 border-b font-semibold">Estimated Delivery Time</th>
                                            <th className="py-3 px-4 border-b font-semibold">Shipment Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="py-3 px-4">Standard Shipping</td>
                                            <td className="py-3 px-4">3-5 business days</td>
                                            <td className="py-3 px-4">Free</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Express Shipping</td>
                                            <td className="py-3 px-4">1-2 business days</td>
                                            <td className="py-3 px-4">$15.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-sm">Delivery delays can occasionally occur.</p>
                        </Section>

                        <Section title="Shipment Confirmation & Order Tracking">
                            <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                        </Section>

                         <Section title="Customs, Duties, and Taxes">
                            <p>Mobixo is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
                        </Section>

                        <Section title="Damages">
                           <p>Mobixo is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
                        </Section>
                        
                        <Section title="International Shipping Policy">
                           <p>We currently do not ship outside of Pakistan.</p>
                        </Section>

                        <Section title="Questions?">
                           <p>If you have any questions about our Shipping & Delivery Policy, please don't hesitate to <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link>.</p>
                        </Section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingPage;