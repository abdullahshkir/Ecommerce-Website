import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Product } from '../../types';
import { UploadIcon, TrashIcon, PlusIcon } from '../icons';
import { createProduct, updateProduct, fetchAllProducts } from '../../src/integrations/supabase/api'; // Import API functions

const formElementStyle = "w-full text-sm py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200";

const Section: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">{title}</h3>
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
        <div className="space-y-4">{children}</div>
    </div>
);

const FormInput: React.FC<{ label: string; name: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string; required?: boolean; }> = 
({ label, name, value, onChange, type = 'text', placeholder, required }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
        <input 
            type={type} 
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={formElementStyle}
        />
    </div>
);

const AdminProductFormPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const isEditing = Boolean(productId);
    const [product, setProduct] = useState<Partial<Product>>({});
    const [isLoading, setIsLoading] = useState(isEditing); // Show loading only when editing
    
    useEffect(() => {
        const loadProduct = async () => {
            if (isEditing) {
                setIsLoading(true);
                try {
                    const allProducts = await fetchAllProducts();
                    const existingProduct = allProducts.find(p => p.id === parseInt(productId!));
                    if (existingProduct) {
                        setProduct(existingProduct);
                    }
                } catch (error) {
                    console.error("Failed to load product:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        
        loadProduct();
    }, [productId, isEditing]);
    
    const pageTitle = isEditing ? 'Edit Product' : 'Add New Product';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        
        // Handle number inputs
        let finalValue: string | number | boolean = value;
        if (type === 'number') {
            finalValue = value === '' ? '' : Number(value);
        } else if (type === 'checkbox') {
            finalValue = checked;
        }
        
        setProduct(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (isEditing) {
                // Update existing product
                await updateProduct(parseInt(productId!), product);
            } else {
                // Create new product
                // Ensure required fields are present for type safety
                const newProductData: Omit<Product, 'id'> = {
                    name: product.name || '',
                    price: typeof product.price === 'number' ? product.price : 0,
                    oldPrice: typeof product.oldPrice === 'number' ? product.oldPrice : null,
                    category: product.category || '',
                    imageUrl: product.imageUrl || '',
                    imageUrl2: product.imageUrl2 || '',
                    isSale: product.isSale || false,
                    isNew: product.isNew || false,
                    collection: product.collection || '',
                    description: product.description || '',
                    longDescription: product.longDescription || '',
                    availability: product.availability || 'In Stock',
                    categories: product.categories || [],
                    tags: product.tags || [],
                    images: product.images || [],
                    color: product.color || [],
                    size: product.size || [],
                    brand: product.brand || '',
                    rating: typeof product.rating === 'number' ? product.rating : 0,
                    reviewCount: typeof product.reviewCount === 'number' ? product.reviewCount : 0,
                };
                await createProduct(newProductData);
            }
            // Navigate back to products list after successful save
            navigate('/adminpanel/products');
        } catch (error) {
            console.error("Failed to save product:", error);
            alert("Failed to save product. Please try again.");
        }
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading product...</div>;
    }

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
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                            <textarea
                                name="description"
                                value={product.description || ''}
                                onChange={handleChange}
                                rows={6}
                                className={formElementStyle}
                            />
                        </div>
                    </Section>

                     <Section title="Product Images">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL</label>
                               <input
                                    type="text"
                                    name="imageUrl"
                                    value={product.imageUrl || ''}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image1.jpg"
                                    className={formElementStyle}
                                />
                            </div>
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">Hover Image URL</label>
                               <input
                                    type="text"
                                    name="imageUrl2"
                                    value={product.imageUrl2 || ''}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image2.jpg"
                                    className={formElementStyle}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Image URLs (comma separated)</label>
                            <textarea
                                name="images"
                                value={(product.images || []).join(', ')}
                                onChange={(e) => setProduct(prev => ({ ...prev, images: e.target.value.split(',').map(url => url.trim()).filter(Boolean) }))}
                                rows={3}
                                placeholder="https://example.com/gallery1.jpg, https://example.com/gallery2.jpg"
                                className={formElementStyle}
                            />
                        </div>
                    </Section>

                    <Section title="Pricing">
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput label="Price" name="price" value={product.price || ''} onChange={handleChange} type="number" placeholder="0.00" />
                            <FormInput label="Sale Price" name="oldPrice" value={product.oldPrice || ''} onChange={handleChange} type="number" placeholder="0.00" />
                        </div>
                    </Section>

                    <Section title="Inventory">
                         <div className="grid grid-cols-2 gap-4">
                            <FormInput label="SKU" name="sku" value={(product as any).sku || ''} onChange={handleChange} />
                            <FormInput label="Stock Quantity" name="stock" value={(product as any).stock || ''} onChange={handleChange} type="number" />
                        </div>
                    </Section>
                    
                    <Section title="Status & Visibility">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability</label>
                                <select
                                    name="availability"
                                    value={product.availability || 'In Stock'}
                                    onChange={handleChange}
                                    className={formElementStyle}
                                >
                                    <option value="In Stock">In Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Collection</label>
                                <input
                                    type="text"
                                    name="collection"
                                    value={product.collection || ''}
                                    onChange={handleChange}
                                    placeholder="e.g., Summer Sale, Featured"
                                    className={formElementStyle}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-6 pt-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isSale"
                                    checked={product.isSale || false}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">On Sale</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isNew"
                                    checked={product.isNew || false}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">New Arrival</span>
                            </label>
                        </div>
                    </Section>
                </div>

                <div className="space-y-6">
                    <Section title="Organization">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={product.category || ''}
                                onChange={handleChange}
                                placeholder="e.g., Electronics, Clothing"
                                className={formElementStyle}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={product.brand || ''}
                                onChange={handleChange}
                                placeholder="e.g., Apple, Samsung"
                                className={formElementStyle}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={(product.tags || []).join(', ')}
                                onChange={(e) => setProduct(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) }))}
                                placeholder="e.g., smartphone, 5G, camera"
                                className={formElementStyle}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Colors (comma separated)</label>
                            <input
                                type="text"
                                name="color"
                                value={(product.color || []).join(', ')}
                                onChange={(e) => setProduct(prev => ({ ...prev, color: e.target.value.split(',').map(color => color.trim()).filter(Boolean) }))}
                                placeholder="e.g., Black, White, Blue"
                                className={formElementStyle}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Sizes (comma separated)</label>
                            <input
                                type="text"
                                name="size"
                                value={(product.size || []).join(', ')}
                                onChange={(e) => setProduct(prev => ({ ...prev, size: e.target.value.split(',').map(size => size.trim()).filter(Boolean) }))}
                                placeholder="e.g., S, M, L, XL"
                                className={formElementStyle}
                            />
                        </div>
                    </Section>
                    
                    <Section title="SEO & Reviews">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating (0-5)</label>
                            <input
                                type="number"
                                name="rating"
                                min="0"
                                max="5"
                                step="0.1"
                                value={product.rating || ''}
                                onChange={handleChange}
                                className={formElementStyle}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Review Count</label>
                            <input
                                type="number"
                                name="reviewCount"
                                value={product.reviewCount || ''}
                                onChange={handleChange}
                                className={formElementStyle}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Long Description (HTML)</label>
                            <textarea
                                name="longDescription"
                                value={product.longDescription || ''}
                                onChange={handleChange}
                                rows={4}
                                className={formElementStyle}
                            />
                        </div>
                    </Section>
                </div>
            </div>
        </form>
    );
};

export default AdminProductFormPage;