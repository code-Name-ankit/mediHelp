import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Star, Clock, MapPin, Navigation } from 'lucide-react';

// --- Internal CSS Injection (Popups ko fix karne ke liye) ---
const injectStyles = () => {
  if (document.getElementById('leaflet-custom-styles')) return;
  const style = document.createElement('style');
  style.id = 'leaflet-custom-styles';
  style.innerHTML = `
    .leaflet-popup-content-wrapper { 
      padding: 0 !important; 
      overflow: hidden !important; 
      border-radius: 24px !important; 
      box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important;
    }
    .leaflet-popup-content { margin: 0 !important; width: 280px !important; }
    .leaflet-popup-tip-container { display: none !important; }
  `;
  document.head.appendChild(style);
};

// --- AB DOT ICONS NAHI, LOCATION PINS CHAHIYE ---
// Hum standard Leaflet icon use karenge, bas unhe color de denge
const createMarkerIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], // Pin ka size
  iconAnchor: [12, 41], // Pin ki tip location
  popupAnchor: [1, -34], // Popup kahan khulega
  shadowSize: [41, 41]
});

// Create different colored icons
const redIcon = createMarkerIcon('red');    // User Location
const greenIcon = createMarkerIcon('green'); // Nearest Store
const blueIcon = createMarkerIcon('blue');   // Others

function MapController({ store, userLocation }) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => { map.invalidateSize(); }, 300);
    if (store) {
      const [lng, lat] = store.location.coordinates;
      map.flyTo([lat, lng], 17, { duration: 1.5 });
    } else if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [store, map, userLocation]);
  return null;
}

const MapView = ({ stores, selectedStore, userLocation }) => {
  useEffect(() => {
    injectStyles(); // CSS load hote hi inject ho jayegi
  }, []);

  if (!userLocation?.lat) return null;

  return (
    <div className="w-full h-full relative rounded-[32px] overflow-hidden">
      <MapContainer 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={13} 
        zoomControl={false}
        style={{ height: "100%", width: "100%", background: "#f8fafc" }}
        className="w-full h-full"
      >
        {/* Modern Map Style (CartoDB Voyager) */}
        <TileLayer 
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" 
        />
        
        <MapController store={selectedStore} userLocation={userLocation} />

        {/* 🔴 User Location Marker (Red Pin) */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={redIcon}>
          <Popup><div className="p-3 font-bold text-center text-xs">You</div></Popup>
        </Marker>

        {/* Stores Markers (Green or Blue Pins) */}
        {stores.map((s, index) => {
          const [lng, lat] = s.location.coordinates;
          const isNearest = index === 0; // Nearest store color change
          return (
            <Marker key={index} position={[lat, lng]} icon={isNearest ? greenIcon : blueIcon}>
              <Popup>
                {/* --- Popup UI --- */}
                <div className="w-full bg-white flex flex-col font-sans">
                  {/* Image */}
                  <div className="relative h-28 w-full">
                    <img 
                      src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400" 
                      className="w-full h-full object-cover" alt="pharmacy" 
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <Clock size={10} /> OPEN 24/7
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h4 className="font-black text-slate-900 text-sm leading-tight tracking-tight">{s.storeName}</h4>
                        <div className="flex items-center gap-1 text-slate-400 text-[10px] mt-1 font-bold italic">
                          <MapPin size={10} /> {s.distance.toFixed(1)} km away
                        </div>
                      </div>
                      <div className="text-emerald-600 font-black text-sm whitespace-nowrap">₹{s.price}</div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < 4 ? "currentColor" : "none"} />)}
                      <span className="text-slate-300 text-[10px] font-bold ml-1">4.8</span>
                    </div>

                    {/* Button */}
                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-emerald-100 flex items-center justify-center gap-1.5">
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;