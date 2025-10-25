import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import WishlistPage from './components/WishlistPage';
import Hero from './components/Hero';
import Features from './components/Features';
import PromoGrid from './components/PromoGrid';
import BestSellers from './components/BestSellers';
import DealsOfTheDay from './components/DealsOfTheDay';
import FeaturedCollection from './components/FeaturedCollection';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import { Product } from './types';
import ProductPage from './components/ProductPage';

const HomePage = ({ onProductQuickView, onProductClick }: { onProductQuickView: (product: Product) => void, onProductClick: (id: number) => void }) => (
  <>
    <Hero />
    <Features />
    <PromoGrid />
    <BestSellers onProductQuickView={onProductQuickView} onProductClick={onProductClick} />
    <DealsOfTheDay />
    <FeaturedCollection onProductQuickView={onProductQuickView} onProductClick={onProductClick} />
  </>
);

const App: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-white font-sans">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage onProductQuickView={handleOpenQuickView} onProductClick={handleProductClick} />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/product/:id" element={<ProductPage onProductClick={handleProductClick} />} />
        </Routes>
      </main>
      <Footer />
      <QuickViewModal product={quickViewProduct} onClose={handleCloseQuickView} />
    </div>
  );
};

export default App;