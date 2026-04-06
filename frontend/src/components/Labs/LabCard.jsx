import React from "react";
import { useNavigate } from "react-router-dom";

const LabCard = ({ lab, onViewMap }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-[2.5rem] border border-[#EFEFEF] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden">
      
      {/* --- Header Section (Replacing Image with a simple Icon/Gradient) --- */}
      <div className="h-24 bg-gradient-to-br from-[#112440] to-[#1d3a66] relative p-6 flex items-center justify-between">
        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#39D5A3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.337a4 4 0 01-2.58.345l-2.091-.418a2 2 0 01-1.022-.547m0 0l-2.102-3.023m2.102 3.023a2 2 0 001.242.721l2.495.499a.75.75 0 01.375.125l.675.337a1 1 0 00.645.086l2.091-.418a2 2 0 011.242-.721L19.428 15.428" />
           </svg>
        </div>
        
        {/* Status Badge */}
        <div className="bg-[#39D5A3] text-[#112440] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
           <div className="w-1.5 h-1.5 bg-[#112440] rounded-full animate-pulse"></div>
           <span className="text-[9px] font-black uppercase tracking-widest">Open 24/7</span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-8 flex flex-col flex-1">
        
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-black text-[#112440] leading-tight truncate pr-4">
            {lab.labName}
          </h3>
          <span className="text-sm font-black text-[#112440] whitespace-nowrap bg-[#F8F8F8] px-3 py-1 rounded-lg border border-[#EFEFEF]">
            {(lab.distance / 1000).toFixed(1)} <span className="text-[10px] text-gray-400 font-bold ml-0.5">KM</span>
          </span>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-1 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <span key={s} className="text-[#39D5A3] text-sm">★</span>
          ))}
          <span className="text-gray-200 text-sm">★</span>
          <span className="text-[11px] font-bold text-gray-400 ml-2">4.5 Rating</span>
        </div>

        {/* Tests Details (Screenshot Match) */}
        <div className="mb-10">
           <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">
             Top Services
           </p>
           <ul className="space-y-3">
              <li className="flex items-center justify-between text-xs font-bold text-[#112440]">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#39D5A3] rounded-full"></span>
                    Advanced Diagnostics
                </div>
                <span className="text-[9px] text-[#39D5A3] uppercase font-black bg-[#E6F9F3] px-2 py-0.5 rounded-md italic">Available</span>
              </li>
              <li className="flex items-center justify-between text-xs font-bold text-[#112440]">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    Emergency Reports
                </div>
                <span className="text-[9px] text-orange-400 uppercase font-black bg-orange-50 px-2 py-0.5 rounded-md italic">2 Hr Result</span>
              </li>
           </ul>
        </div>

        {/* --- Buttons Section --- */}
        <div className="mt-auto flex flex-col gap-3">
          <button
            onClick={() => navigate(`/lab/${lab._id}`)}
            className="w-full bg-[#112440] text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#39D5A3] hover:text-[#112440] transition-all shadow-xl active:scale-95"
          >
            Explore Tests
          </button>

          <button
            onClick={onViewMap}
            className="w-full text-gray-400 py-2 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:text-[#112440] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Show Route on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabCard;