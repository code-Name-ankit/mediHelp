import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LabMapView.css";

// Custom Blue Pin Icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png", // Blue pin icon
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -45],
});

const MapController = ({ selectedLab }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedLab?.location?.coordinates) {
      const [lng, lat] = selectedLab.location.coordinates;
      map.flyTo([lat, lng], 15, { duration: 1.5 });
    }
  }, [selectedLab, map]);
  return null;
};

const LabMapView = ({ labs, selectedLab, userLocation }) => {
  return (
    <div className="h-full w-full rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl relative">
      
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" 
          attribution='&copy; CARTO'
        />

        <MapController selectedLab={selectedLab} />

        {labs.map((lab) => {
          if (!lab.location?.coordinates) return null;
          const [lng, lat] = lab.location.coordinates;

          return (
            <Marker key={lab._id} position={[lat, lng]} icon={customIcon}>
              <Popup className="custom-popup" autoPan={true}>
                {/* --- CUSTOM DESIGN CARD START --- */}
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 w-[240px]">
                  {/* Lab Image Section */}
                  <div className="relative h-24 w-full bg-gray-200">
                    <img 
                      src={lab.image || "https://images.unsplash.com/photo-1579152276503-6058097d9165?auto=format&fit=crop&q=80&w=400"} 
                      alt={lab.labName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#39D5A3] text-white text-[8px] font-black px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-tighter">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      Open 24/7
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-[#112440] text-sm leading-tight max-w-[120px]">
                        {lab.labName}
                      </h3>
                      <span className="text-[#39D5A3] font-black text-sm">
                        ₹55
                      </span>
                    </div>

                    <p className="text-[10px] text-gray-400 font-bold mt-1 flex items-center gap-1 uppercase tracking-tight">
                      <MapPin size={10} /> 3.7 km away
                    </p>

                    <div className="flex items-center gap-1 mt-2 mb-4">
                      {[1, 2, 3, 4].map((s) => (
                        <span key={s} className="text-yellow-400 text-[10px]">★</span>
                      ))}
                      <span className="text-gray-300 text-[10px]">★</span>
                      <span className="text-gray-400 text-[10px] font-bold ml-1">4.8</span>
                    </div>

                    <button className="w-full bg-[#39D5A3] hover:bg-[#2fb98d] text-white text-[10px] py-3 rounded-xl font-black uppercase tracking-[0.1em] transition-all active:scale-95 shadow-lg shadow-[#39D5A3]/30">
                      View Details
                    </button>
                  </div>
                </div>
                {/* --- CUSTOM DESIGN CARD END --- */}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Stats Overlay */}
      <div className="absolute top-6 left-6 z-[1000] bg-white/80 backdrop-blur-md px-5 py-2 rounded-2xl shadow-xl border border-white/50">
          <p className="text-[10px] font-black text-[#112440] uppercase tracking-widest">
            {labs.length} Matches Found
          </p>
      </div>
    </div>
  );
};

// Helper icon component (Agar Lucide use kar rahe hain)
const MapPin = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export default LabMapView;