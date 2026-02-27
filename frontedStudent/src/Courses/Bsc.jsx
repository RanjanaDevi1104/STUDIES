import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate import kiya
import { 
  ChevronRight, 
  FlaskConical, 
  Search, 
  FileText, 
  DownloadCloud, 
  BookOpen,
  GraduationCap,
  Microscope,
  ArrowRight
} from "lucide-react";
import { BASE_URL } from "../Apipath";

const Bsc = () => {
  const navigate = useNavigate(); // ✅ navigate initialize kiya
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBsc = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/create`);
        const data = await res.json();
        
        const bscCourses = data.filter(
          (item) => item.courses?.trim().toUpperCase() === "BSC"
        );
        
        setCourses(bscCourses);
        setFilteredCourses(bscCourses);
      } catch (err) {
        console.error("Failed to fetch BSc data");
      } finally {
        setLoading(false);
      }
    };
    fetchBsc();
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-xl mr-4"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-3 bg-gray-50 rounded w-full mb-4"></div>
      <div className="h-10 bg-gray-100 rounded-lg w-full mb-2"></div>
      <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 pt-28 px-4 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-emerald-100">
            <FlaskConical size={16} />
            Science & Research
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            BSc <span className="text-emerald-600">Resource</span> Hub
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Explore comprehensive Bachelor of Science notes, laboratory manuals, and exam resources curated for excellence.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative max-w-lg mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search BSc subjects or topics..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-emerald-200/20 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* CONTENT GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((item) => (
              <div key={item._id} className="group relative">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10 scale-90"></div>
                
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-white transition-all duration-300 h-full flex flex-col">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-600 border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                      <Microscope size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">
                      BSc Academic
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                    {item.description || "In-depth scientific materials and study guides prepared for BSc curriculum standards."}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-4">
                      <BookOpen size={14} className="text-emerald-500" />
                      {item.topic || "Pure Science"}
                    </div>

                    {/* ✅ ENROLL BUTTON UPDATED */}
                    <button 
                      onClick={() => handleEnrollClick(item.name)}
                      className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] group/btn"
                    >
                      <GraduationCap size={18} />
                      Enroll Now
                      <ArrowRight size={16} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                    </button>

                    {/* DOWNLOAD LINK */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-slate-50 text-slate-700 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100 border border-slate-200 transition-all"
                    >
                      <DownloadCloud size={18} className="text-slate-500" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
            <Search size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-800">No BSc notes found</h3>
            <p className="text-slate-500">We couldn't find any resources matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bsc;