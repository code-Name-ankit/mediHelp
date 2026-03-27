import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import mapPreviewImg from '../assets/map-preview.jpg'; // Aapki map image yahan use hogi

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    QuickLinks: ['Home', 'Features', 'About', 'Prescriptions', 'Contact'],
    Support: ['Home', 'Features', 'Support', 'Areas', 'Contact Info'],
    About: ['About Us', 'Our Features', 'Our Services', 'Prescription', 'Contact Us'],
  };

  return (
    <footer className="bg-[#1a3a5f] text-white pt-16 pb-6 px-6 md:px-20 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-white/10 pb-12 mb-6">
        
        {/* --- Quick Links Column --- */}
        <div className="space-y-4">
          <h4 className="font-bold text-base mb-5">Quick Links</h4>
          {footerLinks.QuickLinks.map(link => (
            <a key={link} href="#" className="block text-slate-300 hover:text-green-400 text-sm transition">
              {link}
            </a>
          ))}
        </div>

        {/* --- Support Column --- */}
        <div className="space-y-4">
          <h4 className="font-bold text-base mb-5">Support</h4>
          {footerLinks.Support.map(link => (
            <a key={link} href="#" className="block text-slate-300 hover:text-green-400 text-sm transition">
              {link}
            </a>
          ))}
        </div>

        {/* --- About Column --- */}
        <div className="space-y-4">
          <h4 className="font-bold text-base mb-5">About</h4>
          {footerLinks.About.map(link => (
            <a key={link} href="#" className="block text-slate-300 hover:text-green-400 text-sm transition">
              {link}
            </a>
          ))}
        </div>

        {/* --- Contact Info Column (Matches original icons/text) --- */}
        <div className="space-y-5 md:col-span-1">
          <h4 className="font-bold text-base mb-5">Contact Info</h4>
          <div className="flex items-start gap-3 text-slate-300 text-sm">
            <MapPin size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
            <p>123, Med St, Health City,<br/>Pharma City</p>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-sm">
            <Phone size={18} className="text-green-400 flex-shrink-0" />
            <p>+1 123 456 7890</p>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-sm">
            <Mail size={18} className="text-green-400 flex-shrink-0" />
            <p>info@medfind.com</p>
          </div>
        </div>

        {/* --- Map Column (Matches original UI) --- */}
        <div className="md:col-span-1">
          <h4 className="font-bold text-base mb-5">Location</h4>
          <div className="rounded-2xl overflow-hidden border-4 border-white shadow-lg shadow-black/20 group">
            <img 
              src={mapPreviewImg} 
              alt="Store Location Map" 
              className="w-full h-28 object-cover transition-transform group-hover:scale-110" 
            />
          </div>
        </div>

      </div>

      {/* --- Bottom Footer Bar --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4 pt-6">
        <p>© {currentYear} MedFind. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;