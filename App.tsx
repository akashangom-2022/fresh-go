
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';
import { Product, CartItem, Category, OrderDetails } from './types';
import { CheckCircle2, Package, ArrowRight, Home as HomeIcon } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col">
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
          <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-6 rounded-full">
                <CheckCircle2Icon className="w-20 h-20 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you, <span className="font-bold text-gray-800">{lastOrder?.fullName}</span>. 
              Your order is on its way and will reach <span className="italic">{lastOrder?.address}</span> within 10 minutes.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-5 h-5 text-green-600" />
                <span className="font-bold">Track Order #FG-{Math.floor(Math.random() * 1000000)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Delivery Status</span>
                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Out for Delivery</span>
              </div>
            </div>
            <button 
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95"
            >
              <HomeIconIcon className="w-5 h-5" />
              Back to Home
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

      <footer className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 p-1.5 rounded-lg">
                  <PackageIcon className="text-white w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-green-700">FreshGo</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Quality groceries delivered to your doorstep in minutes. Serving you 24/7 with the freshest picks.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Explore</h4>
              <ul className="text-sm text-gray-500 space-y-2">
                <li><a href="#" className="hover:text-green-600">Offers</a></li>
                <li><a href="#" className="hover:text-green-600">Stores Near Me</a></li>
                <li><a href="#" className="hover:text-green-600">Gift Cards</a></li>
                <li><a href="#" className="hover:text-green-600">FreshGo Pro</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Help</h4>
              <ul className="text-sm text-gray-500 space-y-2">
                <li><a href="#" className="hover:text-green-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-green-600">FAQs</a></li>
                <li><a href="#" className="hover:text-green-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-600">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
              <div className="flex gap-4">
                 {/* Placeholder social icons */}
                 <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                 <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                 <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
            © 2024 FreshGo Technologies Private Limited. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Shims
const CheckCircle2Icon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const HomeIconIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const PackageIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>;

export default App;
