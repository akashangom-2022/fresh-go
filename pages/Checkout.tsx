
import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { CreditCard, Truck, MapPin, User, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onComplete: (details: OrderDetails) => void;
}

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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-green-600 mb-8 transition-colors"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        Back to Shopping
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Details Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TruckIcon className="w-5 h-5 text-green-600" />
              Delivery Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm outline-none"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-sm font-bold text-gray-400">+91</span>
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm outline-none"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Delivery Address</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    required
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm outline-none resize-none"
                    placeholder="Flat/House No, Colony, City, Pin Code"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCardIcon className="w-5 h-5 text-green-600" />
              Payment Method
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['UPI', 'Card', 'Cash', 'NetBanking'].map(method => (
                <button
                  key={method}
                  onClick={() => setFormData({ ...formData, paymentMethod: method })}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    formData.paymentMethod === method
                      ? 'border-green-600 bg-green-50 ring-2 ring-green-600 ring-opacity-20'
                      : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <span className="text-xs font-bold">{method}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity} x {item.name}</span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-4 mt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white mt-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Confirm Order
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-4 uppercase font-bold tracking-widest">
              Secure Checkout • 100% Satisfaction Guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon shims
const ChevronLeftIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const UserIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MapPinIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const TruckIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M13 19H7"/><path d="M22 17H13V9a2 2 0 0 1 2-2h3l3 3Z"/><path d="M9 13H4V8a2 2 0 0 1 2-2h7"/></svg>;
const CreditCardIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;

export default Checkout;
