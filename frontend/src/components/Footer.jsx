import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import mapPreviewImg from '../assets/map-preview.jpg';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a3a5f] text-white pt-16 pb-8 px-6 md:px-20 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start border-b border-white/10 pb-12 mb-8">
        
        {/* --- Column 1: Logo & Tagline --- */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3 group cursor-pointer">
            
            <img 
              src="/logo1.png"
              alt="MedHelp Logo" 
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </div>
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
           Your health is our priority. We are always ready 24/7 to provide medicines and expert advice.
          </p>
        </div>

        {/* --- Column 2: Contact Info --- */}
        <div className="space-y-6 text-left">
          <h4 className="font-bold text-lg text-green-400 uppercase tracking-widest">Contact Info</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-4 text-slate-300 text-sm group">
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-green-400/20 transition-colors">
                <MapPin size={18} className="text-green-400" />
              </div>
              <p className="leading-relaxed">123, Med St, Health City,<br/>Pharma City, PIN 400001</p>
            </div>
            <div className="flex items-center gap-4 text-slate-300 text-sm group">
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-green-400/20 transition-colors">
                <Phone size={18} className="text-green-400" />
              </div>
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-4 text-slate-300 text-sm group">
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-green-400/20 transition-colors">
                <Mail size={18} className="text-green-400" />
              </div>
              <p>support@medhelp.com</p>
            </div>
          </div>
        </div>

        {/* --- Column 3: Location (Map) --- */}
        <div className="text-left">
          <h4 className="font-bold text-lg text-green-400 uppercase tracking-widest mb-6">Our Location</h4>
          <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl group group-hover:border-green-400/50 transition-all">
            <img 
              src={mapPreviewImg} 
              alt="Store Location" 
              className="w-full h-36 object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
          </div>
        </div>

      </div>

      {/* --- Bottom Copyright Bar --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] md:text-xs gap-4 font-bold uppercase tracking-widest">
        <p>© {currentYear} MedHelp Pharmacy. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-green-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-green-400 transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;