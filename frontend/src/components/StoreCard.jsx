import React from 'react';
import { Star, MapPin, Clock, Navigation } from 'lucide-react';

const StoreCard = ({ store, onViewMap }) => {
  const { storeName, address, distance, rating = 4.5, medicine } = store;

  return (
    <div className="bg-white rounded-[12px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=500" 
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
          alt="pharmacy" 
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-lg flex items-center gap-1 shadow-lg">
          <Clock size={10} /> OPEN 24/7
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="font-black text-slate-900 text-lg leading-tight">{storeName}</h3>
          <span className="text-slate-900 font-bold text-sm whitespace-nowrap">{distance.toFixed(1)} km</span>
        </div>

        <div className="flex items-center gap-1 text-yellow-400">
           {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />)}
           <span className="text-slate-400 text-xs font-bold ml-1">{rating}</span>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Medicines Available</p>
          <ul className="text-sm font-bold text-slate-600">
            <li className="flex items-center gap-2">• {medicine} <span className="text-emerald-500 text-[10px]">(In stock)</span></li>
            <li className="flex items-center gap-2 text-slate-400">• Ibuprofen <span className="text-orange-400 text-[10px]">(Low stock)</span></li>
          </ul>
        </div>

        {/* --- Action Buttons --- */}
        <div className="pt-2 space-y-2 mt-auto">
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-black text-xs transition-all active:scale-95 shadow-lg shadow-emerald-200 uppercase tracking-wider">
            View Details
          </button>
          
          <button 
            onClick={() => onViewMap(store)}
            className="w-full bg-slate-100 hover:bg-[#0f2a47] hover:text-white text-[#0f2a47] py-3.5 rounded-2xl font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <Navigation size={14} /> View on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;