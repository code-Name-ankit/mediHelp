import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- Icons Setup ---
const createIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const redIcon = createIcon('red');    // User
const greenIcon = createIcon('green'); // Nearest Store
const blueIcon = createIcon('blue');   // Others

function FocusMap({ store }) {
  const map = useMap();
  useEffect(() => {
    if (store) {
      const [lng, lat] = store.location.coordinates;
      map.flyTo([lat, lng], 16, { duration: 1.5 });
    }
  }, [store, map]);
  return null;
}

const MapView = ({ stores, selectedStore, userLocation }) => {
  return (
    <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white h-full relative z-0">
      <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <FocusMap store={selectedStore} />

        {/* User Marker (RED) */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={redIcon}>
          <Popup><b>You are here</b></Popup>
        </Marker>

        {/* Stores Markers */}
        {stores.map((s, index) => {
          const [lng, lat] = s.location.coordinates;
          return (
            <Marker 
              key={index} 
              position={[lat, lng]} 
              icon={index === 0 ? greenIcon : blueIcon}
            >
              <Popup>
                <div className="p-1">
                  <h4 className="font-bold">{s.storeName}</h4>
                  <p className="text-xs">₹{s.price} | {s.distance.toFixed(2)} km</p>
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