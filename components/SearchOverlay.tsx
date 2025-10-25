import React, { useEffect, FC } from 'react';
import { CloseIcon, SearchIcon, ChevronDownIcon, ArrowRightIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';
import { products } from '../data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (id: number) => void;
}
const suggestedProducts = products.slice(1, 4);

const SearchOverlay: FC<SearchOverlayProps> = ({ isOpen, onClose, onProductClick }) => {
    const { formatPrice } = useCurrency();
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-modal="true"
        role="dialog"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Search Panel */}
      <div 
        className={`relative w-full max-w-sm bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold tracking-wider text-gray-800 uppercase">Search Our Site</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Search Form */}
            <div className="p-6 space-y-4">
                <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-300 rounded-full px-5 py-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>All Categories</option>
                        <option>Accesories</option>
                        <option>Smart TV</option>
                        <option>Camera</option>
                        <option>Digital</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                        <ChevronDownIcon className="w-4 h-4" />
                    </div>
                </div>
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-full bg-white border border-gray-300 rounded-full pl-5 pr-12 py-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                        <SearchIcon className="w-5 h-5"/>
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div className="flex-grow overflow-y-auto px-6 pb-6">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Need some inspiration?</h3>
                <div className="space-y-5">
                    {suggestedProducts.map(product => (
                        <button
                            onClick={() => {
                                onClose();
                                onProductClick(product.id);
                            }}
                            key={product.id}
                            className="flex items-center space-x-4 group w-full text-left"
                        >
                            <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{product.name}</p>
                                <div className="flex items-baseline space-x-2 mt-1">
                                    <span className={`text-sm font-bold ${product.oldPrice ? 'text-red-600' : 'text-black'}`}>
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.oldPrice && (
                                        <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            
            {/* View All Footer */}
            <div className="p-6 border-t border-gray-200 mt-auto">
                 <a href="#" className="flex items-center justify-center text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    View All
                    <ArrowRightIcon className="ml-2 w-4 h-4" />
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;