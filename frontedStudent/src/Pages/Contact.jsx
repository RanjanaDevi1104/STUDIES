import React, { useState } from "react";
import axios from "axios";

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
      await axios.post("http://localhost:5000/api/sendmail", formData);
      alert("Message sent successfully! ✅");
      setFormData({ name: "", email: "", contact: "", message: "" });
    } catch (error) {
      alert("Failed to send message. ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-25">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row overflow-hidden border border-slate-100">
        
        {/* Left Side: Contact Info (The Professional Touch) */}
        <div className="bg-indigo-600 md:w-1/3 p-10 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Have questions? We'd love to hear from you. Reach out and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="space-y-6 mt-10">
            <div className="flex items-center gap-4 text-sm">
              <span className="p-2 bg-indigo-500/30 rounded-lg">📧</span>
              <span>support@company.com</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="p-2 bg-indigo-500/30 rounded-lg">📍</span>
              <span>New York, NY 10001</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <form onSubmit={handleSubmit} className="flex-1 p-8 md:p-12 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Phone Number</label>
              <input
                type="text"
                name="contact"
                placeholder="+1 (555) 000-0000"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Your Message</label>
            <textarea
              name="message"
              placeholder="Tell us how we can help..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-indigo-200 
              ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]"}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;