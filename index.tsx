import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { SessionProvider } from './contexts/SessionContext';
import { ProductProvider } from './contexts/ProductContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <CurrencyProvider>
        <SessionProvider>
          <UserProvider>
            <WishlistProvider>
              <CartProvider>
                <ProductProvider>
                  <App />
                </ProductProvider>
              </CartProvider>
            </WishlistProvider>
          </UserProvider>
        </SessionProvider>
      </CurrencyProvider>
    </HashRouter>
  </React.StrictMode>
);