import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles } from 'lucide-react';
import doctorImg from '../assets/Doctor2.png';

const Hero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return alert("Please enter a medicine name");

    // Browser se location lena
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Search page par redirect karna parameters ke saath
        navigate(`/search?medicine=${query}&lat=${latitude}&lng=${longitude}`);
      },
      () => {
        alert("Please enable location to find nearby stores.");
      }
    );
  };

  return (
    <section className="relative bg-[#0f2a47] text-white pb-24 pt-16 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Sparkles size={16} className="text-green-400" />
            <span className="text-sm font-medium text-slate-200">Trusted by 10k+ users in Surat</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
            Find Medicines <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              Near You Instantly
            </span>
          </h1>

          <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-xl p-6 rounded-[32px] border border-white/20 space-y-4 max-w-xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Medicine Name" 
                  className="w-full bg-slate-900/50 text-white py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 border border-white/5" 
                />
              </div>
              <div className="relative group flex items-center bg-slate-900/50 text-slate-400 py-4 px-4 rounded-2xl border border-white/5">
                <MapPin className="mr-2" size={20} />
                <span className="text-sm italic">Detecting your location...</span>
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95">
              Search Now
            </button>
          </form>
        </div>

        <div className="flex-1 relative">
          <img src={doctorImg} alt="Doctor" className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(34,197,94,0.3)]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;