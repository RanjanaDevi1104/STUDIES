// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   Users, 
//   LogOut, 
//   UploadCloud, 
//   Trash2, 
//   Edit3, 
//   X,
//   ClipboardList,
//   Calendar
// } from "lucide-react";
// import { BASE_URL } from "../Apipath";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState("upload");
//   const [loading, setLoading] = useState(false);

//   // Form States
//   const [name, setname] = useState("");
//   const [description, setdescription] = useState("");
//   const [topic, settopic] = useState("");
//   const [courses, setcourses] = useState("");
//   const [file, setfile] = useState(null);

//   // Data States
//   const [users, setUsers] = useState([]);
//   const [enrollments, setEnrollments] = useState([]); // New state for Enrollments
//   const [editUser, setEditUser] = useState(null);
//   const [editEmail, setEditEmail] = useState("");
//   const [editPassword, setEditPassword] = useState("");

//   const token = localStorage.getItem("admintoken");

//   const confirmLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   // Fetch Users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/auth/users`, {
//         headers: { token },
//       });
//       setUsers(res.data.users);
//     } catch (err) {
//       console.error("Error fetching users");
//     }
//   };

//   // New: Fetch All Enrollments
//   const fetchEnrollments = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/enroll/get`, {
//       });
//       setEnrollments(res.data.data);
//     } catch (err) {
//       console.error("Error fetching enrollments");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchEnrollments();
//   }, []);

//   const Handlesubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please select a file");
//     setLoading(true);

//     const formdata = new FormData();
//     formdata.append("name", name);
//     formdata.append("description", description);
//     formdata.append("topic", topic);
//     formdata.append("courses", courses);
//     formdata.append("file", file);

//     try {
//       await axios.post(`${BASE_URL}/api/upload`, formdata, {
//         headers: { token },
//       });
//       alert("Uploaded successfully!");
//       setname(""); setdescription(""); settopic(""); setcourses(""); setfile(null);
//     } catch (err) {
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteUser = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/auth/delete/${id}`, { headers: { token } });
//       fetchUsers();
//     } catch (err) { alert("Delete failed"); }
//   };

//   const updateUser = async () => {
//     try {
//       await axios.put(`${BASE_URL}/api/auth/update/${editUser._id}`, 
//         { email: editEmail, password: editPassword }, { headers: { token } });
//       setEditUser(null);
//       fetchUsers();
//     } catch (err) { alert("Update failed"); }
//   };

//   const SidebarItem = ({ id, label, icon: Icon, color }) => (
//     <button
//       onClick={() => setActivePage(id)}
//       className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//         activePage === id 
//           ? `${color || 'bg-indigo-600'} text-white shadow-lg` 
//           : "text-gray-400 hover:bg-gray-800 hover:text-white"
//       }`}
//     >
//       <Icon size={20} />
//       <span className="font-medium">{label}</span>
//     </button>
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-slate-950 text-white flex flex-col p-6 fixed h-full shadow-2xl">
//         <div className="flex items-center space-x-3 mb-10 px-2">
//           <div className="bg-indigo-500 p-2 rounded-lg">
//             <LayoutDashboard size={24} />
//           </div>
//           <h1 className="text-xl font-bold tracking-tight">AdminPro</h1>
//         </div>

//         <nav className="flex-1 space-y-2">
//           <SidebarItem id="upload" label="Upload Content" icon={UploadCloud} />
//           <SidebarItem id="users" label="Manage Users" icon={Users} />
//           <SidebarItem id="enrollments" label="Enrollments" icon={ClipboardList} />
//         </nav>

//         <div className="pt-6 border-t border-gray-800">
//           <SidebarItem id="logout" label="Logout" icon={LogOut} color="bg-rose-600" />
//         </div>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="ml-64 flex-1 p-10">
        
//         {/* ENROLLMENTS SECTION */}
//         {activePage === "enrollments" && (
//           <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
//             <header className="mb-8 flex justify-between items-end">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900">Course Enrollments</h2>
//                 <p className="text-gray-500">Track which students are enrolled in which courses.</p>
//               </div>
//               <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
//                 Total Enrollments: {enrollments.length}
//               </div>
//             </header>

