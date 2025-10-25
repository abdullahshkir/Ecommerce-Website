import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CurrencyContextType {
  currency: 'USD' | 'PKR';
  setCurrency: (currency: 'USD' | 'PKR') => void;
  formatPrice: (price: number) => string;
}

const USD_TO_PKR_RATE = 280;

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<'USD' | 'PKR'>('PKR');

  const formatPrice = (price: number) => {
    if (currency === 'PKR') {
      return `Rs ${(price * USD_TO_PKR_RATE).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const value = { currency, setCurrency, formatPrice };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
