import React, { useEffect, useState, useCallback } from "react";
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
  Tag,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const SearchPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const medicineFromUrl = queryParams.get("medicine") || "";

  const [stores, setStores] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(medicineFromUrl);

  const [distance, setDistance] = useState(5);
  const [filters, setFilters] = useState({
    delivery: false,
    open247: false,
    hasDiscount: false,
  });

  const userLocation = { lat: 21.1702, lng: 72.8311 };

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

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

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

  const getSliderBackground = () => {
    const percentage = ((distance - 1) * 100) / 19;
    return {
      background: `linear-gradient(to right, #10b981 ${percentage}%, #f1f5f9 ${percentage}%)`,
    };
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={16} className="text-emerald-500" />
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest text-left">
            Search Radius
          </h3>
        </div>
        <div className="bg-slate-50/80 p-5 rounded-[32px] border border-slate-100/50 shadow-inner text-left">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase italic">
              Radius
            </span>
            <span className="text-2xl font-black text-emerald-500">
              {distance}
              <span className="text-xs ml-0.5 uppercase">km</span>
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            style={getSliderBackground()}
            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer custom-range-slider transition-all"
          />
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100/60 text-left">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6 text-left">
          Quick Filters
        </h3>
        <div className="space-y-3">
          {[
            { id: "delivery", label: "Home Delivery", icon: Truck },
            { id: "open247", label: "24/7 Available", icon: Clock },
            { id: "hasDiscount", label: "Best Offers", icon: Tag },
          ].map((item) => (
            <label
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${filters[item.id] ? "border-emerald-500 bg-emerald-50/50 shadow-sm" : "border-transparent bg-slate-50 hover:bg-slate-100"}`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={18}
                  className={
                    filters[item.id] ? "text-emerald-500" : "text-slate-400"
                  }
                />
                <span
                  className={`text-sm font-bold ${filters[item.id] ? "text-emerald-700" : "text-slate-600"}`}
                >
                  {item.label}
                </span>
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters[item.id]}
                onChange={() =>
                  setFilters({ ...filters, [item.id]: !filters[item.id] })
                }
              />
              {filters[item.id] && (
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse" />
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#f8fafc] overflow-hidden flex flex-col pt-24 relative z-10 text-slate-900">
      <div className="max-w-[1600px] w-full mx-auto flex flex-1 overflow-hidden px-4 md:px-8 lg:px-12 pb-6 gap-8">
        {/* SIDEBAR (LAPTOP) */}
        <aside className="hidden lg:block w-80 shrink-0 h-full overflow-y-auto pr-2 no-scrollbar">
          <div className="space-y-6 pb-10">
            <div className="relative group mt-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-[28px] blur opacity-10 group-hover:opacity-25 transition duration-500"></div>
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  placeholder="Search medicine..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-[24px] py-5 pl-12 pr-16 text-sm font-bold shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                />
                <Search
                  className="absolute left-5 text-emerald-500"
                  size={18}
                />
                <button
                  type="submit"
                  className="absolute right-2 bg-[#0f2a47] hover:bg-slate-800 text-white p-2.5 rounded-[18px] transition-all active:scale-95 shadow-lg"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
            <div className="bg-white/90 backdrop-blur-xl border border-white p-8 rounded-[40px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.03)]">
              <FilterContent />
            </div>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-1 h-full overflow-y-auto custom-scrollbar relative">
          <header className="sticky top-0 bg-[#f8fafc]/95 backdrop-blur-md z-20 py-4 mb-6">
            <div className="flex flex-col gap-5">
              {/* MOBILE TOP LINE: SEARCH (With button inside) + FILTER BUTTON */}
              <div className="flex items-center gap-3 lg:hidden">
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative flex-1 flex items-center"
                >
                  <input
                    type="text"
                    placeholder="Search medicine..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-11 pr-14 text-sm font-bold shadow-sm focus:border-emerald-500 outline-none transition-all"
                  />
                  <Search
                    className="absolute left-4 text-slate-400"
                    size={18}
                  />

                  {/* SEARCH BUTTON INSIDE INPUT */}
                  <button
                    type="submit"
                    className="absolute right-2 bg-[#0f2a47] text-white p-2 rounded-xl active:scale-90 transition-transform"
                  >
                    <ArrowRight size={20} />
                  </button>
                </form>

                {/* COMPACT FILTER BUTTON ADJACENT TO SEARCH */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="bg-white border border-slate-200 text-[#0f2a47] p-4 rounded-2xl shadow-sm active:scale-95 transition-all"
                >
                  <SlidersHorizontal size={22} className="text-emerald-500" />
                </button>
              </div>

              {/* TITLE & VIEW SWITCHER */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-2xl lg:text-5xl font-black tracking-tighter leading-none">
                    Matches for{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent italic">
                      "{medicineFromUrl || "All Stores"}"
                    </span>
                  </h1>
                </div>

                <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-[24px] shadow-xl border border-white self-start">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-8 py-3.5 rounded-[20px] font-black text-[10px] flex items-center gap-3 transition-all duration-500 uppercase tracking-widest ${viewMode === "list" ? "bg-[#0f2a47] text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"}`}
                  >
                    <List size={16} /> List
                  </button>
                  <button
                    onClick={() => setViewMode("map")}
                    className={`px-8 py-3.5 rounded-[20px] font-black text-[10px] flex items-center gap-3 transition-all duration-500 uppercase tracking-widest ${viewMode === "map" ? "bg-[#0f2a47] text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"}`}
                  >
                    <MapIcon size={16} /> Map
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* STORE LISTING GRID */}
          <div className="relative z-10 pb-10 px-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-[400px] bg-white rounded-[40px] border border-slate-50 animate-pulse"
                  />
                ))}
              </div>
            ) : stores.length > 0 ? (
              viewMode === "list" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {stores.map((s, i) => (
                    <StoreCard
                      key={i}
                      store={s}
                      onViewMap={() => {
                        setSelectedStore(s);
                        setViewMode("map");
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full h-[calc(100vh-280px)] rounded-[40px] overflow-hidden border-[12px] border-white shadow-2xl relative">
                  <MapView
                    stores={stores}
                    selectedStore={selectedStore}
                    userLocation={userLocation}
                  />
                </div>
              )
            ) : (
              <div className="py-32 text-center bg-white rounded-[50px] border border-slate-50 shadow-sm">
                <p className="text-slate-400 font-black text-xl italic px-4">
                  No results found for your filters.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM SHEET DRAWER */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] shadow-2xl p-8 pb-12 animate-in slide-in-from-bottom duration-500">
            <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-10" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black italic tracking-tight text-left">
                Refine Search
              </h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 bg-slate-50 rounded-full text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
              <FilterContent />
            </div>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-emerald-500 text-white py-5 rounded-[24px] font-black mt-10 shadow-lg shadow-emerald-100 uppercase tracking-widest text-xs"
            >
              Show Results
            </button>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-range-slider::-webkit-slider-thumb {
          appearance: none; height: 18px; width: 18px; border-radius: 50%;
          background: #ffffff; border: 4px solid #10b981; cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
