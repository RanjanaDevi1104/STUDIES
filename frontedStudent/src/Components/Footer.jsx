import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, MapPin, GraduationCap, ChevronRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 border-t border-slate-900">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Study<span className="text-blue-500">Ease</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Empowering students with exam-oriented notes and structured learning paths. 
            Achieve more in less time with StudyEase.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm group cursor-pointer">
              <div className="p-2 bg-slate-900 rounded-lg text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <MapPin size={16} />
              </div>
              <span className="group-hover:text-slate-200 transition-colors">123 Learning Street, NY 10001</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">Navigation</h3>
          <ul className="space-y-4">
            {["Home", "Courses", "About Us", "Contact"].map((item) => (
              <li key={item}>
                <Link 
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`} 
                  className="group flex items-center gap-2 text-sm hover:text-blue-400 transition-all duration-300"
                >
                  <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-500" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">Popular Programs</h3>
          <ul className="space-y-4">
            {["BCA Notes", "BBA Prep", "MCA Advanced", "BSc Science", "BA Arts"].map((course) => (
              <li key={course}>
                <button className="group flex items-center gap-2 text-sm hover:text-blue-400 transition-all duration-300">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-all"></div>
                   {course}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">Get in Touch</h3>
          <div className="space-y-4 mb-8">
            <a href="mailto:support@studyease.com" className="flex items-center gap-3 text-sm group">
              <div className="p-2 bg-slate-900 rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                <Mail size={16} />
              </div>
              <span className="group-hover:text-slate-200 transition-colors">support@studyease.com</span>
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-3 text-sm group">
              <div className="p-2 bg-slate-900 rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                <Phone size={16} />
              </div>
              <span className="group-hover:text-slate-200 transition-colors">+91 6284568897</span>
            </a>
          </div>

          {/* Refined Social Icons */}
          <div className="flex gap-3">
            {[
              { icon: <Facebook size={18} />, color: "hover:bg-blue-600" },
              { icon: <Twitter size={18} />, color: "hover:bg-sky-500" },
              { icon: <Instagram size={18} />, color: "hover:bg-pink-600" },
              { icon: <Linkedin size={18} />, color: "hover:bg-blue-700" },
            ].map((social, idx) => (
              <a 
                key={idx}
                href="#" 
                className={`w-10 h-10 flex items-center justify-center bg-slate-900 rounded-xl text-slate-400 ${social.color} hover:text-white transition-all duration-300 hover:-translate-y-1`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950/50 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium">
              © 2025 StudyEase Inc. <span className="text-slate-600 ml-2 font-normal">Made with ❤️ for students.</span>
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/privacy" className="text-xs font-semibold hover:text-white transition-colors uppercase tracking-widest">Privacy</Link>
            <Link to="/terms" className="text-xs font-semibold hover:text-white transition-colors uppercase tracking-widest">Terms</Link>
            <Link to="/cookies" className="text-xs font-semibold hover:text-white transition-colors uppercase tracking-widest">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;