import React, { useEffect, useState } from "react";
import LabCard from "./LabCard";
import LabMapView from "./LabMapView";
import LabFilter from "./LabFilter";

const LabPage = () => {
  const [labs, setLabs] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [selectedLab, setSelectedLab] = useState(null);
  const [distance, setDistance] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const userLocation = { lat: 21.1702, lng: 72.8311 };

  const fetchLabs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/lab/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: userLocation.lat,
          lng: userLocation.lng,
          maxDistance: distance,
        }),
      });
      const data = await res.json();
      setLabs(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, [distance]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white font-sans text-[#1A1A1A] mt-16 md:mt-24 overflow-hidden">
      
      {/* --- Mobile Header & Toggle --- */}
      <div className="md:hidden p-4 border-b border-[#EFEFEF] flex justify-between items-center bg-white sticky top-0 z-30">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 font-bold text-sm bg-[#112440] text-white px-5 py-2.5 rounded-xl shadow-lg active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {isFilterOpen ? "Hide Filters" : "Filters"}
        </button>
        <span className="text-[10px] font-black text-[#112440] bg-[#39D5A3] px-3 py-1.5 rounded-full uppercase">
          {distance} KM Radius
        </span>
      </div>

      {/* --- Sidebar / Mobile Drawer --- */}
      <div className={`
        ${isFilterOpen ? "fixed inset-0 top-[125px] z-40 bg-white px-6 pb-20" : "hidden"} 
        md:relative md:top-0 md:block md:w-[340px] border-r border-[#EFEFEF] p-6 md:p-8 flex flex-col space-y-8 bg-white overflow-y-auto
      `}>
        {/* Search Bar */}
        <div className="relative pt-4 md:pt-0">
          <input 
            type="text" 
            placeholder="Search lab name..." 
            className="w-full h-[52px] pl-12 pr-4 bg-[#F8F8F8] border border-[#EFEFEF] rounded-2xl text-sm outline-none focus:border-[#39D5A3] transition-all"
          />
          <div className="absolute left-4 top-[65%] md:top-1/2 -translate-y-1/2 text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
        </div>

        <LabFilter distance={distance} setDistance={setDistance} />
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 p-5 md:p-10 overflow-y-auto bg-white">

        {/* Matches Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Matches for <span className="text-[#39D5A3]">"xyz"</span>
          </h1>

          {/* List/Map Toggles */}
          <div className="flex w-full sm:w-auto gap-1 p-1 bg-[#F8F8F8] rounded-2xl border border-[#EFEFEF] shadow-inner">
            <button
              onClick={() => setViewMode("list")}
              className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                viewMode === "list" ? "bg-[#112440] text-white shadow-lg" : "text-[#999999]"
              }`}
            >
              LIST
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                viewMode === "map" ? "bg-[#112440] text-white shadow-lg" : "text-[#999999]"
              }`}
            >
              MAP
            </button>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#39D5A3]"></div>
             <p className="mt-4 text-gray-400 font-medium">Updating list...</p>
          </div>
        ) : labs.length > 0 ? (
          viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {labs.map((lab) => (
                <LabCard
                  key={lab._id}
                  lab={lab}
                  onViewMap={() => {
                    setSelectedLab(lab);
                    setViewMode("map");
                    if (window.innerWidth < 768) setIsFilterOpen(false);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="h-[60vh] md:h-[calc(100vh-250px)] rounded-3xl overflow-hidden border border-[#EFEFEF] shadow-2xl">
              <LabMapView labs={labs} selectedLab={selectedLab} userLocation={userLocation} />
            </div>
          )
        ) : (
          <div className="text-center mt-20">
            <p className="text-xl text-gray-400 font-medium italic">No results found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabPage;