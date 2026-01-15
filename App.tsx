
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';
import { Product, CartItem, Category, OrderDetails } from './types';

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'checkout' | 'success'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('freshgo_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    localStorage.setItem('freshgo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCartCompletely = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckoutStart = () => {
    setIsCartOpen(false);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handleOrderComplete = (details: OrderDetails) => {
    setLastOrder(details);
    setCartItems([]);
    setView('success');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setView('home');
    setSearchQuery('');
    setSelectedCategory('All');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-green-100 selection:text-green-800">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartToggle={() => setIsCartOpen(true)}
        onHomeClick={handleBackToHome}
      />

      <main className="flex-1">
        {view === 'home' && (
          <Home 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        )}

        {view === 'checkout' && (
          <Checkout 
            cartItems={cartItems}
            onBack={() => setView('home')}
            onComplete={handleOrderComplete}
          />
        )}

        {view === 'success' && (
          <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 p-8 rounded-full border-4 border-green-50 shadow-inner">
                <CheckCircleIcon />
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">Order Placed!</h1>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Yay, <span className="font-bold text-gray-800">{lastOrder?.fullName}</span>! 
              Your delivery to <span className="font-medium text-gray-700 underline decoration-green-300 underline-offset-4">{lastOrder?.address}</span> is arriving in <span className="text-green-600 font-bold">10 mins</span>.
            </p>
            
            <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-10 shadow-xl shadow-green-900/5 flex flex-col items-center">
               <div className="w-12 h-1 bg-gray-200 rounded-full mb-6"></div>
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Order Live Tracking</span>
               </div>
               <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-green-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
               </div>
               <p className="text-xs font-bold text-gray-500">The rider is near your location</p>
            </div>

            <button 
              onClick={handleBackToHome}
              className="group inline-flex items-center gap-2 bg-green-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 active:scale-95"
            >
              <HomeIcon />
              Continue Shopping
            </button>
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCartCompletely}
        onCheckout={handleCheckoutStart}
      />

      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-green-600 p-1 rounded-lg">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <span className="text-2xl font-black text-green-700 italic">FreshGo</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Experience the magic of instant commerce. We bring the store to your door in minutes.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase text-[10px] tracking-widest">About FreshGo</h4>
              <ul className="text-sm text-gray-500 space-y-3">
                <li><a href="#" className="hover:text-green-600 transition-colors">Career</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase text-[10px] tracking-widest">For Users</h4>
              <ul className="text-sm text-gray-500 space-y-3">
                <li><a href="#" className="hover:text-green-600 transition-colors">Offers</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Help & Support</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">FreshGo Pro</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Sitemap</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-widest">Download App</h4>
              <div className="flex flex-col gap-3">
                 <div className="h-10 w-32 bg-gray-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">App Store</div>
                 <div className="h-10 w-32 bg-gray-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">Google Play</div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <span>© 2024 FreshGo Delivery Services</span>
            <div className="flex gap-6">
              <span>Twitter</span>
              <span>Instagram</span>
              <span>Facebook</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
