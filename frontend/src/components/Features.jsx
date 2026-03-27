import React from 'react';
import { Tablet, Truck, ShieldCheck, HeartPulse } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Tablet className="text-blue-500" size={24} />,
      title: "Fast Medicine Search",
      desc: "Quickly locate the medicine you need from our extensive database of local pharmacies.",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Truck className="text-orange-400" size={24} />,
      title: "Real-Time Availability",
      desc: "Get instant updates on medicine stock levels to avoid unnecessary trips.",
      bgColor: "bg-orange-50"
    },
    {
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      title: "Verified Pharmacies",
      desc: "We only partner with certified and trusted local medical stores for your safety.",
      bgColor: "bg-emerald-50"
    },
    {
      icon: <HeartPulse className="text-rose-500" size={24} />,
      title: "Expert Health Advice",
      desc: "Consult with certified professionals for guidance on your medical needs.",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Side: Content */}
        <div className="flex-1 text-left space-y-4">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Our Key Features</p>
          <h2 className="text-4xl font-black text-slate-900 leading-tight">
            Why Choose Our <br /> Medicine Finder?
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            We bridge the gap between you and your local pharmacies, making healthcare more accessible and reliable.
          </p>
          <button className="bg-[#1a3a5f] text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-blue-900/10">
            Learn More
          </button>
        </div>

        {/* Right Side: Features Grid */}
        <div className="flex-[1.5] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-[32px] border border-slate-50 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] transition-all group"
            >
              <div className={`${feature.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-black text-slate-900 text-lg mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;