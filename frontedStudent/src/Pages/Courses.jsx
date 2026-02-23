import React from "react";
import { Link } from "react-router-dom";
import { 
  Code, BarChart3, BookText, Microscope, Terminal, 
  ArrowRight, Sparkles, BookOpen, Layers, Clock 
} from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: "bca",
      icon: <Code size={24} />,
      title: "BCA",
      fullName: "Bachelor of Computer Applications",
      color: "blue",
      notes: "450+ Notes",
      duration: "3 Years",
      description: "Comprehensive study of software, databases, and modern web technologies."
    },
    {
      id: "bba",
      icon: <BarChart3 size={24} />,
      title: "BBA",
      fullName: "Bachelor of Business Administration",
      color: "indigo",
      notes: "320+ Notes",
      duration: "3 Years",
      description: "Developing leadership, marketing strategies, and management skills."
    },
    {
      id: "ba",
      icon: <BookText size={24} />,
      title: "BA",
      fullName: "Bachelor of Arts",
      color: "purple",
      notes: "280+ Notes",
      duration: "3 Years",
      description: "Deep dive into humanities, languages, and social science research."
    },
    {
      id: "bsc",
      icon: <Microscope size={24} />,
      title: "BSc",
      fullName: "Bachelor of Science",
      color: "emerald",
      notes: "400+ Notes",
      duration: "3 Years",
      description: "Analytical study of physics, chemistry, and biological sciences."
    },
    {
      id: "mca",
      icon: <Terminal size={24} />,
      title: "MCA",
      fullName: "Master of Computer Applications",
      color: "rose",
      notes: "500+ Notes",
      duration: "2 Years",
      description: "Advanced algorithms, AI, and enterprise-level software engineering."
    }
  ];

  // Map colors to Tailwind classes
  const colorMap = {
    blue: "text-blue-600 bg-blue-50 border-blue-100 ring-blue-500/20",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100 ring-indigo-500/20",
    purple: "text-purple-600 bg-purple-50 border-purple-100 ring-purple-500/20",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 ring-emerald-500/20",
    rose: "text-rose-600 bg-rose-50 border-rose-100 ring-rose-500/20",
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      
      {/* Header Section */}
      <section className="bg-slate-900 pt-24 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Premium Learning</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Select Your <span className="text-blue-500">Program</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            High-quality, exam-oriented study materials designed to help you excel in your academic journey.
          </p>
        </div>
      </section>

      {/* Course Cards Grid */}
      <main className="max-w-7xl mx-auto px-6 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {courses.map((course) => (
            <Link 
              key={course.id} 
              to={`/${course.id}`}
              className="group bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-400/50 hover:translate-y-[-8px] transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Row: Icon and Category */}
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl shadow-sm border ${colorMap[course.color]}`}>
                  {course.icon}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{course.duration}</span>
                </div>
              </div>

              {/* Course Title */}
              <div className="space-y-3 mb-8">
                <h2 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h2>
                <p className="text-sm font-semibold text-slate-500 leading-tight">
                  {course.fullName}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Stats Footer */}
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Layers size={14} />
                    <span className="text-xs font-bold">{course.notes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock size={14} />
                    <span className="text-xs font-bold">Updated</span>
                  </div>
                </div>
                
                <div className="bg-slate-900 text-white p-2 rounded-full group-hover:bg-blue-600 transition-colors">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}

          {/* Coming Soon Card */}
          <div className="bg-slate-100/50 rounded-[2.5rem] p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
              <BookOpen size={30} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">New Courses</h3>
              <p className="text-sm text-slate-500">Coming soon in 2025</p>
            </div>
          </div>

        </div>

        {/* Support Section */}
        <div className="mt-20 bg-blue-600 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2"></div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Confused about which course to pick?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto font-medium">
              Talk to our academic counselors for a free personalized roadmap.
            </p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all active:scale-95">
              Talk to Counselor
            </button>
        </div>
      </main>
    </div>
  );
};

export default Courses;