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
    <div className="min-h-screen bg-white overflow-hidden font-sans">
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

      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60"></div>
      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full shadow-sm">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">
                The Next Gen Learning Experience
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Level up your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  career growth.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed">
                Unlock high-quality notes, expert-led courses, and a community of 
                10k+ learners. Designed for busy professionals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses" className="group">
                <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                  Explore Courses
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/register">
                <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300">
                  Try for Free
                </button>
              </Link>
            </div>

            <div className="pt-10 border-t border-slate-100 flex flex-wrap gap-10">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-slate-900">4.9</span>
                  <div className="flex text-amber-400">
                    <Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/>
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-tighter">Student Satisfaction</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-slate-900">100+</div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-tighter">Premium Modules</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-tighter">Expert Support</p>
              </div>
            </div>
          </div>

          {/* Right Card Graphics */}
          <div className="lg:col-span-5 relative pt-10">
            <div className="absolute -top-4 -left-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-white flex items-center gap-4 animate-bounce-slow hidden xl:flex">
              <div className="bg-green-500 p-2 rounded-xl text-white shadow-lg shadow-green-200">
                <CheckCircle size={24}/>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Status</p>
                <p className="text-sm font-extrabold text-slate-800">Exam Ready</p>
              </div>
            </div>

            <div className="relative z-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(37,99,235,0.3)] overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Why StudyEase?</h3>
              <div className="space-y-5">
                {[
                  { icon: <Zap size={18}/>, text: "Save 40% study time with SmartNotes" },
                  { icon: <ShieldCheck size={18}/>, text: "Verified exam-oriented content" },
                  { icon: <Laptop size={18}/>, text: "Seamless multi-device syncing" },
                  { icon: <Users size={18}/>, text: "Community driven doubt solving" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-default">
                    <div className="bg-white text-blue-600 p-2 rounded-lg shadow-lg">{item.icon}</div>
                    <span className="text-white font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-slate-50 flex items-center gap-4 animate-pulse hidden xl:flex">
              <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Clock size={24}/></div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Efficiency</p>
                <p className="text-sm font-extrabold text-slate-800">98% Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: WHY CHOOSE US (EXTENDED HERO STYLE) */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">The StudyEase Advantage</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Why choose us over traditional learning?</h3>
            <p className="text-slate-400 text-lg">We've combined data science with expert pedagogy to create a learning path that actually works for your brain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                <Rocket size={32} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Accelerated Learning</h4>
              <p className="text-slate-400 leading-relaxed">Our SmartNotes use visual cues and memory techniques to help you absorb information 2x faster than standard textbooks.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all group mt-0 md:mt-12">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform">
                <Award size={32} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Premium Quality</h4>
              <p className="text-slate-400 leading-relaxed">Every piece of content is vetted by industry experts and top-rankers to ensure you study only what's necessary for success.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all group mt-0 md:mt-24">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 transition-transform">
                <Headphones size={32} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Personal Mentorship</h4>
              <p className="text-slate-400 leading-relaxed">You're never alone. Our community and experts are available 24/7 to clear your doubts and keep you motivated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: MISSION & VISION SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block p-3 bg-blue-50 rounded-2xl text-blue-600 mb-2">
               <Globe size={30} />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our commitment to <br/> 
              <span className="text-blue-600">Educational Excellence.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
              At StudyEase, we believe that high-quality education shouldn't be a luxury. 
              We are on a journey to simplify complex learning for millions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Mission Card */}
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex gap-6 items-start hover:shadow-xl transition-shadow">
              <div className="bg-white p-4 rounded-2xl shadow-sm text-blue-600">
                <Target size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h4>
                <p className="text-slate-500 leading-relaxed">
                  To democratize education by providing affordable, high-quality, 
                  and tech-driven learning resources that empower students to 
                  achieve their career goals with confidence.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-blue-100 flex gap-6 items-start shadow-sm hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg text-white">
                <Eye size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h4>
                <p className="text-slate-500 leading-relaxed">
                  To become the world's most student-centric learning platform where 
                  anyone, anywhere can master any skill they desire through 
                  structured and simplified content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Existing) */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Clock />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Flexible Pace</h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Learn whenever you want, wherever you are in the world.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <BookOpen />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Curated Notes</h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Crisp, exam-oriented notes simplified for all complex topics.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Users />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Expert Tutors</h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Direct mentorship from professionals who have been in your shoes.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Laptop />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Study Anywhere</h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Seamless experience across mobile, tablet, and your desktop.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;