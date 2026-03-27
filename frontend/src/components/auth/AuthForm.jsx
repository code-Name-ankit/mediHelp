import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // 1. Axios import karein
import {
  User, Store, Stethoscope, Mail, Lock, ChevronLeft,
  Loader2, CheckCircle, ShieldCheck, Heart,
} from "lucide-react";

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  // 2. States for Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit Handler (Backend Connection)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    
    try {
      // Backend ko request bhejna (Base URL adjust karein agar zaroorat ho)
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);

      if (response.data.token) {
        // Token ko localStorage mein save karein
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setIsLoading(false);
      setIsSuccess(true);

      // Success ke baad redirect
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  const roles = [
    { id: "user", label: "Patient", icon: <User size={20} /> },
    { id: "doctor", label: "Doctor", icon: <Stethoscope size={20} /> },
    { id: "pharmacy", label: "Medical", icon: <Store size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Elements... (Same as yours) */}
      
      <div className="w-full max-w-lg z-10">
        <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">
              {isLogin ? "Sign In" : "Join Us"}
            </h1>
            {error && <p className="text-red-500 text-sm font-bold mb-2">{error}</p>}
          </div>

          {/* Role Selector */}
          {!isLogin && (
            <div className="grid grid-cols-3 gap-3 mb-10">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: r.id })}
                  className={`flex flex-col items-center gap-3 py-5 rounded-[30px] border-2 transition-all duration-300 ${
                    formData.role === r.id
                      ? "border-emerald-500 bg-emerald-50/50 text-emerald-600 shadow-sm"
                      : "border-slate-50 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-500"
                  }`}
                >
                  {r.icon}
                  <span className="text-[10px] font-black uppercase tracking-wider">{r.label}</span>
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  name="name"
                  type="text"
                  placeholder={formData.role === "pharmacy" ? "Pharmacy Name" : "Full Name"}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-100 text-slate-900 py-6 pl-14 pr-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all font-bold text-lg"
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-100 text-slate-900 py-6 pl-14 pr-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all font-bold text-lg"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-100 text-slate-900 py-6 pl-14 pr-12 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all font-bold text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`w-full py-3 rounded-[12px] font-black text-lg transition-all flex items-center justify-center gap-3 mt-6 ${
                isSuccess ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-emerald-600 shadow-lg"
              }`}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : isSuccess ? <><CheckCircle size={22} /> Authenticated</> : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
          {/* Toggle Button logic... */}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;