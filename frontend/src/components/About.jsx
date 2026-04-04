import React from 'react';
import { Search, Activity, FileText, LifeBuoy, CheckCircle, Target, Eye } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white font-sans text-slate-800 mt-10">
      
      {/* --- Hero Section --- */}
      <section className="bg-[#1a3a5f] py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            About <span className="text-emerald-400">Medione</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Medione is a smart healthcare platform that helps users easily find medicines, 
            track availability, and manage their health in one place.
          </p>
        </div>
      </section>

      {/* --- Problem & Solution Section --- */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1a3a5f] mb-6">Solving Real Healthcare Challenges</h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              We understand the frustration of medicine shortages, delayed deliveries, and the stress of not knowing basic first-aid during emergencies. Scattered medical reports only add to the confusion.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Medione was built to bridge these gaps by providing a seamless, digital-first approach to patient care.
            </p>
          </div>
          
          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <Search className="text-emerald-500 mb-4" size={32} />
              <h3 className="font-bold mb-2">Search Medicines</h3>
              <p className="text-sm text-slate-500">Find medicines from various companies easily.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <Activity className="text-emerald-500 mb-4" size={32} />
              <h3 className="font-bold mb-2">Real-time Tracking</h3>
              <p className="text-sm text-slate-500">Check live availability at nearby locations.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <LifeBuoy className="text-emerald-500 mb-4" size={32} />
              <h3 className="font-bold mb-2">First-Aid Guide</h3>
              <p className="text-sm text-slate-500">Quick guidance for emergency situations.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <FileText className="text-emerald-500 mb-4" size={32} />
              <h3 className="font-bold mb-2">Secure Lab Reports</h3>
              <p className="text-sm text-slate-500">Store and access your medical data safely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Mission & Vision --- */}
      <section className="bg-slate-900 py-20 px-6 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white/5 p-10 rounded-3xl border border-white/10 flex flex-col items-center text-center">
            <Target className="text-emerald-400 mb-6" size={48} />
            <h2 className="text-2xl font-bold mb-4 italic">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">
              To make healthcare simple, fast, and accessible for everyone by leveraging modern technology to save lives and time.
            </p>
          </div>
          <div className="bg-white/5 p-10 rounded-3xl border border-white/10 flex flex-col items-center text-center">
            <Eye className="text-emerald-400 mb-6" size={48} />
            <h2 className="text-2xl font-bold mb-4 italic">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed">
              To create an all-in-one digital health solution that sets the standard for medicine distribution and patient care globally.
            </p>
          </div>
        </div>
      </section>

      {/* --- Why Choose Us --- */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1a3a5f]">Why Choose Medione?</h2>
          <div className="h-1.5 w-24 bg-emerald-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Easy to Use", desc: "User-friendly interface designed for everyone." },
            { title: "Fast & Reliable", desc: "Instant updates and dependable health data." },
            { title: "All-in-One", desc: "All your health features consolidated in one place." },
            { title: "Universal Design", desc: "Built for both individual users and hospitals." }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3 p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition">
              <CheckCircle className="text-emerald-500" size={28} />
              <h4 className="font-bold text-lg text-[#1a3a5f]">{item.title}</h4>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="py-20 px-6 bg-emerald-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience smarter healthcare?</h2>
          <p className="text-emerald-50 mb-10 text-lg">Join Medione today and take control of your medical needs with ease.</p>
          <button className="bg-[#1a3a5f] hover:bg-[#152e4d] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl">
            Get Started Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default About;