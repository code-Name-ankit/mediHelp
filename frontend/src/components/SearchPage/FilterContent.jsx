import React from "react";
import { MapPin, Truck, Clock, Tag } from "lucide-react";

const FilterContent = ({ distance, setDistance, filters, setFilters, getSliderBackground }) => {
  const filterOptions = [
    { id: "delivery", label: "Home Delivery", icon: Truck },
    { id: "open247", label: "24/7 Available", icon: Clock },
    { id: "hasDiscount", label: "Best Offers", icon: Tag },
  ];

  return (
    <div className="space-y-8">
      {/* Distance Slider */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={16} className="text-emerald-500" />
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest text-left">
            Search Radius
          </h3>
        </div>
        <div className="bg-slate-50/80 p-5 rounded-[32px] border border-slate-100/50 shadow-inner text-left">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase italic">Radius</span>
            <span className="text-2xl font-black text-emerald-500">
              {distance}<span className="text-xs ml-0.5 uppercase">km</span>
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

      {/* Checkbox Filters */}
      <div className="pt-8 border-t border-slate-100/60 text-left">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6">
          Quick Filters
        </h3>
        <div className="space-y-3">
          {filterOptions.map((item) => (
            <label
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${
                filters[item.id] ? "border-emerald-500 bg-emerald-50/50 shadow-sm" : "border-transparent bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={filters[item.id] ? "text-emerald-500" : "text-slate-400"} />
                <span className={`text-sm font-bold ${filters[item.id] ? "text-emerald-700" : "text-slate-600"}`}>
                  {item.label}
                </span>
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters[item.id]}
                onChange={() => setFilters({ ...filters, [item.id]: !filters[item.id] })}
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
};

export default FilterContent;