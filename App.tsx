import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PromoGrid from './components/PromoGrid';
import BestSellers from './components/BestSellers';
import DealsOfTheDay from './components/DealsOfTheDay';
import FeaturedCollection from './components/FeaturedCollection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-white font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
        <PromoGrid />
        <BestSellers />
        <DealsOfTheDay />
        <FeaturedCollection />
      </main>
      <Footer />
    </div>
  );
};

export default App;