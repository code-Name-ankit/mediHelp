import React from 'react';
import { 
  MessageSquare, 
  FileText, 
  Search, 
  Clock, 
  Shield, 
  Zap,
  Download,
  Video
} from 'lucide-react';

const Features = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans mt-10">
      
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-b from-[#1a3a5f] to-[#254d7d] py-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <span className="bg-emerald-500/20 text-emerald-300 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest border border-emerald-500/30">
            Smart Healthcare
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-6 mb-6">
            Features designed for <span className="text-emerald-400">your well-being</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Medione brings advanced medical tools to your fingertips. From instant consultations to secure report management.
          </p>
        </div>
      </section>

      {/* --- Main Features: Doctor Chat & Reports --- */}
      <section className="max-w-7xl mx-auto -mt-12 px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Feature 1: Chat to Doctor */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-emerald-400 transition-all group">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
              <MessageSquare className="text-emerald-600 group-hover:text-white" size={30} />
            </div>
            <h2 className="text-2xl font-bold text-[#1a3a5f] mb-4">Chat to Doctor</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              No need to wait in long queues. Connect with verified specialists instantly through our secure chat and video consultation system.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <Zap size={18} className="text-emerald-500" /> 24/7 Instant response
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <Video size={18} className="text-emerald-500" /> Private video calls
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <Shield size={18} className="text-emerald-500" /> Fully encrypted & private
              </li>
            </ul>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition shadow-md">
              Start Consultation
            </button>
          </div>

          {/* Feature 2: Doctor Reports */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-[#1a3a5f] transition-all group">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1a3a5f] transition-colors">
              <FileText className="text-blue-600 group-hover:text-white" size={30} />
            </div>
            <h2 className="text-2xl font-bold text-[#1a3a5f] mb-4">Smart Medical Reports</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Keep all your health history in your pocket. Securely store, organize, and share your lab reports and prescriptions with ease.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <Download size={18} className="text-blue-500" /> One-click download
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <Search size={18} className="text-blue-500" /> Easy search by date or doctor
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <Shield size={18} className="text-blue-500" /> Cloud-based secure storage
              </li>
            </ul>
            <button className="w-full bg-[#1a3a5f] hover:bg-[#112741] text-white font-bold py-3 rounded-xl transition shadow-md">
              View My Reports
            </button>
          </div>

        </div>
      </section>

      {/* --- Additional Features Grid --- */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1a3a5f]">More Than Just a Pharmacy</h2>
            <p className="text-slate-500 mt-2 italic">Everything you need to manage your health digitally</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Feature 3 */}
            <div className="text-center p-6 hover:translate-y-[-5px] transition-transform">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search className="text-emerald-500" />
              </div>
              <h4 className="font-bold text-lg mb-2">Medicine Finder</h4>
              <p className="text-slate-500 text-sm">Find medicines from different brands and check their substitutes.</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 hover:translate-y-[-5px] transition-transform">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-emerald-500" />
              </div>
              <h4 className="font-bold text-lg mb-2">Availability Tracking</h4>
              <p className="text-slate-500 text-sm">Real-time stock status of medicines in your local area.</p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6 hover:translate-y-[-5px] transition-transform">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-emerald-500" />
              </div>
              <h4 className="font-bold text-lg mb-2">Emergency First-Aid</h4>
              <p className="text-slate-500 text-sm">Get step-by-step guidance for medical emergencies at home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Trust Banner --- */}
      <section className="py-12 bg-[#1a3a5f] text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">Your data is safe with us</h3>
            <p className="text-slate-400">Medione uses bank-grade encryption to protect your health records.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 px-6 py-2 rounded-lg border border-white/20">ISO Certified</div>
            <div className="bg-white/10 px-6 py-2 rounded-lg border border-white/20">Secure Pay</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Features;