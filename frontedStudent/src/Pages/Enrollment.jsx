import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  User, Mail, Phone, School, BookOpen, GraduationCap, ArrowRight, ArrowLeft 
} from "lucide-react";

const EnrollForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mca page se bheja gaya course name pakadne ke liye
  const selectedCourse = location.state?.courseName || "General Course";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    className: "",
    college: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/enroll/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course: selectedCourse,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      navigate("/enrollmentlist");
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
  }
};



  return (
    <div className="min-h-screen bg-[#F9FBFF] pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate("/courses")} 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Courses
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          {/* Form Header */}
          <div className="bg-indigo-600 p-10 text-white">
            <GraduationCap size={48} className="mb-4 opacity-80" />
            <h1 className="text-3xl font-black mb-2 tracking-tight">Student Enrollment</h1>
            <p className="text-indigo-100 text-lg font-medium">Registering for: <span className="text-white underline">{selectedCourse}</span></p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <User size={14}/> Full Name
                </label>
                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium" placeholder="Ex: John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={14}/> Email Address
                </label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium" placeholder="Ex: john@study.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Phone size={14}/> Contact No
                </label>
                <input required name="contact" value={formData.contact} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium" placeholder="Ex: 9876543210" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <BookOpen size={14}/> Class / Sem
                </label>
                <input required name="className" value={formData.className} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium" placeholder="Ex: MCA 2nd Sem" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <School size={14}/> College Name
              </label>
              <input required name="college" value={formData.college} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium" placeholder="Ex: University of Technology" />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] mt-6 flex items-center justify-center gap-3 text-lg">
              Confirm & Complete Enrollment <ArrowRight size={22} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollForm;