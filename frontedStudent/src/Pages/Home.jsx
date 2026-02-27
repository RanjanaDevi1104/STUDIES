import React from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, Clock, Laptop, CheckCircle, 
  ArrowRight, Users, Star, Sparkles, 
  ShieldCheck, Zap, Target, Eye, Rocket,
  Award, Globe, Headphones
} from "lucide-react";

const Home = () => {
  return (
    /* overflow-x-hidden ensures no horizontal scroll */
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">
      {/* Custom Animation Styles */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(0); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite ease-in-out;
          }
        `}
      </style>

      {/* Abstract Background Decoration - Wrapped in a container to prevent width issues */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60"></div>
      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full shadow-sm">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                The Next Gen Learning Experience
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Level up your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  career growth.
                </span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
                Unlock high-quality notes, expert-led courses, and a community of 
                10k+ learners. Designed for busy professionals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses">
                <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                  Explore Courses
                  <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/register">
                <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300">
                  Try for Free
                </button>
              </Link>
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-8">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-slate-900">4.9</span>
                  <div className="flex text-amber-400">
                    <Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Satisfaction</p>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold text-slate-900">100+</div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Modules</p>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold text-slate-900">24/7</div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Support</p>
              </div>
            </div>
          </div>

          {/* Right Card Graphics */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-6 -left-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 hidden xl:flex items-center gap-4 animate-bounce-slow">
              <div className="bg-green-500 p-2 rounded-xl text-white shadow-lg">
                <CheckCircle size={20}/>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Status</p>
                <p className="text-sm font-extrabold text-slate-800">Exam Ready</p>
              </div>
            </div>

            <div className="relative z-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-bold text-white mb-8">Why StudyEase?</h3>
              <div className="space-y-4">
                {[
                  { icon: <Zap size={18}/>, text: "Save 40% study time" },
                  { icon: <ShieldCheck size={18}/>, text: "Verified exam content" },
                  { icon: <Laptop size={18}/>, text: "Multi-device syncing" },
                  { icon: <Users size={18}/>, text: "Community doubt solving" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                    <div className="bg-white text-blue-600 p-2 rounded-lg shadow-md">{item.icon}</div>
                    <span className="text-white font-medium text-sm md:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US - Added overflow-hidden to prevent skew width issue */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32 hidden md:block"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-3">The StudyEase Advantage</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Why choose us over traditional learning?</h3>
            <p className="text-slate-400 text-base">Expert pedagogy meets data science to create a path that works for your brain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Rocket size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Accelerated Learning</h4>
              <p className="text-slate-400 text-sm leading-relaxed">SmartNotes help you absorb information 2x faster than standard textbooks.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group md:mt-8">
              <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Award size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Premium Quality</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Content vetted by industry experts and top-rankers for guaranteed success.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group md:mt-16">
              <div className="w-14 h-14 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Headphones size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Expert Support</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Our experts are available 24/7 to clear your doubts and keep you motivated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block p-3 bg-blue-50 rounded-2xl text-blue-600">
               <Globe size={28} />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our commitment to <br/> 
              <span className="text-blue-600">Educational Excellence.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-md">
              High-quality education shouldn't be a luxury. We simplify complex learning for millions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100 flex gap-5 items-start hover:shadow-lg transition-all">
              <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600 flex-shrink-0">
                <Target size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Our Mission</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  To democratize education by providing affordable, tech-driven resources that empower students.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-blue-100 flex gap-5 items-start shadow-sm hover:shadow-lg transition-all">
              <div className="bg-blue-600 p-3 rounded-xl shadow-lg text-white flex-shrink-0">
                <Eye size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Our Vision</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  To become the world's most student-centric platform for mastering any skill through structured content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Clock />, title: "Flexible Pace", desc: "Learn whenever you want, anywhere." },
              { icon: <BookOpen />, title: "Curated Notes", desc: "Crisp, exam-oriented simplified notes." },
              { icon: <Users />, title: "Expert Tutors", desc: "Mentorship from industry professionals." },
              { icon: <Laptop />, title: "Study Anywhere", desc: "Seamless mobile & desktop experience." }
            ].map((f, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h4 className="font-bold text-slate-900 text-lg">{f.title}</h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;