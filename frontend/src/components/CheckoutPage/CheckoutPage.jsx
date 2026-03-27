import React, { useState } from 'react';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { id: 1, name: "Cephatryl Forte", price: 15.00, qty: 1, img: "https://cdn-icons-png.flaticon.com/512/822/822143.png" },
    { id: 2, name: "Dermatrol Cream", price: 8.75, qty: 1, img: "https://cdn-icons-png.flaticon.com/512/10473/10473522.png" },
    { id: 3, name: "Alervase Tablets", price: 12.20, qty: 1, img: "https://cdn-icons-png.flaticon.com/512/2721/2721105.png" },
    { id: 4, name: "Neurovance Solution", price: 22.50, qty: 1, img: "https://cdn-icons-png.flaticon.com/512/3014/3014521.png" },
    { id: 5, name: "Vitamix Capsules", price: 10.00, qty: 1, img: "https://cdn-icons-png.flaticon.com/512/2721/2721105.png" },
  ]);

  const handleQty = (id, delta) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);

  return (
    <div className="h-screen w-full bg-slate-50 font-sans flex flex-col items-center overflow-hidden">
      
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white h-screen md:h-[90vh] md:my-auto md:rounded-[40px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        
        {/* --- FIXED HEADER --- */}
        <div className="shrink-0 bg-white z-20">
          <div className="p-6 flex items-center border-b border-slate-50">
            <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all active:scale-90">
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            {/* Main Title Checkout */}
            <h1 className="flex-1 text-center text-xl font-black text-slate-900 pr-8">Checkout</h1>
          </div>
          
          {/* Order Summary Heading (Centered) */}
          <div className="px-6 py-4 text-center border-b border-slate-50/50">
            <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-[3px] mb-1">Items Review</h3>
            <h2 className="font-black text-slate-800 text-lg">Order Summary</h2>
          </div>
        </div>

        {/* --- SCROLLABLE MEDICINE LIST --- */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 no-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-4 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2 border border-slate-100 flex-shrink-0">
                <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between font-bold text-sm">
                  <span className="text-slate-800 leading-tight pr-4">{item.name}</span>
                  <span className="text-slate-900 font-black">${(item.price * item.qty).toFixed(2)}</span>
                </div>
                <div className="mt-1">
                  <span className="text-[11px] font-bold text-emerald-600">Price: ${item.price.toFixed(2)} / unit</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                    <button onClick={() => handleQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-500 hover:text-emerald-500 active:scale-95 transition-all"><Minus size={14} /></button>
                    <span className="font-black px-4 text-sm text-slate-800">{item.qty}</span>
                    <button onClick={() => handleQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-lg shadow-sm hover:bg-emerald-600 active:scale-95 transition-all"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- FIXED BOTTOM SECTION --- */}
        <div className="shrink-0 bg-white border-t border-slate-100 p-6 space-y-5 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Amount</span>
            <span className="text-3xl font-black text-emerald-600 tracking-tighter">${total}</span>
          </div>

          <section className="bg-slate-50 p-4 rounded-[24px] border border-slate-100">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-black text-slate-800 text-[11px]">Delivery Address</h4>
              <button className="text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:underline">Change</button>
            </div>
            <p className="text-[11px] text-slate-400 font-bold leading-relaxed truncate">
              123 Bark Street, PetTown, CA 90210
            </p>
          </section>

          <button className="w-full bg-emerald-600 text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all">
            Place Order
          </button>
        </div>

      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CheckoutPage;