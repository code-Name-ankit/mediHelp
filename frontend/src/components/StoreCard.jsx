import React from 'react';
import { MapPin, Navigation, IndianRupee } from 'lucide-react';

const StoreCard = ({ store, isNearest, isSelected }) => {
  const { storeName, distance, address, price, stock } = store;

  return (
    <div className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 ${
      isSelected 
      ? 'border-blue-600 bg-blue-50/50 shadow-md' 
      : 'border-slate-50 bg-white hover:border-slate-200'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-slate-900 text-sm tracking-tight">{storeName}</h3>
            {isNearest && (
              <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full">NEAREST</span>
            )}
          </div>
          <p className="text-slate-400 text-[11px] mt-1 flex items-center gap-1">
            <MapPin size={10} /> {address}
          </p>
        </div>
        <div className="text-right">
          <p className="text-blue-600 font-black text-sm flex items-center justify-end">
            <IndianRupee size={12} />{price}
          </p>
          <p className={`text-[9px] font-bold ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-500">
          {distance.toFixed(1)} km away
        </span>
        {isSelected && (
          <button className="flex items-center gap-1 text-[11px] font-black text-blue-600 uppercase tracking-tighter">
            <Navigation size={12} /> Selected
          </button>
        )}
      </div>
    </div>
  );
};

export default StoreCard;