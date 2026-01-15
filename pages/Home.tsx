
import React from 'react';
import { CATEGORIES, PRODUCTS } from '../constants';
import { Category, Product, CartItem } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  searchQuery: string;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
}

const Home: React.FC<HomeProps> = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  cartItems,
  onAddToCart,
  onRemoveFromCart
}) => {
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getQuantityInCart = (productId: string) => {
    return cartItems.find(item => item.id === productId)?.quantity || 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero Banner */}
      <div className="mb-8 rounded-2xl overflow-hidden bg-green-600 relative p-8 text-white">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-extrabold mb-4">Groceries delivered in 10 minutes</h1>
          <p className="text-green-100 text-lg mb-6">Choose from over 5,000 items from the brands you love.</p>
          <div className="flex gap-4">
            <span className="bg-green-500/30 px-3 py-1.5 rounded-lg border border-green-400 text-sm font-bold">100% Organic</span>
            <span className="bg-green-500/30 px-3 py-1.5 rounded-lg border border-green-400 text-sm font-bold">Best Prices</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 pointer-events-none">
          <img src="https://picsum.photos/seed/groceries/800/400" className="h-full w-full object-cover" alt="Banner" />
        </div>
      </div>

      {/* Category Selection */}
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as Category)}
            className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
              selectedCategory === category
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {searchQuery ? `Search results for "${searchQuery}"` : `${selectedCategory} Items`}
          </h2>
          <span className="text-sm text-gray-500 font-medium">{filteredProducts.length} items found</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantityInCart={getQuantityInCart(product.id)}
                onAdd={onAddToCart}
                onRemove={onRemoveFromCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
             <div className="text-gray-400 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
             </div>
             <p className="text-lg font-bold text-gray-600">No products found</p>
             <p className="text-sm text-gray-400 mt-1">Try a different search term or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
