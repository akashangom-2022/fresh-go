
import React from 'react';
import { ShoppingCart, Search, Menu, Package } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onCartToggle: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, cartCount, onCartToggle, onHomeClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={onHomeClick}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-green-600 p-2 rounded-xl">
            <Package className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-green-700 hidden sm:block">FreshGo</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for groceries, snacks and more..."
            className="w-full bg-gray-100 border-none rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onCartToggle}
            className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

// Simple Lucide icons shim since we aren't installing the package
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
);

export default Header;
