
import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onComplete: (details: OrderDetails) => void;
}

const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M13 19H7"/><path d="M22 17H13V9a2 2 0 0 1 2-2h3l3 3Z"/><path d="M9 13H4V8a2 2 0 0 1 2-2h7"/></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onBack, onComplete }) => {
  const [formData, setFormData] = useState<OrderDetails>({
    fullName: '',
    address: '',
    phone: '',
    paymentMethod: 'UPI'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.phone) {
      alert("Please fill in all delivery details");
      return;
    }
    onComplete(formData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-green-600 mb-8 transition-colors group"
      >
        <div className="group-hover:-translate-x-1 transition-transform">
           <ChevronLeftIcon />
        </div>
        Back to Shopping
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Details Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
              <TruckIcon />
              Delivery Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <UserIcon />
                    </span>
                    <input
                      required
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm outline-none"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">+91</span>
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm outline-none"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Complete Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-4 text-gray-400">
                    <MapPinIcon />
                  </span>
                  <textarea
                    required
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm outline-none resize-none"
                    placeholder="House No, Street, Landmark, Pin Code"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
              <CreditCardIcon />
              Select Payment Method
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['UPI', 'Card', 'Cash', 'NetBanking'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: method })}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    formData.paymentMethod === method
                      ? 'border-green-600 bg-green-50 ring-4 ring-green-600 ring-opacity-10'
                      : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <span className="text-xs font-bold">{method}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md sticky top-24">
            <h3 className="text-lg font-bold mb-6 pb-4 border-b">Bill Summary</h3>
            <div className="space-y-3 mb-6 max-h-[250px] overflow-y-auto no-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-start text-xs">
                  <div className="flex-1 pr-4">
                    <span className="text-gray-900 font-medium block line-clamp-1">{item.name}</span>
                    <span className="text-gray-400">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-gray-700">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Items Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>GST (Incl.)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-gray-900 border-t pt-4 mt-2">
                <span>To Pay</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white mt-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95"
            >
              Pay ₹{total}
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              100% Safe Payments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
