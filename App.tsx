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
import CartModal from './components/CartModal';
import { useCart } from './contexts/CartContext';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ThankYouPage from './components/ThankYouPage';
import SearchOverlay from './components/SearchOverlay';
import LoginModal from './components/LoginModal';
import MobileBottomNav from './components/MobileBottomNav';
import { SEO } from './components/SEO';
import ShopPage from './components/ShopPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import TermsPage from './components/TermsPage';
import ReturnsPage from './components/ReturnsPage';
import ShippingPage from './components/ShippingPage';

const HomePage = ({ onProductQuickView, onProductClick }: { onProductQuickView: (product: Product) => void, onProductClick: (id: number) => void }) => (
  <>
    <Hero />
    <Features />
    <PromoGrid />
    <BestSellers onProductQuickView={onProductQuickView} onProductClick={onProductClick} />
    <DealsOfTheDay onProductClick={onProductClick} />
    <FeaturedCollection onProductQuickView={onProductQuickView} onProductClick={onProductClick} />
  </>
);

const App: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();
  const { isCartOpen, closeCart } = useCart();

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
    <div className="bg-white font-sans pb-16 lg:pb-0">
      <Header onSearchClick={() => setSearchOpen(true)} onLoginClick={() => setLoginOpen(true)} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SEO
                  title="Mobixo - Modern Ecommerce Store | The Future of Online Shopping"
                  description="Shop the latest electronics, gadgets, and accessories at Mobixo. Discover amazing deals on smart TVs, cameras, drones, and more. Free shipping and 24/7 support."
                  imageUrl="https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761378383/Hero_image_tyy9x9.jpg"
                />
                <HomePage onProductQuickView={handleOpenQuickView} onProductClick={handleProductClick} />
              </>
            }
          />
          <Route
            path="/shop"
            element={
              <>
                <SEO
                  title="Shop All Products | Mobixo"
                  description="Explore our wide collection of electronics, gadgets, and accessories. Find the best deals and the latest tech at Mobixo."
                />
                <ShopPage onProductQuickView={handleOpenQuickView} onProductClick={handleProductClick} />
              </>
            }
          />
          <Route
            path="/wishlist"
            element={
              <>
                <SEO
                  title="My Wishlist | Mobixo"
                  description="View and manage your saved items. Keep track of all your favorite products in one place at Mobixo."
                />
                <WishlistPage />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductPage onProductClick={handleProductClick} />} />
          <Route
            path="/cart"
            element={
              <>
                <SEO
                  title="Shopping Cart | Mobixo"
                  description="Review your items and proceed to checkout. Secure and easy shopping at Mobixo."
                />
                <CartPage />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <SEO
                  title="Checkout | Mobixo"
                  description="Complete your purchase securely. Enter your shipping and payment information to place your order at Mobixo."
                />
                <CheckoutPage />
              </>
            }
          />
          <Route
            path="/thank-you"
            element={
              <>
                <SEO
                  title="Order Confirmed | Mobixo"
                  description="Thank you for your purchase from Mobixo. Your order has been confirmed."
                />
                <ThankYouPage />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <SEO
                  title="Contact Us | Mobixo"
                  description="Get in touch with Mobixo. We are here to help you with any questions or concerns."
                />
                <ContactPage />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <SEO
                  title="About Us | Mobixo"
                  description="Learn more about Mobixo, our mission, values, and the team dedicated to bringing you the best in modern electronics and gadgets."
                />
                <AboutPage />
              </>
            }
          />
           <Route
            path="/terms"
            element={
              <>
                <SEO
                  title="Terms & Conditions | Mobixo"
                  description="Read the terms and conditions for using the Mobixo website and services. Understand your rights and obligations."
                />
                <TermsPage />
              </>
            }
          />
           <Route
            path="/returns"
            element={
              <>
                <SEO
                  title="Returns & Exchanges | Mobixo"
                  description="View our returns and exchanges policy. Find out how to initiate a return and get information on refunds."
                />
                <ReturnsPage />
              </>
            }
          />
          <Route
            path="/shipping"
            element={
              <>
                <SEO
                  title="Shipping & Delivery | Mobixo"
                  description="Find out everything you need to know about our shipping policies, delivery times, and costs at Mobixo."
                />
                <ShippingPage />
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
      <QuickViewModal product={quickViewProduct} onClose={handleCloseQuickView} />
      <CartModal isOpen={isCartOpen} onClose={closeCart} onProductClick={handleProductClick} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} onProductClick={handleProductClick} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <MobileBottomNav 
        onSearchClick={() => setSearchOpen(true)} 
        onAccountClick={() => setLoginOpen(true)} 
      />
    </div>
  );
};

export default App;