import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, ShoppingCart, Pill, Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const [cartCount, setCartCount] = useState(2); 
  
  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Medicines', path: '/search', icon: true },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthNav = (path) => {
    navigate(path);
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-20 py-4 ${
      isScrolled 
      ? "bg-[#1a3a5f]/90 backdrop-blur-lg shadow-lg border-b border-white/10 py-3" 
      : "bg-[#1a3a5f] py-6"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <button className="lg:hidden p-2 text-white bg-white/10 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* --- LOGO SECTION START --- */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo1.png"
            alt="Medione Logo" 
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
          />
        </Link>
        {/* --- LOGO SECTION END --- */}

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((item) => (
            <Link key={item.name} to={item.path} className={`relative text-sm font-semibold transition-colors group flex items-center gap-1.5 ${item.name === 'Medicines' ? 'text-green-400' : 'text-slate-200 hover:text-green-400'}`}>
              {item.icon && <Pill size={14} />}
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => navigate('/checkout')} className="relative p-2 md:p-2.5 text-slate-300 hover:text-white bg-white/5 rounded-full border border-white/10 transition-all active:scale-90">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-emerald-500 text-white text-[8px] md:text-[10px] font-black flex items-center justify-center rounded-full border-2 border-[#1a3a5f]">
                {cartCount}
              </span>
            )}
          </button>

          <button className="hidden md:flex relative p-2.5 text-slate-300 hover:text-white bg-white/5 rounded-full border border-white/10">
            <Bell size={20} />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 md:p-2.5 text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg active:scale-95 transition-all flex items-center gap-2"
            >
              <User size={20} />
              {isLoggedIn && <span className="hidden md:block text-xs font-bold">{user?.name?.split(' ')[0]}</span>}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-[#1a3a5f] border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                {!isLoggedIn ? (
                  <>
                    <button onClick={() => handleAuthNav('/login')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-white/5 text-sm font-bold transition-all">
                      <LogIn size={16} className="text-green-400" /> Sign In
                    </button>
                    <button onClick={() => handleAuthNav('/register')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-white/5 text-sm font-bold transition-all">
                      <UserPlus size={16} className="text-green-400" /> Register
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Logged in as</p>
                      <p className="text-sm text-white font-bold truncate">{user?.email}</p>
                    </div>
                    <button onClick={() => handleAuthNav('/profile')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-white/5 text-sm font-bold transition-all">
                      <User size={16} className="text-green-400" /> My Profile
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 text-sm font-bold transition-all">
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-[100] transition-all duration-500 ${isMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-[#1a3a5f] shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            {/* Sidebar Logo */}
            <img src="/logo1.png" alt="Logo" className="h-8 w-auto" />
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-300 hover:text-white bg-white/5 rounded-full border border-white/10"><X size={22} /></button>
          </div>
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((item) => (
              <Link key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${item.name === 'Medicines' ? 'bg-green-400/10 text-green-400' : 'text-slate-200 hover:bg-white/5'}`}>
                {item.icon ? <Pill size={20} /> : <div className="w-5 h-5" />} {item.name}
              </Link>
            ))}
            <div className="my-4 border-t border-white/10 mx-4" />
            
            {!isLoggedIn ? (
              <>
                <button onClick={() => handleAuthNav('/login')} className="flex items-center gap-4 p-4 text-slate-200 font-bold hover:bg-white/5 rounded-2xl w-full">
                  <LogIn size={20} className="text-green-400" /> Sign In
                </button>
                <button onClick={() => handleAuthNav('/register')} className="flex items-center gap-4 p-4 text-slate-200 font-bold hover:bg-white/5 rounded-2xl w-full">
                  <UserPlus size={20} className="text-green-400" /> Register
                </button>
              </>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-4 p-4 text-red-400 font-bold hover:bg-red-500/10 rounded-2xl w-full mt-auto">
                <LogOut size={20} /> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;