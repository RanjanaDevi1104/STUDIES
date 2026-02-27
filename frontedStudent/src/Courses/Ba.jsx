import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Apipath";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate import kiya
import { 
  ChevronRight, 
  Library, 
  Search, 
  FileText, 
  DownloadCloud, 
  BookOpen,
  GraduationCap,
  History,
  ArrowRight
} from "lucide-react";

const Ba = () => {
  const navigate = useNavigate(); // ✅ navigate initialize kiya
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBa = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/create`);
        const data = await res.json();
        
        // ✅ ONLY BA FILES
        const baCourses = data.filter(
          (item) => item.courses?.trim().toUpperCase() === "BA"
        );
        
        setCourses(baCourses);
        setFilteredCourses(baCourses);
      } catch (err) {
        console.error("Failed to fetch BA data");
      } finally {
        setLoading(false);
      }
    };
    fetchBa();
  }, []);

  // Search Logic
  useEffect(() => {
    const results = courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.topic?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

  // ✅ Enroll Click Handler
  const handleEnrollClick = (courseName) => {
    navigate("/enrollment", { state: { courseName } });
  };

  // Loading Skeleton
  const SkeletonCard = () => (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 animate-pulse">
      <div className="w-14 h-14 bg-slate-200 rounded-2xl mb-6"></div>
      <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4"></div>
      <div className="h-3 bg-slate-100 rounded-full w-full mb-2"></div>
      <div className="h-3 bg-slate-100 rounded-full w-2/3 mb-8"></div>
      <div className="h-14 bg-slate-200 rounded-2xl w-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9fe] pb-20 pt-32 px-4 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-violet-100 shadow-sm">
            <Library size={14} />
            Faculty of Humanities & Arts
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Explore <span className="text-violet-600">BA</span> Classics.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
            Access a deep library of literature, history, sociology, and political science resources curated for BA scholars.
          </p>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="relative max-w-2xl mx-auto mb-20 group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-violet-500" size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search subjects (e.g. History, English, Sociology)..."
            className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-violet-200/20 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 outline-none transition-all text-slate-700 font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- GRID SECTION --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((item) => (
              <div key={item._id} className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-100 p-2 hover:shadow-2xl hover:shadow-violet-200/30 hover:border-violet-100 transition-all duration-500">
                <div className="p-7 flex-1">
                  
                  {/* Top Row: Icon & Category */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-violet-600 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500 shadow-inner">
                      <History size={28} strokeWidth={1.5} />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-[11px] font-bold border border-slate-100 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                      {item.topic || "Humanities"}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-violet-600 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {item.description || "Comprehensive academic notes designed to improve your understanding and exam performance."}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-violet-500" />
                      Academic Archive
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-slate-50/50 rounded-[2.2rem] p-4 mt-2">
                  <div className="grid grid-cols-1 gap-3">
                    {/* ✅ ENROLL BUTTON UPDATED */}
                    <button 
                      onClick={() => handleEnrollClick(item.name)}
                      className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-violet-600 shadow-md transition-all active:scale-95 group/btn"
                    >
                      <GraduationCap size={20} />
                      Enroll Now
                      <ArrowRight size={16} className="ml-1 opacity-0 group-hover/btn:opacity-100 transition-all group-hover/btn:translate-x-1" />
                    </button>
                    
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-white text-slate-600 px-6 py-3.5 rounded-2xl font-bold hover:text-violet-600 border border-slate-200 hover:border-violet-200 transition-all active:scale-95"
                    >
                      <DownloadCloud size={18} />
                      Download Notes
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
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No BA notes found</h3>
            <p className="text-slate-500 font-medium">Try searching for subjects like Geography or English.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ba;