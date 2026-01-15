
import React, { useEffect, useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { getSmartSuggestions } from '../services/gemini';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout 
}) => {
  const [suggestion, setSuggestion] = useState<string>("");
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  useEffect(() => {
    if (isOpen && items.length > 0) {
      const fetchSuggestion = async () => {
        setLoadingSuggestion(true);
        const text = await getSmartSuggestions(items);
        setSuggestion(text);
        setLoadingSuggestion(false);
      };
      fetchSuggestion();
    }
  }, [isOpen, items.length]);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-green-600" />
              My Cart
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <XIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-8 rounded-full mb-4">
                  <ShoppingBag className="w-16 h-16 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">Your cart is empty</h3>
                <p className="text-sm text-gray-500 max-w-[200px] mt-2">
                  Add items from the store to see them here.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* AI Suggestions */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-blue-700 uppercase">AI Smart Suggestion</span>
                  </div>
                  <p className="text-sm text-blue-900 italic">
                    {loadingSuggestion ? "Generating ideas..." : suggestion}
                  </p>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-1">{item.unit}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">₹{item.price}</span>
                          <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="text-gray-600 hover:text-green-600 p-1"
                            >
                              -
                            </button>
                            <span className="mx-2 text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="text-gray-600 hover:text-green-600 p-1"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[10px] text-gray-400">Add ₹{500 - subtotal} more for free delivery</p>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button 
                onClick={onCheckout}
                className="w-full bg-green-600 text-white flex items-center justify-center gap-2 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Proceed to Checkout
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Icon shims
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const SparklesIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;
const Trash2Icon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const ArrowRightIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;

export default CartDrawer;
