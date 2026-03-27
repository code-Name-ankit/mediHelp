import React from 'react';
import doctorImg from '../assets/Doctor2.png'; // Aapki doctor image yahan use hogi

const ExpertAdvice = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto relative group">
        
        {/* --- Main Banner Container (Light Blue Glassy Box) --- */}
        <div className="bg-[#EBF5FF] rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative border border-blue-50 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-200/20">
          
          {/* Decorative Background Circle */}
          <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Content */}
          <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-[#1a3a5f] leading-tight">
              Need Expert Advice?
            </h2>
            <p className="text-slate-600 text-lg font-bold">
              Consult with Certified Doctors Online.
            </p>
            
            <button className="bg-[#1a3a5f] hover:bg-slate-800 text-white px-10 py-4 rounded-[18px] font-black text-sm tracking-wide transition-all active:scale-95 shadow-lg shadow-blue-900/20">
              Book a Consultation
            </button>
          </div>

          {/* Right Image Content */}
          <div className="flex-1 relative mt-10 md:mt-0 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Image Circle Background */}
              <div className="absolute inset-0 bg-blue-100 rounded-full border-4 border-white shadow-inner"></div>
              
              {/* Doctor Image (Overflow Effect) */}
              <img 
                src={doctorImg} 
                alt="Expert Doctor" 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] max-w-none drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
          </div>

        </div>

        {/* Small Floating Badge (Optional for extra "Wow" factor) */}
        <div className="absolute top-10 right-10 md:right-20 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 hidden lg:block animate-bounce-slow">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">Online Support 24/7</p>
           </div>
        </div>

      </div>
    </section>
  );
};

export default ExpertAdvice;