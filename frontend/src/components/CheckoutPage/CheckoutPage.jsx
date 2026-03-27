import React, { useState } from 'react';
import { ChevronLeft, Plus, Minus, PartyPopper, Loader2, Check, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // --- Address State ---
  const [address, setAddress] = useState("123 Bark Street, PetTown, CA 90210");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);

  const [items, setItems] = useState([
    { id: 1, name: "Cephatryl Forte", price: 15.00, qty: 1, img: "https://cdn-icons-png.flaticon.com/512/822/822143.png" },
    { id: 2, name: "Dermatrol Cream", price: 8.75, qty: 1, img: "https://cdn-icons-png.flaticon.com/512/10473/10473522.png" },
    { id: 3, name: "Alervase Tablets", price: 12.20, qty: 1, img: "https://cdn-icons-png.flaticon.com/512/2721/2721105.png" },
  ]);

  const handleQty = (id, delta) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  // Address Save Logic
  const saveAddress = () => {
    setAddress(tempAddress);
    setIsEditingAddress(false);
  };

  return (
    <div className="h-screen w-full bg-slate-50 font-sans flex flex-col items-center overflow-hidden relative mt-11">
      
      <div className="w-full max-w-md bg-white h-screen md:h-[90vh] md:my-auto md:rounded-[30px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="shrink-0 bg-white z-20">
          <div className="p-6 flex items-center border-b border-slate-50">
            <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all">
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <h1 className="flex-1 text-center text-xl font-black text-slate-900 pr-8">Checkout</h1>
          </div>
          <div className="px-6 py-4 text-center border-b border-slate-50/50">
            <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-[3px] mb-1">Items Review</h3>
            <h2 className="font-black text-slate-800 text-lg">Order Summary</h2>
          </div>
        </div>

        {/* Scrollable Medicines */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 no-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-4 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2 border border-slate-100 flex-shrink-0">
                <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between font-bold text-sm text-slate-800">
                  <span>{item.name}</span>
                  <span className="font-black">${(item.price * item.qty).toFixed(2)}</span>
                </div>
                <div className="mt-1 text-[11px] font-bold text-emerald-600">Price: ${item.price.toFixed(2)}</div>
                <div className="mt-4 flex items-center bg-slate-100 rounded-xl p-1 w-fit border border-slate-200">
                    <button onClick={() => handleQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-500"><Minus size={12} /></button>
                    <span className="font-black px-4 text-xs text-slate-800">{item.qty}</span>
                    <button onClick={() => handleQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-emerald-500 text-white rounded-lg shadow-sm"><Plus size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="shrink-0 bg-white border-t border-slate-100 p-6 space-y-5">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Amount</span>
            <span className="text-3xl font-black text-emerald-600 tracking-tighter">${total}</span>
          </div>

          {/* --- Editable Address Section --- */}
          <section className="bg-slate-50 p-4 rounded-[24px] border border-slate-100 transition-all">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-black text-slate-800 text-[11px] italic">Delivery Address</h4>
              {!isEditingAddress ? (
                <button 
                  onClick={() => setIsEditingAddress(true)}
                  className="text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  <Edit2 size={10} /> Change
                </button>
              ) : (
                <button 
                  onClick={saveAddress}
                  className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  <Check size={12} /> Save
                </button>
              )}
            </div>
            
            {isEditingAddress ? (
              <textarea 
                className="w-full bg-white border border-slate-200 rounded-xl p-2 text-[11px] font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                rows="2"
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
              />
            ) : (
              <p className="text-[11px] text-slate-400 font-bold leading-tight">
                {address}
              </p>
            )}
          </section>

          <button 
            onClick={handlePlaceOrder}
            disabled={isProcessing || isEditingAddress}
            className={`w-full py-5 rounded-[24px] font-black text-lg shadow-xl transition-all flex items-center justify-center gap-2 
              ${isProcessing || isEditingAddress ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-emerald-200'}`}
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin" size={20} /> Processing...</>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xs rounded-[40px] p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <PartyPopper size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Order Placed!</h2>
            <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">
              Your medicines are on the way. Thank you for shopping with us!
            </p>
            <button 
              onClick={() => navigate('/')} 
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CheckoutPage;