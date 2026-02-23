import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Code2, 
  Search, 
  FileText, 
  DownloadCloud, 
  BookOpen,
  GraduationCap,
  ArrowRight
} from "lucide-react";

const Mca = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMca = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/create");
        const data = await res.json();
        const mcaCourses = data.filter(
          (item) => item.courses?.trim().toUpperCase() === "MCA"
        );
        setCourses(mcaCourses);
        setFilteredCourses(mcaCourses);
      } catch (err) {
        console.error("Fetch error");
      } finally {
        setLoading(false);
      }
    };
    fetchMca();
  }, []);

  useEffect(() => {
    const results = courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.topic?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

  // Click handler jo naye page par le jayega
  const handleEnrollClick = (courseName) => {
    // Hum state ke zariye course ka naam naye page par bhej rahe hain
    navigate("/enrollment", { state: { courseName } });
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 animate-pulse h-64"></div>
  );

  return (
    <div className="min-h-screen bg-[#F9FBFF] pb-20 pt-32 px-4 selection:bg-indigo-100">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-100 shadow-sm">
            <Code2 size={14} />
            Postgraduate Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Master of <span className="text-indigo-600">Computer</span> Apps.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium">
            Enroll in professional MCA modules and download advanced tech resources.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative max-w-2xl mx-auto mb-20">
          <div className="absolute inset-y-0 left-5 flex items-center">
            <Search className="text-slate-400" size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search MCA subjects (e.g. Cloud, AI, Java)..."
            className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-indigo-100/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 outline-none transition-all text-slate-700 font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((item) => (
              <div key={item._id} className="group bg-white rounded-[2.5rem] border border-slate-100 p-2 hover:shadow-2xl hover:shadow-indigo-200/40 transition-all duration-500 flex flex-col">
                <div className="p-7 flex-1">
                  <div className="flex justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <FileText size={28} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium">{item.description || "Master these concepts with our professional study modules."}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <BookOpen size={14} className="text-indigo-500" />
                    MCA Unit Hub
                  </div>
                </div>

                <div className="bg-slate-50/50 rounded-[2.2rem] p-4 mt-2 space-y-3">
                  <button 
                    onClick={() => handleEnrollClick(item.name)}
                    className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-600 shadow-md transition-all active:scale-95 group/btn"
                  >
                    <GraduationCap size={20} />
                    Enroll Now
                    <ArrowRight size={16} className="ml-1 opacity-0 group-hover/btn:opacity-100 transition-all group-hover/btn:translate-x-1" />
                  </button>
                  <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-white text-slate-600 px-6 py-3.5 rounded-2xl font-bold hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 transition-all">
                    <DownloadCloud size={18} />
                    Reference PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mca;