import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Apipath";
import { Mail, Phone, MapPin, Send, User, MessageSquare, Globe } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/api/sendmail`, formData);
      alert("Message sent successfully! ✅");
      setFormData({ name: "", email: "", contact: "", message: "" });
    } catch (error) {
      alert("Failed to send message. ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/50 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/50 rounded-full blur-3xl animate-pulse"></div>

      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-300/50 flex flex-col md:flex-row overflow-hidden border border-white relative z-10">
        
        {/* Left Side: Professional Info Panel */}
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 md:w-[40%] p-10 lg:p-14 text-white flex flex-col justify-between relative">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#grid-pattern)" /></svg>
                <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
            </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Let's talk business.</h2>
            <p className="text-indigo-100 text-lg font-light leading-relaxed mb-12">
              Have a question or a project in mind? Reach out to us and let's create something amazing together.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
                  <Mail size={24} className="text-indigo-200" />
                </div>
                <div>
                    <p className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-1">Email us</p>
                    <p className="text-lg font-medium">shawetachaudhary276@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
                  <Phone size={24} className="text-indigo-200" />
                </div>
                <div>
                    <p className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-1">Call us</p>
                    <p className="text-lg font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
                  <MapPin size={24} className="text-indigo-200" />
                </div>
                <div>
                    <p className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-1">Visit us</p>
                    <p className="text-lg font-medium">123 Education Hub, Delhi, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex gap-4 relative z-10">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all"><Globe size={18}/></div>
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all">FB</div>
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all">LN</div>
          </div>
        </div>

        {/* Right Side: Modern Form */}
        <div className="flex-1 p-8 lg:p-16 bg-white">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Send us a message</h3>
            <p className="text-slate-500">We usually respond within 2-4 business hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                   <User size={14} className="text-indigo-500"/> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                   <Phone size={14} className="text-indigo-500"/> Phone Number
                </label>
                <input
                  type="text"
                  name="contact"
                  placeholder="+91 00000 00000"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                 <Mail size={14} className="text-indigo-500"/> Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                 <MessageSquare size={14} className="text-indigo-500"/> Your Message
              </label>
              <textarea
                name="message"
                placeholder="How can we help you today?"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3
                ${isSubmitting 
                    ? "bg-slate-400 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.98] shadow-indigo-100"}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;