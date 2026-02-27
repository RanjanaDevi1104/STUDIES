import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, ChevronDown, Menu, X, GraduationCap } from "lucide-react";

const Navbar = () => {
  const [showCourses, setShowCourses] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location]);

  // Click outside search to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const courses = [
    { name: "BCA", path: "/bca" },
    { name: "BBA", path: "/bba" },
    { name: "MCA", path: "/mca" },
    { name: "BSc", path: "/bsc" },
    { name: "BA", path: "/ba" },
  ];

  // Handle Input Change and Filter
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim().length > 0) {
      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const foundCourse = courses.find(c => c.name.toLowerCase() === search.trim().toLowerCase());
    if (foundCourse) {
      navigate(foundCourse.path);
      setShowSuggestions(false);
      setSearch("");
    } else {
      alert("Course not found");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 px-1 text-sm font-medium transition-all duration-300 hover:text-blue-400 ${
      isActive ? "text-blue-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400" : "text-gray-300"
    }`;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-slate-900/90 backdrop-blur-lg border-b border-slate-800 py-3" : "bg-slate-900 py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Study<span className="text-blue-500">Ease</span>
            </span>
          </Link>

          {/* Desktop Search with Suggestions */}
          <div className="relative hidden lg:block w-full max-w-sm mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all w-full">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search courses (e.g. BCA, BBA)..."
                className="bg-transparent border-none focus:outline-none px-3 text-sm text-white w-full placeholder-slate-500"
                value={search}
                onChange={handleInputChange}
                onFocus={() => search.length > 0 && setShowSuggestions(true)}
              />
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                {filteredSuggestions.map((course) => (
                  <button
                    key={course.name}
                    onClick={() => {
                      navigate(course.path);
                      setSearch("");
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Search size={14} className="opacity-50" />
                    {course.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              <li><NavLink to="/" className={navLinkClass} end>Home</NavLink></li>
              
              <li className="relative group" 
                  onMouseEnter={() => setShowCourses(true)} 
                  onMouseLeave={() => setShowCourses(false)}>
                <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors py-2">
                  Courses <ChevronDown size={14} className={`transition-transform duration-300 ${showCourses ? "rotate-180" : ""}`} />
                </button>
                
                <div className={`absolute top-full -left-4 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 transition-all duration-200 ${showCourses ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                  {courses.map((course) => (
                    <Link key={course.name} to={course.path} className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-600 hover:text-white transition-colors mx-2 rounded-lg">
                      {course.name}
                    </Link>
                  ))}
                </div>
              </li>

              <li><NavLink to="/enrollmentlist" className={navLinkClass}>EnrollmentList</NavLink></li>
              <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
              <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
            </ul>

            <div className="flex items-center gap-3 border-l border-slate-700 pl-6">
              <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link to="/logout" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg active:scale-95">
                Logout
              </Link>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300">
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-screen border-t" : "max-h-0"}`}>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-2">
            <NavLink to="/" className="px-4 py-2 rounded-lg hover:bg-slate-800 text-gray-300">Home</NavLink>
            <NavLink to="/enrollmentlist" className="px-4 py-2 rounded-lg hover:bg-slate-800 text-gray-300">Enrollments</NavLink>
            <NavLink to="/about" className="px-4 py-2 rounded-lg hover:bg-slate-800 text-gray-300">About</NavLink>
            <NavLink to="/contact" className="px-4 py-2 rounded-lg hover:bg-slate-800 text-gray-300">Contact</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;