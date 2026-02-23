import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  UploadCloud, 
  Trash2, 
  Edit3, 
  X,
  ClipboardList,
  Calendar
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("upload");
  const [loading, setLoading] = useState(false);

  // Form States
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [topic, settopic] = useState("");
  const [courses, setcourses] = useState("");
  const [file, setfile] = useState(null);

  // Data States
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]); // New state for Enrollments
  const [editUser, setEditUser] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const token = localStorage.getItem("admintoken");

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users", {
        headers: { token },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users");
    }
  };

  // New: Fetch All Enrollments
  const fetchEnrollments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/enroll/get", {
      });
      setEnrollments(res.data.data);
    } catch (err) {
      console.error("Error fetching enrollments");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchEnrollments();
  }, []);

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
      await axios.post("http://localhost:5000/api/auth/upload", formdata, {
        headers: { token },
      });
      alert("Uploaded successfully!");
      setname(""); setdescription(""); settopic(""); setcourses(""); setfile(null);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/delete/${id}`, { headers: { token } });
      fetchUsers();
    } catch (err) { alert("Delete failed"); }
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/api/auth/update/${editUser._id}`, 
        { email: editEmail, password: editPassword }, { headers: { token } });
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
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col p-6 fixed h-full shadow-2xl">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AdminPro</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem id="upload" label="Upload Content" icon={UploadCloud} />
          <SidebarItem id="users" label="Manage Users" icon={Users} />
          <SidebarItem id="enrollments" label="Enrollments" icon={ClipboardList} />
        </nav>

        <div className="pt-6 border-t border-gray-800">
          <SidebarItem id="logout" label="Logout" icon={LogOut} color="bg-rose-600" />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 p-10">
        
        {/* ENROLLMENTS SECTION */}
        {activePage === "enrollments" && (
          <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <header className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Course Enrollments</h2>
                <p className="text-gray-500">Track which students are enrolled in which courses.</p>
              </div>
              <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                Total Enrollments: {enrollments.length}
              </div>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Student Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Enrolled Course</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Enrollment Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {enrollments.length > 0 ? enrollments.map((en) => (
                    <tr key={en._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">{en.studentName || en.Name}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{en.Email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                          {en.courseName || en.course}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(en.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-gray-400">No enrollments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* UPLOAD SECTION (Existing) */}
        {activePage === "upload" && (
          <div className="max-w-2xl mx-auto">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Upload Content</h2>
              <p className="text-gray-500">Add new learning materials to the platform.</p>
            </header>
            <form onSubmit={Handlesubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Content Name" value={name} onChange={(e) => setname(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none" />
                <input required placeholder="Topic" value={topic} onChange={(e) => settopic(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <input placeholder="Course Category" value={courses} onChange={(e) => setcourses(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none" />
              <textarea rows="3" placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none" />
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 relative">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="text-sm text-gray-600">{file ? file.name : "Click to upload file"}</p>
                </div>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setfile(e.target.files[0])} />
              </div>
              <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all">
                {loading ? "Processing..." : "Publish Content"}
              </button>
            </form>
          </div>
        )}

        {/* USERS SECTION (Existing) */}
        {activePage === "users" && (
          <div className="max-w-5xl mx-auto">
            <header className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
              </div>
            </header>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button onClick={() => { setEditUser(user); setEditEmail(user.email); }} className="text-indigo-600"><Edit3 size={18} /></button>
                        <button onClick={() => deleteUser(user._id)} className="text-rose-600"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LOGOUT CONFIRMATION (Existing) */}
        {activePage === "logout" && (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="bg-white p-10 rounded-2xl shadow-xl border max-w-sm text-center">
              <LogOut size={48} className="mx-auto text-rose-600 mb-4" />
              <h2 className="text-2xl font-bold mb-6">Confirm Logout?</h2>
              <div className="flex gap-4">
                <button onClick={() => setActivePage("upload")} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button onClick={confirmLogout} className="flex-1 py-2 bg-rose-600 text-white rounded-lg">Logout</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* EDIT MODAL (Existing) */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded-lg" />
            <input type="password" placeholder="New Password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} className="w-full mb-6 px-4 py-2 border rounded-lg" />
            <div className="flex gap-2">
              <button onClick={() => setEditUser(null)} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={updateUser} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;