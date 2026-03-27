import React from "react";
import { X } from "lucide-react";
import FilterContent from "./FilterContent";

const MobileFilterDrawer = ({ isOpen, onClose, ...filterProps }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] shadow-2xl p-8 pb-12 animate-in slide-in-from-bottom duration-500">
        <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-10" />
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black italic tracking-tight text-left">Refine Search</h2>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-slate-400">
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
          <FilterContent {...filterProps} />
        </div>
        <button
          onClick={onClose}
          className="w-full bg-emerald-500 text-white py-5 rounded-[24px] font-black mt-10 shadow-lg shadow-emerald-100 uppercase tracking-widest text-xs"
        >
          Show Results
        </button>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;