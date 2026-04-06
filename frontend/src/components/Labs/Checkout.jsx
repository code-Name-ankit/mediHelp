import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MapPin, Calendar, Clock, User, Phone, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // URL se ID le rahe hain backup ke liye
  
  // Data access with fallback
  const [labData, setLabData] = useState(location.state || null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(!location.state);

  // Backup: Agar page refresh ho jaye aur state khali ho, toh API se dobara fetch karein
  useEffect(() => {
    if (!labData) {
      const fetchBackupData = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/lab/${id}`);
          const data = await res.json();
          setLabData({
            labName: data.labName,
            tests: data.tests
          });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching backup data:", error);
          setLoading(false);
        }
      };
      fetchBackupData();
    }
  }, [id, labData]);

  // Loading State
  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-[#39D5A3]">Verifying Details...</div>;

  // Error State: Agar data phir bhi na mile
  if (!labData) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <AlertCircle size={48} className="text-red-500" />
      <p className="font-bold">Booking data not found!</p>
      <button onClick={() => navigate(-1)} className="text-[#39D5A3] underline">Go Back</button>
    </div>
  );

  const { labName, tests } = labData;
  const totalPrice = tests?.reduce((acc, t) => acc + t.price, 0) || 0;

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFC] p-6">
        <div className="text-center space-y-6 max-w-md bg-white p-12 rounded-[3rem] shadow-2xl border border-emerald-50">
          <div className="flex justify-center">
            <div className="bg-[#39D5A3]/20 p-6 rounded-full animate-bounce">
              <CheckCircle size={80} className="text-[#39D5A3]" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-[#112440]">Success!</h1>
          <p className="text-gray-500 font-bold leading-relaxed">Booking for {labName} is confirmed. Our team will contact you soon.</p>
          <button onClick={() => navigate("/")} className="w-full bg-[#112440] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em]">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFC] mt-24 px-6 md:px-16 py-10 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* Form Details */}
        <div className="flex-1 space-y-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 hover:text-[#112440] transition-colors mb-4">
            <ArrowLeft size={14} /> Edit Selection
          </button>
          
          <h2 className="text-4xl font-black text-[#112440]">Home Collection</h2>
          
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-6">
            <div className="relative group">
              <User className="absolute left-5 top-5 text-gray-400" size={20} />
              <input type="text" placeholder="Full Name" className="w-full pl-14 pr-6 py-5 bg-[#F8F8F8] border-none rounded-2xl focus:ring-2 focus:ring-[#39D5A3] font-bold" />
            </div>

            <div className="relative group">
              <Phone className="absolute left-5 top-5 text-gray-400" size={20} />
              <input type="text" placeholder="Phone Number" className="w-full pl-14 pr-6 py-5 bg-[#F8F8F8] border-none rounded-2xl focus:ring-2 focus:ring-[#39D5A3] font-bold" />
            </div>

            <div className="relative group text-left">
              <MapPin className="absolute left-5 top-5 text-gray-400" size={20} />
              <textarea placeholder="Address" className="w-full pl-14 pr-6 py-5 bg-[#F8F8F8] border-none rounded-2xl focus:ring-2 focus:ring-[#39D5A3] font-bold h-32 resize-none" />
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full lg:w-[380px]">
          <div className="bg-[#112440] p-8 rounded-[3rem] text-white shadow-2xl sticky top-32">
            <h3 className="text-xl font-black mb-6 border-b border-white/10 pb-4">Order Summary</h3>
            <p className="text-[#39D5A3] text-xs font-black uppercase mb-4">{labName}</p>
            
            <div className="space-y-4 mb-8 text-left">
              {tests?.map((t, index) => (
                <div key={index} className="flex justify-between text-sm font-bold">
                  <span className="opacity-40">{t.name}</span>
                  <span className="text-[#39D5A3]">₹{t.price}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-3xl font-black mb-8 pt-4 border-t border-white/10">
              <span>Total</span>
              <span className="text-[#39D5A3]">₹{totalPrice}</span>
            </div>

            <button onClick={() => setStep(2)} className="w-full bg-[#39D5A3] text-[#112440] py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg">Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;