import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Home, ShieldCheck, Clock, MapPin, Truck, Star } from "lucide-react";

const LabDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);

  useEffect(() => {
    fetchLab();
  }, [id]);

  const fetchLab = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/lab/${id}`);
      const data = await res.json();
      setLab(data);
    } catch (error) {
      console.error("Error fetching lab:", error);
    }
  };

  // Booking Function: Yeh data lekar Checkout page par jayega
  const handleBooking = () => {
    navigate(`/book-collection/${id}`, {
      state: {
        labName: lab.labName,
        tests: lab.tests, // Aap yahan filter karke sirf selected tests bhi bhej sakte hain
        address: lab.address
      }
    });
  };

  if (!lab) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="animate-pulse text-[#39D5A3] font-bold text-xl tracking-tighter">Loading Lab Details...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBFBFC] mt-24 px-6 md:px-16 py-10 font-sans text-[#1A1A1A]">
      
      {/* Back Navigation */}
      <div className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest cursor-pointer hover:text-[#112440] transition-colors" onClick={() => window.history.back()}>
        <span>← Back to Search</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* --- LEFT COLUMN --- */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-[#EFEFEF] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#112440] text-[#39D5A3] px-6 py-2 rounded-bl-[1.5rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Home size={14} /> Home Collection Available
            </div>

            <h1 className="text-5xl font-black text-[#112440] mb-4 leading-tight">{lab.labName}</h1>
            
            <div className="flex items-center gap-2 mb-6 text-[#39D5A3]">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="#39D5A3" />)}
              <span className="text-gray-400 font-bold ml-2">4.8 (Trusted by 500+ Patients)</span>
            </div>

            <div className="flex items-start gap-4 p-5 bg-[#F8F8F8] rounded-2xl border border-[#EFEFEF]">
              <div className="bg-white p-3 rounded-xl shadow-sm text-[#112440]"><MapPin size={24}/></div>
              <div>
                <p className="font-bold text-[#112440]">Lab Location</p>
                <p className="text-gray-500 text-sm leading-relaxed">{lab.address}</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-[#39D5A3]/10 p-6 rounded-[2rem] border border-[#39D5A3]/20">
                <Truck className="text-[#39D5A3] mb-3" size={28} />
                <h4 className="font-black text-[#112440] text-sm uppercase">Quick Pickup</h4>
                <p className="text-xs text-gray-500 mt-1 font-bold">Phlebotomist will arrive in 60 mins</p>
             </div>
             <div className="bg-[#112440]/5 p-6 rounded-[2rem] border border-[#112440]/10">
                <ShieldCheck className="text-[#112440] mb-3" size={28} />
                <h4 className="font-black text-[#112440] text-sm uppercase">100% Safe</h4>
                <p className="text-xs text-gray-500 mt-1 font-bold">Certified & Vaccinated Staff</p>
             </div>
             <div className="bg-[#112440]/5 p-6 rounded-[2rem] border border-[#112440]/10">
                <Clock className="text-[#112440] mb-3" size={28} />
                <h4 className="font-black text-[#112440] text-sm uppercase">Digital Reports</h4>
                <p className="text-xs text-gray-500 mt-1 font-bold">On WhatsApp & Email in 24h</p>
             </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Booking Card --- */}
        <div className="lg:col-span-1">
          <div className="bg-[#112440] p-8 rounded-[2.5rem] shadow-2xl sticky top-32 text-white">
            <h2 className="text-2xl font-black mb-2">Book Home Visit</h2>
            <p className="text-[#39D5A3] text-[10px] font-bold uppercase tracking-widest mb-6 block">Samples will be collected from your home</p>

            <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar pr-2 mb-8 text-left">
              {lab.tests.map((t) => (
                <div key={t._id} className="group flex justify-between items-center p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white hover:text-[#112440] transition-all cursor-pointer">
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wide">{t.name}</p>
                    <p className="text-[9px] text-[#39D5A3] font-black group-hover:text-[#112440]/50 uppercase">Home Collection Incl.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#39D5A3] group-hover:text-[#112440]">₹{t.price}</p>
                    <p className="text-[9px] uppercase font-bold opacity-40 italic">Selected</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 p-4 rounded-2xl mb-6 border border-dashed border-white/20">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">
                    <span>Visit Charges</span>
                    <span className="text-[#39D5A3]">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-black uppercase">
                    <span>Total Pay</span>
                    <span>₹{lab.tests[0]?.price || 0}*</span>
                </div>
            </div>

            <button 
              onClick={handleBooking}
              className="w-full bg-[#39D5A3] text-[#112440] py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Truck size={18}/> Book Home Visit Now
            </button>
            
            <p className="text-center text-[10px] text-white/40 mt-4 font-bold tracking-widest italic uppercase">Secure & Hygiene Sample Collection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDetail;