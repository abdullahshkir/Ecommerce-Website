import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Product } from '../../types';
import { PlusIcon, EditIcon, TrashIcon } from '../icons';
import { fetchAllProducts, deleteProduct } from '../../src/integrations/supabase/api'; // Import API functions

const AdminProductsPage: React.FC = () => {
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const fetchedProducts = await fetchAllProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleAddNew = () => {
        navigate('/adminpanel/products/new');
    };

    const handleEdit = (product: Product) => {
        navigate(`/adminpanel/products/edit/${product.id}`);
    };

    const handleDelete = async (product: Product) => {
        if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
            try {
                await deleteProduct(product.id);
                // Refresh the product list after deletion
                loadProducts();
            } catch (error) {
                console.error("Failed to delete product:", error);
                alert("Failed to delete product. Please try again.");
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Products</h2>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors"
                >
                    <PlusIcon className="w-5 h-5"/>
                    Add New Product
                </button>
            </div>
            
            {isLoading ? (
                <div className="text-center py-10 text-gray-600">Loading products...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase">
                            <tr>
                                <th className="px-4 py-3 font-medium">Product</th>
                                <th className="px-4 py-3 font-medium">Category</th>
                                <th className="px-4 py-3 font-medium">Price</th>
                                <th className="px-4 py-3 font-medium">Stock</th>
                                <th className="px-4 py-3 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-contain rounded-md bg-gray-100 p-1"/>
                                            <span className="font-semibold text-gray-800">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{product.category}</td>
                                    <td className="px-4 py-3 text-gray-600">{formatPrice(product.price)}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${product.availability === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                           {product.availability === 'In Stock' ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => handleEdit(product)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
                                                <EditIcon className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(product)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && !isLoading && (
                        <div className="text-center py-10 text-gray-500">No products found. Add your first product!</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;