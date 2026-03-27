import React, { useState, useEffect } from 'react';
import { Bell, User, ShoppingCart, Pill, Menu, X } from 'lucide-react'; // Menu aur X icons add kiye
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [cartCount, setCartCount] = useState(2); 
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Medicines', path: '/search', icon: true },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

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
      ? "bg-[#1a3a5f]/90 backdrop-blur-lg shadow-lg border-b border-white/10 py-3" 
      : "bg-[#1a3a5f] py-6"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* --- Left: Hamburger Menu (Mobile Only) --- */}
        <button 
          className="lg:hidden p-2 text-white bg-white/10 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* --- Logo Section --- */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
            <div className="text-white font-bold text-xl leading-none">+</div>
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight text-white italic">
            Med<span className="text-green-400">Help</span>
          </span>
        </Link>

        {/* --- Desktop Navigation Links --- */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`relative text-sm font-semibold transition-colors group flex items-center gap-1.5 ${
                item.name === 'Medicines' ? 'text-green-400' : 'text-slate-200 hover:text-green-400'
              }`}
            >
              {item.icon && <Pill size={14} />}
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* --- Right: Action Buttons --- */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => navigate('/checkout')}
            className="relative p-2 md:p-2.5 text-slate-300 hover:text-white transition-all bg-white/5 rounded-full border border-white/10 group"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-emerald-500 text-white text-[8px] md:text-[10px] font-black flex items-center justify-center rounded-full border-2 border-[#1a3a5f]">
                {cartCount}
              </span>
            )}
          </button>

          <button className="hidden md:flex relative p-2.5 text-slate-300 hover:text-white bg-white/5 rounded-full border border-white/10">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#1a3a5f]"></span>
          </button>

          <button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-sm md:text-base shadow-lg active:scale-95"
          >
            <span className="md:hidden"><User size={18} /></span>
            <span className="hidden md:inline">Login</span>
          </button>
        </div>
      </div>

     {/* --- Mobile Sidebar Overlay --- */}
<div className={`lg:hidden fixed inset-0 z-[100] transition-all duration-500 ${
  isMenuOpen ? "visible" : "invisible"
}`}>
  {/* Black Overlay Background */}
  <div 
    className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${
      isMenuOpen ? "opacity-100" : "opacity-0"
    }`} 
    onClick={() => setIsMenuOpen(false)} 
  />
  
  {/* Sidebar Content */}
  <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-[#1a3a5f] shadow-2xl transition-transform duration-500 transform ${
    isMenuOpen ? "translate-x-0" : "-translate-x-full"
  }`}>
    
    {/* --- Sidebar Header with Close Button --- */}
    <div className="flex items-center justify-between p-6 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="bg-green-400 p-1.5 rounded-lg text-[#1a3a5f] font-bold">+</div >
        <span className="text-white font-black italic">MedHelp</span>
      </div>
      
      {/* CLOSE BUTTON (X) */}
      <button 
        onClick={() => setIsMenuOpen(false)}
        className="p-2 text-slate-300 hover:text-white bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all"
      >
        <X size={22} />
      </button>
    </div>

    {/* Sidebar Links */}
    <div className="flex flex-col gap-1 p-4">
      {navLinks.map((item) => (
        <Link 
          key={item.name} 
          to={item.path} 
          onClick={() => setIsMenuOpen(false)}
          className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
            item.name === 'Medicines' 
            ? 'bg-green-400/10 text-green-400' 
            : 'text-slate-200 hover:bg-white/5'
          }`}
        >
          {item.icon ? <Pill size={20} /> : <div className="w-5 h-5" />}
          {item.name}
        </Link>
      ))}
      
      <div className="my-4 border-t border-white/10 mx-4" />
      
      {/* Additional Mobile Actions */}
      <button className="flex items-center gap-4 p-4 text-slate-200 font-bold hover:bg-white/5 rounded-2xl">
        <Bell size={20} /> Notifications
      </button>
      
      <button 
        onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
        className="flex items-center gap-4 p-4 text-green-400 font-bold hover:bg-white/5 rounded-2xl"
      >
        <User size={20} /> Login / Profile
      </button>
    </div>

    {/* Bottom Version Tag */}
    <div className="absolute bottom-8 left-0 right-0 text-center">
      <p className="text-white/20 text-[10px] font-bold tracking-[2px] uppercase">v 1.0.2 - MedHelp</p>
    </div>
  </div>
</div>
    </nav>
  );
};

export default Navbar;