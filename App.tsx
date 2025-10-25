import React from 'react';
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

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <PromoGrid />
    <BestSellers />
    <DealsOfTheDay />
    <FeaturedCollection />
  </>
);

const App: React.FC = () => {
  return (
    <div className="bg-white font-sans">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;