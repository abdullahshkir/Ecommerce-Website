import React, { useState } from 'react';
import { products } from '../../data/products';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Product } from '../../types';
import { PlusIcon, EditIcon, TrashIcon, MoreVerticalIcon } from '../icons';
import ProductFormModal from './ProductFormModal';

const AdminProductsPage: React.FC = () => {
    const { formatPrice } = useCurrency();
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleAddNew = () => {
        setEditingProduct(null);
        setModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
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
                                        <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ProductFormModal 
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                product={editingProduct}
            />
        </div>
    );
};

export default AdminProductsPage;