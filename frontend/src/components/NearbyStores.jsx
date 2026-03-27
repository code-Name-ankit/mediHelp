import React from 'react';
import { useNavigate } from 'react-router-dom';
import StoreCard from './StoreCard'; // Aapka dynamic StoreCard component

const NearbyStores = () => {
  const navigate = useNavigate();

  // Demo Data (Ideally ye API se aayega, par yahan humne structure wahi rakha hai jo aapke StoreCard ko chahiye)
  const stores = [
    {
      id: 1,
      storeName: "Smith's Pharmacy",
      distance: 0.8,
      rating: 4.5,
      medicine: "Paracetamol",
      image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=500",
    },
    {
      id: 2,
      storeName: "Local Drug Store",
      distance: 1.2,
      rating: 4.2,
      medicine: "Ibuprofen",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=500",
    },
    {
      id: 3,
      storeName: "MediCare Center",
      distance: 2.5,
      rating: 4.8,
      medicine: "Cough Syrup",
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500",
    }
  ];

  const handleViewOnMap = (store) => {
    // User ko Search Page par bhejta hai aur state mein map view open rakhta hai
    // Aapke SearchPage logic ke mutabik hum query params use kar sakte hain
    navigate(`/search?medicine=${store.medicine}&view=map`);
  };

  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-emerald-500 text-xs font-black uppercase tracking-[0.3em] mb-3">Nearby Stores Preview</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Medicine Availability and Local Stores
          </h2>
        </div>

        {/* Dynamic Stores Grid using your StoreCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stores.map((store) => (
            <StoreCard 
              key={store.id} 
              store={store} 
              onViewMap={() => handleViewOnMap(store)} 
            />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => navigate('/search')}
            className="bg-[#0f2a47] text-white px-10 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          >
            Explore All Stores
          </button>
        </div>
      </div>
    </section>
  );
};

export default NearbyStores;