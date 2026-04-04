import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen mt-10">
      {/* --- Header Section --- */}
      <section className="bg-[#1a3a5f] py-20 px-6 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Contact <span className="text-emerald-400">Us</span></h1>
        <p className="text-slate-300 max-w-xl mx-auto">
          Have a question about our services or need medical assistance? 
          Reach out to us, and our team will get back to you shortly.
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- Left Side: Contact Info --- */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            <p className="text-slate-600 mb-8">
              We are here to help you 24/7. Feel free to contact us via phone or email.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Phone Number</h4>
                <p className="text-slate-600 text-sm">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Email Address</h4>
                <p className="text-slate-600 text-sm">support@medione.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Our Location</h4>
                <p className="text-slate-600 text-sm">123 Health St, Pharma City, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Working Hours</h4>
                <p className="text-slate-600 text-sm">Open 24/7 (Emergency Services)</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Side: Contact Form --- */}
        <div className="lg:col-span-2 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Subject</label>
              <input 
                type="text" 
                required
                placeholder="How can we help?"
                className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Message</label>
              <textarea 
                rows="5"
                required
                placeholder="Write your message here..."
                className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full md:w-max bg-[#1a3a5f] hover:bg-[#152e4d] text-white font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2 transition shadow-lg active:scale-95"
            >
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;