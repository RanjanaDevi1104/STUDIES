import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate import kiya
import { 
  Terminal, 
  Search, 
  DownloadCloud, 
  BookOpen, 
  GraduationCap, 
  ArrowRight,
  FileCode,
  AlertCircle
} from "lucide-react";

const Bca = () => {
  const navigate = useNavigate(); // ✅ navigate initialize kiya
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBca = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/create");
        const data = await res.json();
        
        const bcaCourses = data.filter((item) => {
          const category = item.courses ? item.courses.trim().toUpperCase() : "";
          return category === "BCA";
        });
        
        setCourses(bcaCourses);
        setFilteredCourses(bcaCourses);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBca();
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = courses.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.topic?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  // ✅ Enroll Click Handler
  const handleEnrollClick = (courseName) => {
    navigate("/enrollment", { state: { courseName } });
  };

  // Loading Skeleton
  const SkeletonCard = () => (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 animate-pulse">
      <div className="w-14 h-14 bg-slate-200 rounded-2xl mb-6"></div>
      <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-3"></div>
      <div className="h-4 bg-slate-100 rounded-full w-full mb-8"></div>
      <div className="h-12 bg-slate-200 rounded-2xl w-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBFDFF] pb-20 pt-32 px-4 selection:bg-blue-100 text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
            <Terminal size={14} />
            BCA Academic Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Master the <span className="text-blue-600">Code.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
            सभी BCA नोट्स और C Programming जैसे महत्वपूर्ण विषयों के संसाधन यहाँ एक ही जगह उपलब्ध हैं।
          </p>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="relative max-w-2xl mx-auto mb-20 group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-blue-500" size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search subjects (e.g. C Programming, Java, Data Structure)..."
            className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-blue-900/5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- CONTENT GRID --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((item) => (
              <div key={item._id} className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-100 p-2 hover:shadow-2xl hover:shadow-blue-200/40 hover:border-blue-200 transition-all duration-500">
                <div className="p-7 flex-1">
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                      <FileCode size={28} strokeWidth={1.5} />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-[11px] font-bold border border-slate-100 uppercase tracking-tighter">
                      {item.topic || "CORE SUBJECT"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
                    {item.description || "In-depth study materials for BCA students to excel in their examinations."}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <BookOpen size={14} className="text-blue-500" />
                    University Resource Hub
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-slate-50/50 rounded-[2.2rem] p-4 mt-2">
                  <div className="grid grid-cols-1 gap-3">
                    {/* ✅ ENROLL BUTTON UPDATED */}
                    <button 
                      onClick={() => handleEnrollClick(item.name)}
                      className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-600 shadow-md transition-all active:scale-95 group/btn"
                    >
                      <GraduationCap size={20} />
                      Enroll Now
                      <ArrowRight size={16} className="ml-1 opacity-0 group-hover/btn:opacity-100 transition-all group-hover/btn:translate-x-1" />
                    </button>
                    
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-white text-slate-600 px-6 py-3.5 rounded-2xl font-bold hover:text-blue-600 border border-slate-200 hover:border-blue-100 transition-all active:scale-95"
                    >
                      <DownloadCloud size={18} />
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- EMPTY STATE --- */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-300">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No matching notes</h3>
            <p className="text-slate-500 font-medium px-4">हमें "{searchTerm}" से मिलता-जुलता कोई डेटा नहीं मिला।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bca;