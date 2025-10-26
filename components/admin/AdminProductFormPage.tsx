import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { Product } from '../../types';
import { UploadIcon } from '../icons';

const formElementStyle = "w-full text-sm py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200";

const FormInput: React.FC<{ label: string; name: string; value: any; onChange: (e: any) => void; type?: string; placeholder?: string; required?: boolean; }> = ({ label, name, value, onChange, type = "text", placeholder, required }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={formElementStyle}
        />
    </div>
);

const FormTextarea: React.FC<{ label: string; name: string; value: string; onChange: (e: any) => void; rows?: number; }> = ({ label, name, value, onChange, rows = 4 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className={formElementStyle}
        ></textarea>
    </div>
);

const FormSelect: React.FC<{ label: string; name: string; value: string; onChange: (e: any) => void; children: React.ReactNode; }> = ({ label, name, value, onChange, children }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select id={name} name={name} value={value} onChange={onChange} className={formElementStyle}>
            {children}
        </select>
    </div>
);

const FormCheckbox: React.FC<{ label: string; name: string; checked: boolean; onChange: (e: any) => void; }> = ({ label, name, checked, onChange }) => (
    <div className="flex items-center">
        <input
            id={name}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-800">{label}</label>
    </div>
);

const AdminProductFormPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const isEditing = Boolean(productId);

    const [product, setProduct] = useState<Partial<Product>>({
        name: '',
        price: 0,
        oldPrice: undefined,
        category: '',
        availability: 'In Stock',
        description: '',
        longDescription: '',
        imageUrl: '',
        imageUrl2: '',
        isNew: false,
        isSale: false,
        collection: 'Accesories',
        tags: [],
    });

    useEffect(() => {
        if (isEditing) {
            const productToEdit = products.find(p => p.id === parseInt(productId!, 10));
            if (productToEdit) {
                setProduct(productToEdit);
            } else {
                // Handle product not found, maybe navigate away
                navigate('/adminpanel/products');
            }
        }
    }, [productId, isEditing, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setProduct(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
             setProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
        } else {
            setProduct(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally send the data to your API
        console.log("Submitting Product Data:", product);
        alert(`Product successfully ${isEditing ? 'updated' : 'created'}!`);
        navigate('/adminpanel/products');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                <button type="button" onClick={() => navigate('/adminpanel/products')} className="text-sm font-medium text-gray-600 hover:underline">Cancel</button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold border-b pb-3 mb-4">Basic Information</h3>
                        <div className="space-y-4">
                            <FormInput label="Product Name" name="name" value={product.name} onChange={handleChange} required />
                            <FormTextarea label="Short Description" name="description" value={product.description || ''} onChange={handleChange} />
                             <FormTextarea label="Long Description (HTML)" name="longDescription" value={product.longDescription || ''} onChange={handleChange} rows={8}/>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold border-b pb-3 mb-4">Images</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
                                <input name="imageUrl" value={product.imageUrl || ''} onChange={handleChange} className={formElementStyle} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hover Image URL</label>
                                <input name="imageUrl2" value={product.imageUrl2 || ''} onChange={handleChange} className={formElementStyle} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                     <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold border-b pb-3 mb-4">Pricing</h3>
                        <div className="space-y-4">
                             <FormInput label="Price" name="price" type="number" value={product.price} onChange={handleChange} />
                             <FormInput label="Old Price (for sale display)" name="oldPrice" type="number" value={product.oldPrice} onChange={handleChange} />
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold border-b pb-3 mb-4">Organization</h3>
                        <div className="space-y-4">
                            <FormSelect label="Category" name="category" value={product.category || ''} onChange={handleChange}>
                                <option>Watch</option>
                                <option>Headphones</option>
                                <option>Camera</option>
                                <option>Digital</option>
                                <option>Speaker</option>
                                <option>Laptop</option>
                                <option>Accessories</option>
                            </FormSelect>
                             <FormSelect label="Collection" name="collection" value={product.collection || ''} onChange={handleChange}>
                                <option>Accesories</option>
                                <option>Smart TV</option>
                                <option>Camera</option>
                                <option>Digital</option>
                            </FormSelect>
                             <FormInput label="Tags (comma separated)" name="tags" value={Array.isArray(product.tags) ? product.tags.join(',') : ''} onChange={handleChange} />
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold border-b pb-3 mb-4">Status & Visibility</h3>
                        <div className="space-y-3">
                           <FormSelect label="Availability" name="availability" value={product.availability || 'In Stock'} onChange={handleChange}>
                                <option>In Stock</option>
                                <option>Out of Stock</option>
                            </FormSelect>
                           <FormCheckbox label="New Product" name="isNew" checked={product.isNew || false} onChange={handleChange} />
                           <FormCheckbox label="On Sale" name="isSale" checked={product.isSale || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => navigate('/adminpanel/products')} className="bg-gray-200 text-gray-800 py-2 px-6 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors">
                    Cancel
                </button>
                <button type="submit" className="bg-black text-white py-2 px-6 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
                    {isEditing ? 'Save Changes' : 'Create Product'}
                </button>
            </div>
        </form>
    );
};

export default AdminProductFormPage;