//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//               <table className="w-full text-left">
//                 <thead className="bg-gray-50 border-b border-gray-100">
//                   <tr>
//                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Student Name</th>
//                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
//                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Enrolled Course</th>
//                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Enrollment Date</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-50">
//                   {enrollments.length > 0 ? enrollments.map((en) => (
//                     <tr key={en._id} className="hover:bg-slate-50 transition-colors">
//                       <td className="px-6 py-4 font-semibold text-gray-900">{en.studentName || en.Name}</td>
//                       <td className="px-6 py-4 text-gray-600 text-sm">{en.Email}</td>
//                       <td className="px-6 py-4">
//                         <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
//                           {en.courseName || en.course}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-gray-500 text-sm flex items-center gap-2">
//                         <Calendar size={14} />
//                         {new Date(en.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   )) : (
//                     <tr>
//                       <td colSpan="4" className="px-6 py-10 text-center text-gray-400">No enrollments found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}


//         {/* UPLOAD SECTION (Existing) */}
//         {activePage === "upload" && (
//           <div className="max-w-2xl mx-auto">
//             <header className="mb-8">
//               <h2 className="text-3xl font-bold text-gray-900">Upload Content</h2>
//               <p className="text-gray-500">Add new learning materials to the platform.</p>
//             </header>
//             <form onSubmit={Handlesubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-5">
//               <div className="grid grid-cols-2 gap-4">
//                 <input required placeholder="Content Name" value={name} onChange={(e) => setname(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none" />
//                 <input required placeholder="Topic" value={topic} onChange={(e) => settopic(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none" />
//               </div>
//               <input placeholder="Course Category" value={courses} onChange={(e) => setcourses(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none" />
//               <textarea rows="3" placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none" />
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 relative">
//                 <div className="text-center">
//                   <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
//                   <p className="text-sm text-gray-600">{file ? file.name : "Click to upload file"}</p>
//                 </div>
//                 <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setfile(e.target.files[0])} />
//               </div>
//               <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all">
//                 {loading ? "Processing..." : "Publish Content"}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* USERS SECTION (Existing) */}
//         {activePage === "users" && (
//           <div className="max-w-5xl mx-auto">
//             <header className="mb-8 flex justify-between items-end">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
//               </div>
//             </header>
//             <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//               <table className="w-full text-left">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="px-6 py-4 text-sm font-semibold">Name</th>
//                     <th className="px-6 py-4 text-sm font-semibold">Email</th>
//                     <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {users.map((user) => (
//                     <tr key={user._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 font-medium">{user.name}</td>
//                       <td className="px-6 py-4">{user.email}</td>
//                       <td className="px-6 py-4 text-right space-x-3">
//                         <button onClick={() => { setEditUser(user); setEditEmail(user.email); }} className="text-indigo-600"><Edit3 size={18} /></button>
//                         <button onClick={() => deleteUser(user._id)} className="text-rose-600"><Trash2 size={18} /></button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* LOGOUT CONFIRMATION (Existing) */}
//         {activePage === "logout" && (
//           <div className="flex items-center justify-center h-[60vh]">
//             <div className="bg-white p-10 rounded-2xl shadow-xl border max-w-sm text-center">
//               <LogOut size={48} className="mx-auto text-rose-600 mb-4" />
//               <h2 className="text-2xl font-bold mb-6">Confirm Logout?</h2>
//               <div className="flex gap-4">
//                 <button onClick={() => setActivePage("upload")} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancel</button>
//                 <button onClick={confirmLogout} className="flex-1 py-2 bg-rose-600 text-white rounded-lg">Logout</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* EDIT MODAL (Existing) */}
//       {editUser && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-8 w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4">Edit User</h3>
//             <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded-lg" />
//             <input type="password" placeholder="New Password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} className="w-full mb-6 px-4 py-2 border rounded-lg" />
//             <div className="flex gap-2">
//               <button onClick={() => setEditUser(null)} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancel</button>
//               <button onClick={updateUser} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg">Save</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, LogOut, UploadCloud, 
  Trash2, Edit3, ClipboardList, FolderOpen 
} from "lucide-react";
import { BASE_URL } from "../Apipath";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("upload");
  const [loading, setLoading] = useState(false);

  // Data States
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [contents, setContents] = useState([]);

  // Form States (Upload)
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [topic, settopic] = useState("");
  const [courses, setcourses] = useState("");
  const [file, setfile] = useState(null);

  // Edit States
  const [editContent, setEditContent] = useState(null);
  const [editName, setEditName] = useState("");
  const [editTopic, setEditTopic] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const token = localStorage.getItem("admintoken");

  // --- API FETCH FUNCTIONS ---
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/users`, { headers: { token } });
      setUsers(res.data.users);
    } catch (err) { console.error("Error fetching users"); }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/enroll/get`);
      setEnrollments(res.data.data || []);
    } catch (err) { console.error("Error fetching enrollments"); }
  };

  const fetchContents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/content/all`); 
      setContents(res.data.data || res.data);
    } catch (err) { console.error("Error fetching contents"); }
  };

  useEffect(() => {
    if (!token) navigate("/login"); // Security check
    fetchUsers();
    fetchEnrollments();
    fetchContents();
  }, [token]);

  // --- ACTION FUNCTIONS ---

  const Handlesubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    setLoading(true);

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("topic", topic);
    formdata.append("courses", courses);
    formdata.append("file", file);

    try {
      await axios.post(`${BASE_URL}/api/upload`, formdata, {
        headers: { token, "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded successfully! ✅");
      setname(""); setdescription(""); settopic(""); setcourses(""); setfile(null);
      fetchContents();
      setActivePage("manage_content");
    } catch (err) {
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // Improved Delete Content Logic (Matches your Backend)
  const deleteContent = async (id) => {
    if (!window.confirm("क्या आप वाकई इस PDF को हमेशा के लिए डिलीट करना चाहते हैं?")) return;
    
    try {
      const res = await axios.delete(`${BASE_URL}/api/auth/content/delete/${id}`, { 
        headers: { token } 
      });

      if (res.data.success || res.status === 200) {
        alert("डिलीट सफल! ✅");
        fetchContents(); 
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert(err.response?.data?.message || "Delete failed. Server error.");
    }
  };

  const updateContent = async () => {
    try {
      await axios.put(`${BASE_URL}/api/auth/content/update/${editContent._id}`, 
        { name: editName, topic: editTopic }, { headers: { token } });
      alert("Updated successfully! ✅");
      setEditContent(null);
      fetchContents();
    } catch (err) { alert("Update failed"); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/auth/delete/${id}`, { headers: { token } });
      fetchUsers();
    } catch (err) { alert("Delete failed"); }
  };

  const updateUser = async () => {
    try {
      await axios.put(`${BASE_URL}/api/auth/update/${editUser._id}`, 
        { email: editEmail, password: editPassword }, { headers: { token } });
      alert("User updated! ✅");
      setEditUser(null);
      fetchUsers();
    } catch (err) { alert("Update failed"); }
  };

  const SidebarItem = ({ id, label, icon: Icon, color }) => (
    <button
      onClick={() => setActivePage(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activePage === id 
          ? `${color || 'bg-indigo-600'} text-white shadow-lg` 
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col p-6 fixed h-full shadow-2xl z-20">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="bg-indigo-500 p-2 rounded-lg text-white"><LayoutDashboard size={24} /></div>
          <h1 className="text-xl font-bold tracking-tight">Admin<span className="text-indigo-400">Ease</span></h1>
        </div>
        <nav className="flex-1 space-y-2">
          <SidebarItem id="upload" label="Upload Content" icon={UploadCloud} />
          <SidebarItem id="manage_content" label="Manage Materials" icon={FolderOpen} />
          <SidebarItem id="users" label="Manage Users" icon={Users} />
          <SidebarItem id="enrollments" label="Enrollments" icon={ClipboardList} />
        </nav>
        <div className="pt-6 border-t border-gray-800">
          <SidebarItem id="logout" label="Logout" icon={LogOut} color="bg-rose-600" />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-64 flex-1 p-10 bg-gray-50">
        
        {/* SECTION: UPLOAD */}
        {activePage === "upload" && (
           <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
             <header className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Publish New PDF</h2>
              <p className="text-gray-500 mt-2">Upload study materials for your students.</p>
            </header>
            <form onSubmit={Handlesubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Content Title" value={name} onChange={(e) => setname(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                <input required placeholder="Topic Name" value={topic} onChange={(e) => settopic(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <input placeholder="Course (BCA, BBA, etc.)" value={courses} onChange={(e) => setcourses(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              <textarea rows="3" placeholder="Brief Description..." value={description} onChange={(e) => setdescription(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-indigo-400 transition-all cursor-pointer relative bg-slate-50">
                <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setfile(e.target.files[0])} />
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">{file ? file.name : "Click to select PDF"}</p>
                <p className="text-xs text-gray-400 mt-1">PDF files only, max 10MB</p>
              </div>

              <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
                {loading ? "Uploading..." : "Publish Content Now"}
              </button>
            </form>
           </div>
        )}

        {/* SECTION: MANAGE MATERIALS */}
        {activePage === "manage_content" && (
          <div className="max-w-6xl mx-auto animate-in fade-in">
            <header className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Manage Materials</h2>
                <p className="text-gray-500">View and manage uploaded PDF files.</p>
              </div>
            </header>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Topic</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contents.length > 0 ? contents.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">{item.name}</td>
                      <td className="px-6 py-4 text-gray-600">{item.topic}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase">{item.courses}</span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => { setEditContent(item); setEditName(item.name); setEditTopic(item.topic); }} className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-lg transition-colors"><Edit3 size={18} /></button>
                        <button onClick={() => deleteContent(item._id)} className="text-rose-600 hover:bg-rose-100 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="px-6 py-20 text-center text-gray-400">No materials found. Upload some content first.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: MANAGE USERS */}
        {activePage === "users" && (
          <div className="max-w-5xl mx-auto animate-in fade-in">
            <header className="mb-8"><h2 className="text-3xl font-bold text-gray-900">User Directory</h2></header>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 font-bold text-gray-600">Name</th>
                    <th className="px-6 py-4 font-bold text-gray-600">Email</th>
                    <th className="px-6 py-4 text-right font-bold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => { setEditUser(user); setEditEmail(user.email); }} className="text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg"><Edit3 size={18} /></button>
                        <button onClick={() => deleteUser(user._id)} className="text-rose-600 p-2 hover:bg-rose-50 rounded-lg"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: ENROLLMENTS */}
        {activePage === "enrollments" && (
          <div className="max-w-6xl mx-auto animate-in fade-in">
            <header className="mb-8 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Course Enrollments</h2>
              <span className="bg-emerald-100 text-emerald-700 px-5 py-1.5 rounded-full font-bold shadow-sm">Total: {enrollments.length}</span>
            </header>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Course Selected</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enrollments.map((en) => (
                    <tr key={en._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">{en.studentName || en.Name}</td>
                      <td className="px-6 py-4 text-gray-600">{en.Email}</td>
                      <td className="px-6 py-4"><span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">{en.courseName || en.course}</span></td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{new Date(en.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: LOGOUT */}
        {activePage === "logout" && (
          <div className="flex items-center justify-center h-[60vh] animate-in zoom-in-95 duration-300">
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 max-w-sm text-center">
              <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
                <LogOut size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Logout</h2>
              <p className="text-gray-500 mb-8">Are you sure you want to end your current session?</p>
              <div className="flex gap-4">
                <button onClick={() => setActivePage("upload")} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all">Cancel</button>
                <button onClick={() => { localStorage.clear(); navigate("/"); }} className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-lg shadow-rose-200 transition-all">Logout</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- EDIT MODALS --- */}
      
      {/* Content Edit */}
      {editContent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Update PDF Info</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Title</label>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-4 py-3 border rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Topic</label>
                <input value={editTopic} onChange={(e) => setEditTopic(e.target.value)} className="w-full px-4 py-3 border rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setEditContent(null)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
              <button onClick={updateContent} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* User Edit */}
      {editUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit User</h3>
            <div className="space-y-4">
              <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="New Email" />
              <input type="password" placeholder="New Password (optional)" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setEditUser(null)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
              <button onClick={updateUser} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold">Update Account</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;