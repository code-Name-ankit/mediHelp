import React from 'react';
import { Search, MapPin, ShoppingBag } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: "1. Search",
      title: "Search medicines in suite to that your prescription.",
      icon: <Search className="text-blue-500" size={24} />,
      bgColor: "bg-blue-50",
    },
    {
      id: "2. Locate",
      title: "Finder medical stores for all your prescription needs.",
      icon: <MapPin className="text-orange-400" size={24} />,
      bgColor: "bg-orange-50",
    },
    {
      id: "3. Pick Up or Deliver",
      title: "Pick up or deliver to pick up or deliver as available.",
      icon: <ShoppingBag className="text-emerald-500" size={24} />,
      bgColor: "bg-emerald-50",
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <p className="text-slate-500 text-sm font-semibold mb-2">How It Works</p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          Simple Steps to Your Medicine
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300 text-left group cursor-default"
            >
              {/* Icon Container */}
              <div className={`${step.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>

              {/* Step ID */}
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                {step.id}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;