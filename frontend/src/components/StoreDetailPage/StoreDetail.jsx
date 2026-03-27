import React, { useState } from 'react';
import { 
  ChevronLeft, Star, MapPin, Clock, Plus, Minus, Phone, ShoppingBag, List, X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StoreDetailPage = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Cephatryl Forte", price: 15.00, img: "https://cdn-icons-png.flaticon.com/512/822/822143.png", qty: 1 },
    { id: 2, name: "Dermatrol Cream", price: 8.75, img: "https://cdn-icons-png.flaticon.com/512/10473/10473522.png", qty: 1 },
    { id: 3, name: "Alervase Tablets", price: 12.20, img: "https://cdn-icons-png.flaticon.com/512/2721/2721105.png", qty: 1 },
    { id: 4, name: "Neurovance Solution", price: 22.50, img: "https://cdn-icons-png.flaticon.com/512/3014/3014521.png", qty: 1 },
    { id: 5, name: "Vitamix Capsules", price: 10.00, img: "https://cdn-icons-png.flaticon.com/512/2721/2721105.png", qty: 1 },
  ]);

  const handleQuantityChange = (id, delta) => {
    setMedicines(prevMeds => 
      prevMeds.map(med => 
        med.id === id ? { ...med, qty: Math.max(1, med.qty + delta) } : med
      )
    );
  };

  const MedicineCard = ({ med }) => (
    <div className="bg-white p-4 rounded-[24px] border border-slate-100 flex items-center justify-between shadow-sm group">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center p-2 group-hover:bg-emerald-50 transition-colors">
          <img src={med.img} alt={med.name} className="w-full h-full object-contain opacity-80" />
        </div>
        <div className="text-left">
          <h4 className="font-bold text-slate-800 text-sm leading-tight">{med.name}</h4>
          <p className="font-black text-emerald-600 text-lg mt-0.5">${med.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs">
          <button onClick={() => handleQuantityChange(med.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded text-slate-400"><Minus size={12} /></button>
          <span className="font-black px-2">{med.qty}</span>
          <button onClick={() => handleQuantityChange(med.id, 1)} className="w-6 h-6 flex items-center justify-center bg-emerald-500 text-white rounded"><Plus size={12} /></button>
        </div>
        <button className="p-2 bg-slate-900 text-white rounded-lg active:scale-95"><ShoppingBag size={14} /></button>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-slate-50 pt-20 md:pt-24 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* --- LEFT SECTION --- */}
      <div className="w-full md:w-[40%] bg-white p-6 md:p-10 border-r border-slate-100 flex flex-col shrink-0 overflow-y-auto relative z-10 no-scrollbar">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-bold mb-6 w-fit hover:text-emerald-500 transition-colors"><ChevronLeft size={20} /> Back</button>

        <div className="rounded-2xl overflow-hidden mb-6 shadow-xl shrink-0 h-48 md:h-64 border-4 border-white">
          <img src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=1000" className="w-full h-full object-cover" alt="Pharmacy" />
        </div>

        <div className="space-y-6 text-left relative z-20">
          <h2 className="text-3xl font-black text-slate-900 leading-tight">Metro Healthcare Pharmacy</h2>
          <div className="flex items-center gap-2 text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />)}
            <span className="text-slate-800 font-bold ml-1">4.7</span>
          </div>

          <div className="space-y-3 text-slate-500 font-bold text-sm">
            <div className="flex items-start gap-3"><MapPin size={18} className="text-emerald-500 shrink-0 mt-1" /> <span>1576 Broadway Ave, Manhattan, NY 10036</span></div>
            <div className="flex items-center gap-3"><Clock size={18} className="text-emerald-500 shrink-0" /> <span>Open 9:00 am - 10:00 pm</span></div>
          </div>

          <div className="flex gap-3 pt-4">
<button 
  onClick={() => navigate('/checkout')} // Is path ko apne App.js route se match karein
  className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-emerald-600 transition-all active:scale-95"
>
  Order Now
</button>            <button className="flex-1 border-2 border-emerald-500 text-emerald-500 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all active:scale-95"><Phone size={18} /> Call</button>
          </div>

          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="md:hidden w-full mt-4 flex items-center justify-center gap-2 bg-slate-100 text-slate-800 py-4 rounded-2xl font-black border-2 border-slate-200 active:scale-95 transition-all"
          >
            <List size={20} /> See All Medicines
          </button>
        </div>
      </div>

      {/* --- RIGHT SECTION --- */}
      <div className="hidden md:flex w-full md:w-[60%] flex-col h-full bg-slate-50/50">
        <div className="p-10 pb-6 bg-slate-50/50 backdrop-blur-sm z-10 border-b border-slate-100">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-800">Available Medicines</h3>
            <span className="bg-white border px-4 py-1.5 rounded-full font-black text-[10px] text-slate-500 tracking-wider shadow-sm uppercase">{medicines.length} STOCK AVAILABLE</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-10 pb-24 no-scrollbar">
          <div className="max-w-3xl mx-auto space-y-4 pt-6">
            {medicines.map((med) => <MedicineCard key={med.id} med={med} />)}
          </div>
        </div>
      </div>

      {/* --- MOBILE BOTTOM DRAWER --- */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsDrawerOpen(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] h-[75vh] flex flex-col p-6 shadow-2xl transition-transform transform translate-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-800">All Medicines</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pb-10 no-scrollbar">
              {medicines.map((med) => <MedicineCard key={med.id} med={med} />)}
            </div>
          </div>
        </div>
      )}

      {/* --- Global CSS to Hide Scrollbars --- */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default StoreDetailPage;