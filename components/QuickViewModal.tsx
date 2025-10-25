import React, { FC, useEffect, useState } from 'react';
import { CloseIcon, StarIcon, PlusIcon, MinusIcon, HeartIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const QuickViewModal: FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const images = product.images?.length ? product.images : [product.imageUrl, product.imageUrl2];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white w-full max-w-4xl m-4 rounded-lg shadow-xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
        
        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 p-4 relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md">
            <img src={images[currentImageIndex]} alt={product.name} className="w-full h-full object-contain" />
            <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md transition-colors">
              <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md transition-colors">
              <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto no-scrollbar">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          
          <div className="flex items-center my-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < (product.rating || 0)} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">({product.reviewCount || 1} review)</span>
          </div>
          
          <p className="text-3xl font-bold text-gray-900 mb-4">{formatPrice(product.price)}</p>
          
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description || 'No description available.'}</p>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"><MinusIcon className="w-4 h-4"/></button>
              <input type="text" value={quantity} readOnly className="w-12 text-center border-0 p-0 text-base focus:outline-none focus:ring-0 bg-transparent"/>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"><PlusIcon className="w-4 h-4"/></button>
            </div>
            <button className="flex-grow bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors">ADD TO CART</button>
            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              <HeartIcon className="w-5 h-5"/>
            </button>
          </div>
          
          <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 mb-6 transition-colors">BUY IT NOW</button>
          
          <div className="text-sm text-gray-600 space-y-1">
            <p><a href="#" className="text-blue-600 underline hover:text-blue-800">Ask a Question</a></p>
            <p><strong>Availability:</strong> <span className="text-green-600 font-semibold">{product.availability || 'In Stock'}</span></p>
            <p><strong>Categories:</strong> {product.categories?.join(', ') || product.category}</p>
            <p><strong>Tags:</strong> {product.tags?.join(', ') || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
