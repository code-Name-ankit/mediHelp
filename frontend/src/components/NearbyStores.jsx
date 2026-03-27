import React from 'react';
import { Star, MapPin } from 'lucide-react';

const NearbyStores = () => {
  const stores = [
    {
      id: 1,
      name: "Smith's Pharmacy",
      distance: "0.8 mi",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400&q=80",
    },
    {
      id: 2,
      name: "Local Drug Store",
      distance: "0.8 mi",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400&q=80",
    },
    {
      id: 3,
      name: "MediCare Center",
      distance: "0.8 mi",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80",
    }
  ];

  return (
    <section className="py-16 px-6 bg-[#fcfdfe]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Nearby Stores Preview</p>
        <h2 className="text-3xl font-black text-slate-900 mb-12">
          Medicine Availability and Local Stores
        </h2>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-[35px] p-3 shadow-[0_15px_50px_rgba(0,0,0,0.04)] border border-slate-50">
              
              {/* Store Image Wrapper */}
              <div className="relative h-44 w-full rounded-[28px] overflow-hidden mb-4">
                <div className="absolute top-3 right-3 z-10 bg-[#4ADE80] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm">
                  Open 24/7
                </div>
                <img 
                  src={store.image} 
                  alt={store.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Store Details */}
              <div className="px-3 pb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < 4 ? "currentColor" : "none"} strokeWidth={3} />
                    ))}
                    <span className="text-slate-800 text-xs font-black ml-1">{store.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 font-bold">
                    <MapPin size={12} />
                    <span className="text-[11px]">{store.distance}</span>
                  </div>
                </div>

                <div className="text-left mb-6">
                  <h3 className="font-black text-slate-900 text-sm mb-1">{store.name}</h3>
                  <p className="text-slate-400 text-[11px] font-medium tracking-tight">Medicine Availability Storefront</p>
                </div>

                {/* Buttons (Exact Colors from Image) */}
                <div className="space-y-2">
                  <div className="w-full bg-[#F0FDF4] text-[#22C55E] py-2.5 rounded-[16px] text-[11px] font-black border border-[#DCFCE7] transition-all">
                    Open 24/7
                  </div>
                  <button className="w-full bg-[#E0E7FF] hover:bg-[#D1D5DB] text-[#4F46E5] py-3 rounded-[16px] text-[12px] font-black transition-all active:scale-95 shadow-sm shadow-indigo-100">
                    View Map
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyStores;