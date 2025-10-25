
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';

const App: React.FC = () => {
  return (
    <div className="bg-white font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
};

export default App;