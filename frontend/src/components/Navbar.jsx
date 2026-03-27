import React, { useState, useEffect } from 'react';
import { MapPin, Bell, User, ShoppingCart } from 'lucide-react'; // 1. ShoppingCart import kiya

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(2); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-20 py-4 ${
      isScrolled 
      ? "bg-[#1a3a5f]/80 backdrop-blur-lg shadow-lg border-b border-white/10 py-3" 
      : "bg-[#1a3a5f] py-6"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* --- Logo Section --- */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-xl shadow-lg shadow-green-500/20 group-hover:rotate-12 transition-transform">
            <div className="text-white font-bold text-xl leading-none">+</div>
          </div>
          <span className="text-2xl font-black tracking-tight text-white italic">
            Med<span className="text-green-400">Help</span>
          </span>
        </div>

        {/* --- Navigation Links --- */}
        <div className="hidden md:flex gap-10 items-center">
          {['Home', 'Features', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="relative text-sm font-semibold text-slate-200 hover:text-green-400 transition-colors group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex items-center gap-4">
          
          {/* --- Cart Icon --- */}
          <button className="relative p-2.5 text-slate-300 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-full border border-white/10 group">
            <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
            {/* Cart Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-[#1a3a5f] shadow-lg">
                {cartCount}
              </span>
            )}
          </button>

          {/* --- Notification Icon --- */}
          <button className="relative p-2.5 text-slate-300 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-full border border-white/10 group">
            <Bell size={20} className="group-hover:shake transition-transform" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#1a3a5f]"></span>
          </button>

          {/* --- Login Button --- */}
          <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 active:scale-95 ml-2">
            <User size={18} />
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;