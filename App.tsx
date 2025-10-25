import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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

const HomePage = ({ onProductQuickView }: { onProductQuickView: (product: Product) => void }) => (
  <>
    <Hero />
    <Features />
    <PromoGrid />
    <BestSellers onProductQuickView={onProductQuickView} />
    <DealsOfTheDay />
    <FeaturedCollection onProductQuickView={onProductQuickView} />
  </>
);

const App: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <div className="bg-white font-sans">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage onProductQuickView={handleOpenQuickView} />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </main>
      <Footer />
      <QuickViewModal product={quickViewProduct} onClose={handleCloseQuickView} />
    </div>
  );
};

export default App;