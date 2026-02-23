import React from "react";
import { Target, Briefcase, Rocket, CheckCircle, BookOpen } from "lucide-react";

const About = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-6">
      {/* HERO SECTION */}
      {/* Humne yahan z-0 rakha hai taaki ye base layer rahe */}
      <section className="relative bg-slate-900 py-32 px-6 overflow-hidden z-0">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="text-blue-400 font-semibold tracking-widest uppercase text-xs mb-4 block">
            Our Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Simplifying Success for <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Working Students
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            StudyEase bridges the gap between professional commitments and academic excellence with streamlined study resources.
          </p>
        </div>
      </section>

      {/* CORE CARDS - Fixed Stacking Issue */}
      {/* 'relative z-10' se ye cards Hero section ke hamesha upar dikhenge */}
      <main className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 hover:translate-y-[-10px] hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group cursor-default">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target size={30} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Why StudyEase?</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              We provide a centralized, reliable hub for academic resources. No more wasting hours searching multiple sites—everything you need is one click away.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 hover:translate-y-[-10px] hover:shadow-2xl hover:border-amber-200 transition-all duration-300 group cursor-default">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Briefcase size={30} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">The Challenge</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Balancing a 9-to-5 with a degree is tough. Limited time makes traditional note-taking and class attendance nearly impossible for working professionals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 hover:translate-y-[-10px] hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 group cursor-default">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Rocket size={30} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Our Solution</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              By offering concise summaries, previous year papers, and syllabus breakdowns, we help you prepare for exams effectively in half the time.
            </p>
          </div>
        </div>

        {/* BOTTOM FEATURE SECTION */}
        <div className="mt-24 flex flex-col md:flex-row items-center gap-12 bg-slate-900 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="flex-1 space-y-8 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Designed for <br/> maximum efficiency.</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              We don't just provide notes; we provide a strategy to clear your exams without sacrificing your career growth.
            </p>
            <ul className="space-y-4">
              {[
                "Exam-oriented short notes",
                "Simplified language for quick learning",
                "Accessible on any device, anytime"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-slate-300">
                  <div className="bg-blue-500/20 p-1 rounded-full">
                    <CheckCircle size={18} className="text-blue-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 flex justify-center relative z-10">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="w-56 h-56 md:w-72 md:h-72 bg-slate-800 rounded-[2.5rem] border border-slate-700 flex items-center justify-center shadow-inner">
                <BookOpen size={90} className="text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;