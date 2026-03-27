import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapView from './MapView';
import StoreCard from './StoreCard';
import { List, Map as MapIcon, SlidersHorizontal, ChevronRight } from 'lucide-react';

const SearchPage = () => {
  const [stores, setStores] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [selectedStore, setSelectedStore] = useState(null); // Map focus ke liye
  const [loading, setLoading] = useState(true);
  
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const medicine = queryParams.get("medicine");
  
  // Default Surat Coordinates
  const userLocation = { lat: 21.1702, lng: 72.8311 };

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            medicine, 
            lat: userLocation.lat, 
            lng: userLocation.lng 
          })
        });
        const data = await response.json();
        setStores(data);
      } catch (error) { 
        console.error("Fetch error:", error); 
      } finally { 
        setLoading(false); 
      }
    };
    if (medicine) fetchStores();
  }, [medicine]);

  // --- View on Map Logic ---
  const handleViewMap = (store) => {
    setSelectedStore(store); // Specific store set karo
    setViewMode('map');       // View change karo
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-10">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 mb-6 flex items-center gap-2 text-sm text-slate-500 font-medium">
        <span>Home</span> <ChevronRight size={14} /> 
        <span className="text-slate-900">Results for '{medicine}'</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row gap-8">
        
        {/* --- LEFT SIDEBAR: FILTERS --- */}
        <div className="w-full lg:w-64 space-y-8">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <SlidersHorizontal size={20} /> Filters
          </h2>
          
          {/* Distance Filter */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">Distance Range</h3>
            <input type="range" min="0" max="10" className="w-full accent-emerald-500 cursor-pointer" />
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
              <span>0 km</span><span>10 km</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800">Rating</h3>
            {[5, 4, 3].map(star => (
              <label key={star} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" />
                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{star} Stars</span>
              </label>
            ))}
          </div>

          {/* Availability Toggle */}
          <div className="space-y-4 pt-4 border-t">
             <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Open Now</span>
                <button className="w-10 h-5 bg-emerald-500 rounded-full relative transition-colors">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </button>
             </div>
             <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">24/7 Service</span>
                <button className="w-10 h-5 bg-slate-200 rounded-full relative transition-colors">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </button>
             </div>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl font-black text-slate-900">
              Nearby Results for '{medicine}' in Surat
            </h1>
            
            {/* View Toggles (Ola Style) */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-sm">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-black transition-all ${viewMode === 'list' ? 'bg-[#0f2a47] text-white shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <List size={16} /> List
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-black transition-all ${viewMode === 'map' ? 'bg-[#0f2a47] text-white shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <MapIcon size={16} /> Map
              </button>
            </div>
          </div>

          {/* Render List or Map */}
          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {loading ? (
                [1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-[450px] bg-slate-100 animate-pulse rounded-[32px] border border-slate-50"></div>
                ))
              ) : stores.length > 0 ? (
                stores.map((s, i) => (
                  <StoreCard 
                    key={i} 
                    store={s} 
                    onViewMap={handleViewMap} // Function pass ho raha hai
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold text-lg">No stores found matching your search.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-[600px] lg:h-[750px] relative rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-2xl animate-in zoom-in duration-500">
              <MapView 
                stores={stores} 
                selectedStore={selectedStore} // Map ko batao kaunsa focus karna hai
                userLocation={userLocation} 
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SearchPage;