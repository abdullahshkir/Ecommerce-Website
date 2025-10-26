import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { Product } from '../../types';
// FIX: Import PlusIcon.
import { UploadIcon, TrashIcon, PlusIcon } from '../icons';

const Section: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">{title}</h3>
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
        <div className="space-y-4">{children}</div>
    </div>
);

const FormInput: React.FC<{ label: string; name: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string; required?: boolean; }> = 
({ label, name, value, onChange, type = 'text', placeholder, required }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input 
            type={type} 
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

const AdminProductFormPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const isEditing = Boolean(productId);
    const [product, setProduct] = useState<Partial<Product>>({});
    
    useEffect(() => {
        if (isEditing) {
            const existingProduct = products.find(p => p.id === parseInt(productId!));
            if (existingProduct) {
                setProduct(existingProduct);
            }
        }
    }, [productId, isEditing]);
    
    const pageTitle = isEditing ? 'Edit Product' : 'Add New Product';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saving product:', product);
        navigate('/adminpanel/products');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{pageTitle}</h2>
                <div className="flex gap-2">
                    <Link to="/adminpanel/products" className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                        Discard
                    </Link>
                    <button type="submit" className="bg-black text-white py-2 px-4 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
                        Save Product
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Section title="General Information">
                        <FormInput label="Product Name" name="name" value={product.name || ''} onChange={handleChange} required />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={product.description || ''}
                                onChange={handleChange}
                                rows={6}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </Section>

                     <Section title="Product Images">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500">
                                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-1 text-sm text-gray-600">Drag & drop or click to upload</p>
                                </div>
                            </div>
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">Gallery</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="relative aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:border-blue-500 cursor-pointer">
                                            <PlusIcon className="w-6 h-6"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section title="Pricing">
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput label="Price" name="price" value={product.price || ''} onChange={handleChange} type="number" placeholder="$0.00" />
                            <FormInput label="Sale Price" name="oldPrice" value={product.oldPrice || ''} onChange={handleChange} type="number" placeholder="$0.00" />
                        </div>
                    </Section>

                    <Section title="Inventory">
                         <div className="grid grid-cols-2 gap-4">
                            <FormInput label="SKU" name="sku" value={(product as any).sku || ''} onChange={handleChange} />
                            <FormInput label="Stock Quantity" name="stock" value={(product as any).stock || ''} onChange={handleChange} type="number" />
                        </div>
                    </Section>
                </div>

                <div className="space-y-6">
                    <Section title="Product Status">
                        <select
                            name="availability"
                            value={product.availability || 'In Stock'}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </Section>

                    <Section title="Organization">
                        <FormInput label="Category" name="category" value={product.category || ''} onChange={handleChange} />
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                            <input type="text" placeholder="Add tags..." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            <p className="text-xs text-gray-500 mt-1">Separate tags with commas.</p>
                        </div>
                    </Section>
                </div>
            </div>
        </form>
    );
};

export default AdminProductFormPage;