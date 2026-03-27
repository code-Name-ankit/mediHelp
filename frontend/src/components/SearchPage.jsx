import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapView from "./MapView";
import StoreCard from "./StoreCard";
import {
  List,
  Map as MapIcon,
  SlidersHorizontal,
  X,
  Search,
  Truck,
  Clock,
  Tag
} from "lucide-react";

const SearchPage = () => {
  const [stores, setStores] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States
  const [distance, setDistance] = useState(5);
  const [filters, setFilters] = useState({
    delivery: false,
    open247: false,
    hasDiscount: false,
  });

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const medicineFromUrl = queryParams.get("medicine") || "";

  const [localSearch, setLocalSearch] = useState(medicineFromUrl);
  const navigate = useNavigate();
  const userLocation = { lat: 21.1702, lng: 72.8311 };

  // API Fetch
  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            medicine: medicineFromUrl,
            lat: userLocation.lat,
            lng: userLocation.lng,
            filters,
            maxDistance: distance
          }),
        });
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (medicineFromUrl) fetchStores();
  }, [medicineFromUrl]);

  // Sync search input with URL
  useEffect(() => {
    setLocalSearch(medicineFromUrl);
  }, [medicineFromUrl]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (localSearch.trim()) {
      setIsFilterOpen(false);
      navigate(`/search?medicine=${encodeURIComponent(localSearch)}`);
    }
  };

  const handleViewMap = (store) => {
    setSelectedStore(store);
    setViewMode("map");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Distance Slider dynamic background logic
  const getSliderBackground = () => {
    const min = 1;
    const max = 20;
    const percentage = ((distance - min) * 100) / (max - min);
    return {
      background: `linear-gradient(to right, #10b981 ${percentage}%, #e2e8f0 ${percentage}%)`
    };
  };

  const FilterContent = () => (
    <div className="space-y-6 p-1 lg:p-0">
      <div className="flex justify-between items-center lg:mb-4">
        <h2 className="text-xl lg:text-2xl font-black text-slate-900 flex items-center gap-2 italic tracking-tight">
          <SlidersHorizontal size={20} className="text-emerald-500" /> Filters
        </h2>
        <button onClick={() => setIsFilterOpen(false)} className="lg:hidden p-2 bg-slate-100 rounded-full">
          <X size={20} />
        </button>
      </div>

      
      {/* Distance Slider with Green Fill */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Distance Radius</h3>
          <span className="text-emerald-600 font-black text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            {distance} KM
          </span>
        </div>
        <div className="relative pt-2">
          <input
            type="range"
            min="1"
            max="20"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            style={getSliderBackground()}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all custom-range-slider"
          />
          <div className="flex justify-between mt-2 text-[10px] font-black text-slate-400 uppercase italic">
            <span>1 KM</span>
            <span>20 KM</span>
          </div>
        </div>
      </div>

      {/* Service Filters */}
      <div className="space-y-3 pt-6 border-t border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Store Services</h3>
        
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${filters.delivery ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              <Truck size={18} />
            </div>
            <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-500">Home Delivery</span>
          </div>
          <input 
            type="checkbox" 
            checked={filters.delivery}
            onChange={() => setFilters({...filters, delivery: !filters.delivery})}
            className="w-5 h-5 rounded-md border-slate-300 text-emerald-500 focus:ring-emerald-500" 
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${filters.open247 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              <Clock size={18} />
            </div>
            <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-500">Open 24/7</span>
          </div>
          <input 
            type="checkbox" 
            checked={filters.open247}
            onChange={() => setFilters({...filters, open247: !filters.open247})}
            className="w-5 h-5 rounded-md border-slate-300 text-emerald-500 focus:ring-emerald-500" 
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${filters.hasDiscount ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              <Tag size={18} />
            </div>
            <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-500">Offers Available</span>
          </div>
          <input 
            type="checkbox" 
            checked={filters.hasDiscount}
            onChange={() => setFilters({...filters, hasDiscount: !filters.hasDiscount})}
            className="w-5 h-5 rounded-md border-slate-300 text-emerald-500 focus:ring-emerald-500" 
          />
        </label>
      </div>

      <button 
        onClick={handleSearchSubmit}
        className="hidden lg:block w-full bg-[#0f2a47] text-white py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all mt-4"
      >
        Apply All Filters
      </button>

      {/* Slider Styling CSS */}
      <style>{`
        .custom-range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #10b981;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1500px] mx-auto">
        
        {/* Mobile View */}
        <div className="lg:hidden flex flex-col gap-3 mb-6">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[20px] py-3.5 pl-12 pr-4 text-sm font-bold focus:border-emerald-500 outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
            <button type="submit" className="bg-[#0f2a47] text-white px-6 rounded-[20px] font-bold">Go</button>
          </form>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full bg-emerald-500 text-white py-3.5 rounded-[20px] font-black flex items-center justify-center gap-2 shadow-lg italic"
          >
            <SlidersHorizontal size={18} /> Filter Results
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-28 bg-white border border-slate-100 p-7 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
              <FilterContent />
            </div>
          </aside>

          <main className="flex-1">
            <div className="hidden lg:flex justify-between items-center mb-10 border-b pb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">
                  Results for <span className="text-emerald-500">'{medicineFromUrl || "Pharmacies"}'</span>
                </h1>
                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest italic">Surat, Gujarat</p>
              </div>
              
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button onClick={() => setViewMode("list")} className={`px-10 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${viewMode === "list" ? "bg-[#0f2a47] text-white shadow-lg" : "text-slate-500"}`}>
                  <List size={18} /> List
                </button>
                <button onClick={() => setViewMode("map")} className={`px-10 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${viewMode === "map" ? "bg-[#0f2a47] text-white shadow-lg" : "text-slate-500"}`}>
                  <MapIcon size={18} /> Map
                </button>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                  [1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-[450px] bg-slate-50 animate-pulse rounded-[32px]"></div>)
                ) : stores.length > 0 ? (
                  stores.map((s, i) => <StoreCard key={i} store={s} onViewMap={handleViewMap} />)
                ) : (
                  <div className="col-span-full py-24 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold text-lg italic">No results found for your filters.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-[65vh] lg:h-[780px] relative rounded-[48px] overflow-hidden border-8 border-slate-50 shadow-2xl">
                <MapView stores={stores} selectedStore={selectedStore} userLocation={userLocation} />
              </div>
            )}
          </main>
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
            <FilterContent />
            <button
              onClick={handleSearchSubmit}
              className="w-full bg-[#0f2a47] text-white py-4 rounded-2xl font-black text-sm shadow-xl mt-8 uppercase tracking-widest"
            >
              Update Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;