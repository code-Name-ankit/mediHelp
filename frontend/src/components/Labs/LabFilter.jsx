import React from "react";

const LabFilter = ({ distance, setDistance }) => {
  return (
    <div className="flex flex-col space-y-6 md:space-y-10 pb-10">
      
      {/* --- Search Radius Section --- */}
      <div className="bg-[#F8F8F8] p-5 md:p-6 rounded-[2rem] border border-[#EFEFEF]">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
          Adjust Distance
        </h3>

        <div className="relative pt-2 pb-2">
          {/* Custom Slider */}
          <input
            type="range"
            min="1"
            max="50"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#39D5A3]"
            style={{
              background: `linear-gradient(to right, #39D5A3 0%, #39D5A3 ${(distance / 50) * 100}%, #E5E7EB ${(distance / 50) * 100}%, #E5E7EB 100%)`
            }}
          />
          
          <div className="flex justify-between mt-6 items-end">
            <span className="text-[10px] font-bold text-gray-300 italic uppercase">Range</span>
            <span className="text-2xl font-black text-[#112440]">
              {distance} <span className="text-sm font-bold text-[#39D5A3]">KM</span>
            </span>
          </div>
        </div>
      </div>

      {/* --- Quick Filters Section --- */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 ml-2">
          Quick Filters
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: "Home Delivery", icon: "🚚" },
            { label: "24/7 Available", icon: "🕒" },
            { label: "Best Offers", icon: "🏷️" }
          ].map((filter, index) => (
            <label 
              key={index}
              className="flex items-center justify-between p-4 bg-[#F8F8F8] active:bg-white active:shadow-md border border-transparent rounded-2xl cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg group-active:scale-110 transition-transform">
                  {filter.icon}
                </span>
                <span className="text-sm font-bold text-[#112440]">
                  {filter.label}
                </span>
              </div>
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded-md border-gray-300 text-[#39D5A3] focus:ring-[#39D5A3]"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabFilter;