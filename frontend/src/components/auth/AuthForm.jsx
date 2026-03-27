import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Store,
  Stethoscope,
  Mail,
  Lock,
  ChevronLeft,
  Loader2,
  CheckCircle,
  ShieldCheck,
  Heart,
} from "lucide-react";

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    }, 2000);
  };

  const roles = [
    { id: "user", label: "Patient", icon: <User size={20} /> },
    { id: "doctor", label: "Doctor", icon: <Stethoscope size={20} /> },
    { id: "pharmacy", label: "Medical", icon: <Store size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-emerald-100 rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-60" />

      <div className="w-full max-w-lg z-10">
        {/* Top Header - Back Button & Logo */}
        <div className="flex justify-between items-center mb-6 px-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 bg-white shadow-sm border border-slate-200 rounded-2xl text-slate-500 hover:text-emerald-600 transition-all active:scale-90"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex items-center gap-2">
            <Heart size={24} className="text-emerald-500 fill-emerald-500/10" />
            <span className="text-2xl font-black text-slate-900 italic tracking-tighter">
              Med<span className="text-emerald-500">Help</span>
            </span>
          </div>
        </div>

        {/* --- MAIN WHITE CARD --- */}
        <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">
              {isLogin ? "Sign In" : "Join Us"}
            </h1>
            <div className="w-12 h-1.5 bg-emerald-500 mx-auto rounded-full mb-4" />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              {isLogin
                ? "Welcome back, health partner"
                : "Choose your profile to start"}
            </p>
          </div>

          {/* 3 ROLES SELECTOR (White Theme) */}
          {!isLogin && (
            <div className="grid grid-cols-3 gap-3 mb-10">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-3 py-5 rounded-[30px] border-2 transition-all duration-300 ${
                    role === r.id
                      ? "border-emerald-500 bg-emerald-50/50 text-emerald-600 shadow-sm"
                      : "border-slate-50 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-500"
                  }`}
                >
                  <div
                    className={`${role === r.id ? "scale-110" : ""} transition-transform`}
                  >
                    {r.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <ShieldCheck
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder={
                    role === "pharmacy" ? "Pharmacy Name" : "Full Name"
                  }
                  required
                  className="w-full bg-slate-50 border border-slate-100 text-slate-900 py-6 pl-14 pr-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all font-bold text-lg placeholder:text-slate-300 placeholder:font-medium"
                />
              </div>
            )}

            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-slate-50 border border-slate-100 text-slate-900 py-6 pl-14 pr-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all font-bold text-lg placeholder:text-slate-300 placeholder:font-medium"
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-slate-50 border border-slate-100 text-slate-900 py-6 pl-14 pr-12 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all font-bold text-lg placeholder:text-slate-300 placeholder:font-medium"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-[11px] font-black text-slate-400 hover:text-emerald-600 uppercase tracking-wider"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`w-full py-3 rounded-[12px] font-black text-lg transition-all flex items-center justify-center gap-3 mt-6
                ${
                  isSuccess
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-900 text-white hover:bg-emerald-600 active:scale-95 shadow-lg shadow-slate-200"
                }
              `}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : isSuccess ? (
                <>
                  <CheckCircle size={22} /> Authenticated
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Toggle Button */}
          <div className="mt-10 pt-6 border-t border-slate-50 text-center">
            <button
              onClick={() => navigate(isLogin ? "/register" : "/login")}
              className="text-slate-400 font-bold text-sm hover:text-emerald-600 transition-colors"
            >
              {isLogin
                ? "New to MedHelp? Create an account"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>

        {/* Bottom Tag */}
        <p className="text-center mt-10 text-slate-300 text-[10px] font-black uppercase tracking-[6px]">
          MedHelp Secure Environment
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
