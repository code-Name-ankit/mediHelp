import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapView from './MapView';
import StoreCard from './StoreCard';

const SearchPage = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const medicine = queryParams.get("medicine");
  const userLat = parseFloat(queryParams.get("lat")) || 21.1702;
  const userLng = parseFloat(queryParams.get("lng")) || 72.8311;

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ medicine, lat: userLat, lng: userLng })
        });
        const data = await response.json();
        setStores(data);
        if (data.length > 0) setSelectedStore(data[0]);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };
    if (medicine) fetchStores();
  }, [medicine, userLat, userLng]);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 lg:pt-28 pb-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 px-4 md:px-10 lg:px-20">
        
        {/* --- Map View --- */}
        {/* Laptop par Right side, Mobile par Top par (order-1) */}
        <div className="w-full lg:flex-1 h-[300px] md:h-[450px] lg:h-[600px] order-1 lg:order-2 lg:sticky lg:top-28">
          <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl border-4 border-white relative z-0">
             <MapView 
                stores={stores} 
                selectedStore={selectedStore} 
                userLocation={{ lat: userLat, lng: userLng }} 
              />
          </div>
        </div>

        {/* --- Store List --- */}
        {/* Laptop par Left side, Mobile par Niche (order-2) */}
        <div className="w-full lg:flex-1 space-y-4 lg:space-y-6 order-2 lg:order-1 lg:max-h-[85vh] lg:overflow-y-auto lg:pr-4 custom-scrollbar">
          <div className="sticky top-0 bg-slate-50 py-2 z-10">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 italic leading-tight">
              Nearby Pharmacies <br/>
              <span className="text-blue-600 text-lg not-italic font-bold">for "{medicine}"</span>
            </h2>
          </div>
          
          {loading ? (
            <div className="flex flex-col gap-4">
               {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-200/50 animate-pulse rounded-[24px]"></div>)}
            </div>
          ) : stores.length > 0 ? (
            stores.map((s, index) => (
              <div key={index} onClick={() => setSelectedStore(s)}>
                <StoreCard store={s} isNearest={index === 0} isSelected={selectedStore?.storeName === s.storeName} />
              </div>
            ))
          ) : (
            <div className="p-10 text-center bg-white rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-400 font-bold">No stores found near you.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SearchPage; // final code for serch page 