import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Dusri files se components ko yahan laya ja raha hai
import FilterContent from "./FilterContent";
import MobileFilterDrawer from "./MobileFilterDrawer";
import MapView from "../MapView"; // Inka path check kar lena aapke folder ke hisaab se
import StoreCard from "../StoreCard";
import "./SearchPage.css";

import { List, Map as MapIcon, SlidersHorizontal, Search, Sparkles, ArrowRight } from "lucide-react";

const SearchPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const medicineFromUrl = queryParams.get("medicine") || "";

  // Saare States
  const [stores, setStores] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(medicineFromUrl);
  const [distance, setDistance] = useState(5);
  const [filters, setFilters] = useState({ delivery: false, open247: false, hasDiscount: false });

  const userLocation = { lat: 21.1702, lng: 72.8311 };

  // API Fetch Function
  const fetchStores = useCallback(async () => {
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
          maxDistance: distance,
        }),
      });
      const data = await response.json();
      setStores(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  }, [medicineFromUrl, filters, distance]);

  useEffect(() => { fetchStores(); }, [fetchStores]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (localSearch.trim()) {
      setIsFilterOpen(false);
      navigate(`/search?medicine=${encodeURIComponent(localSearch)}`);
    }
  };

  const getSliderBackground = () => {
    const percentage = ((distance - 1) * 100) / 19;
    return { background: `linear-gradient(to right, #10b981 ${percentage}%, #f1f5f9 ${percentage}%)` };
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] overflow-hidden flex flex-col pt-24 relative z-10 text-slate-900">
      <div className="max-w-[1600px] w-full mx-auto flex flex-1 overflow-hidden px-4 md:px-8 lg:px-12 pb-6 gap-8">
        
        {/* LAPTOP SIDEBAR */}
        <aside className="hidden lg:block w-80 shrink-0 h-full overflow-y-auto pr-2 no-scrollbar">
          <div className="space-y-6 pb-10">
            <div className="relative group mt-10">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-5 text-slate-400 z-10" size={18} />
                <input
                  type="text" placeholder="Search medicine..." value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-[24px] py-5 pl-12 pr-16 text-sm font-bold shadow-sm focus:border-emerald-500 outline-none transition-all"
                />
                <button type="submit" className="absolute right-2 bg-[#0f2a47] hover:bg-slate-800 text-white p-2.5 rounded-[18px] transition-all">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
            
            {/* Filter Component Laptop ke liye */}
            <div className="bg-white/90 backdrop-blur-xl border border-white p-8 rounded-[40px] shadow-sm">
              <FilterContent 
                distance={distance} setDistance={setDistance} 
                filters={filters} setFilters={setFilters} 
                getSliderBackground={getSliderBackground} 
              />
            </div>
          </div>
        </aside>

        {/* MAIN RESULTS AREA */}
        <main className="flex-1 h-full overflow-y-auto custom-scrollbar relative px-1">
          <header className="sticky top-0 bg-[#f8fafc]/95 backdrop-blur-md z-20 py-4 mb-6">
            <div className="flex flex-col gap-5">
              
              {/* MOBILE TOP ROW (Search + Filter) */}
              <div className="flex items-center gap-3 lg:hidden">
                <form onSubmit={handleSearchSubmit} className="relative flex-1 flex items-center">
                  <Search className="absolute left-4 text-slate-400 z-10" size={18} />
                  <input
                    type="text" placeholder="Search..." value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-11 pr-14 text-sm font-bold shadow-sm focus:border-emerald-500 outline-none"
                  />
                  <button type="submit" className="absolute right-2 bg-[#0f2a47] text-white p-2 rounded-xl">
                    <ArrowRight size={20} />
                  </button>
                </form>
                <button onClick={() => setIsFilterOpen(true)} className="bg-white border border-slate-200 text-[#0f2a47] p-4 rounded-2xl shadow-sm">
                  <SlidersHorizontal size={22} className="text-emerald-500" />
                </button>
              </div>

              {/* TITLE & VIEW TOGGLE */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h1 className="text-2xl lg:text-5xl font-black tracking-tighter">
                  Matches for <span className="text-emerald-500 italic">"{medicineFromUrl || "All"}"</span>
                </h1>

                <div className="flex bg-white p-1.5 rounded-[24px] shadow-xl border border-white self-start">
                  <button onClick={() => setViewMode("list")} className={`px-8 py-3.5 rounded-[20px] font-black text-[10px] uppercase tracking-widest ${viewMode === "list" ? "bg-[#0f2a47] text-white" : "text-slate-400"}`}>
                    <List size={16} className="inline mr-2" /> List
                  </button>
                  <button onClick={() => setViewMode("map")} className={`px-8 py-3.5 rounded-[20px] font-black text-[10px] uppercase tracking-widest ${viewMode === "map" ? "bg-[#0f2a47] text-white" : "text-slate-400"}`}>
                    <MapIcon size={16} className="inline mr-2" /> Map
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* STORE CARDS OR MAP */}
          <div className="relative z-10 pb-10">
            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-1">
                 {[1, 2, 3].map((i) => <div key={i} className="h-[400px] bg-white rounded-[40px] border border-slate-50 animate-pulse" />)}
               </div>
            ) : stores.length > 0 ? (
              viewMode === "list" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {stores.map((s, i) => <StoreCard key={i} store={s} onViewMap={() => { setSelectedStore(s); setViewMode("map"); }} />)}
                </div>
              ) : (
                <div className="w-full h-[calc(100vh-320px)] rounded-[40px] overflow-hidden border-[12px] border-white shadow-2xl relative">
                  <MapView stores={stores} selectedStore={selectedStore} userLocation={userLocation} />
                </div>
              )
            ) : (
              <div className="py-32 text-center bg-white rounded-[50px] border border-slate-50 shadow-sm mx-1">
                <p className="text-slate-400 font-black text-xl italic px-4">No results found.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MOBILE DRAWER */}
      <MobileFilterDrawer 
        isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}
        distance={distance} setDistance={setDistance}
        filters={filters} setFilters={setFilters}
        getSliderBackground={getSliderBackground}
      />
    </div>
  );
};

export default SearchPage;