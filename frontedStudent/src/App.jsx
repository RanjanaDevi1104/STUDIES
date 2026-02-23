// import React from "react";
// import { Routes, Route, BrowserRouter } from "react-router-dom";

// import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";

// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";
// import Logout from "./Pages/Logout";
// import Courses from "./Pages/Courses";

// import ProtectedRoute from "./Pages/ProtectedRoute";

// // Course Pages
// import Bca from "./Courses/Bca";
// import Ba from "./Courses/Ba";
// import Bba from "./Courses/Bba";
// import Bsc from "./Courses/Bsc";
// import Mca from "./Courses/Mca";

// // BCA Subjects
// // import Cprogramming from "./Courses/CoursesDetailBCA/Cprogramming";
// // import DataStructures from "./Courses/CoursesDetailBCA/DataStructures";
// // import DBMS from "./Courses/CoursesDetailBCA/DBMS";
// // import OS from "./Courses/CoursesDetailBCA/OS";
// // import CN from "./Courses/CoursesDetailBCA/CN";
// // import WebDev from "./Courses/CoursesDetailBCA/WebDev";

// // BBA Subjects
// // import Accounting from "./Courses/CourseDetailBBA/Accounting";
// // import Economics from "./Courses/CourseDetailBBA/Economics";
// // import HRM from "./Courses/CourseDetailBBA/HRM";
// // import Law from "./Courses/CourseDetailBBA/Law";
// // import Management from "./Courses/CourseDetailBBA/Management";
// // import Marketing from "./Courses/CourseDetailBBA/Marketing";

// // BA Subjects
// // import English from "./Courses/CourseDetailsBA/English";
// // import Hindi from "./Courses/CourseDetailsBA/Hindi";
// // import History from "./Courses/CourseDetailsBA/History";
// // import PoliticalScience from "./Courses/CourseDetailsBA/PoliticalScience";
// // import Psychology from "./Courses/CourseDetailsBA/Psychology";
// // import Sociology from "./Courses/CourseDetailsBA/Sociology";

// // BSC Subjects
// // import Maths from "./Courses/CourseDetailBSC/Math";
// // import Physics from "./Courses/CourseDetailBSC/Physics";
// // import Chemistry from "./Courses/CourseDetailBSC/Chemistry";
// // import Zoology from "./Courses/CourseDetailBSC/Zoology";
// // import Computer from "./Courses/CourseDetailBSC/Computer";

// // MCA Subjects
// // import AI from "./Courses/CourseDetailMCA/AI";
// // import DSA from "./Courses/CourseDetailMCA/DSA";
// // import ML from "./Courses/CourseDetailMCA/ML";
// // import Cloud from "./Courses/CourseDetailMCA/Cloud";
// // import SoftwareEngineering from "./Courses/CourseDetailMCA/SoftwareEngineering";
// // import AdvancedProgramming from "./Courses/CourseDetailMCA/AdvancedProgramming";
// import AdminDashboard from "./Pages/AdminDashboard";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         {/* 🔓 Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/logout" element={<Logout />} />

//         {/* 🔐 Protected Main Route */}
//         <Route
//           path="/courses"
//           element={
//             <ProtectedRoute>
//               <Courses />
//             </ProtectedRoute>
//           }
//         />

//          <Route
//           path="/admindashboard"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* 🔐 Degree Routes */}
//         <Route path="/bca" element={<ProtectedRoute><Bca /></ProtectedRoute>} />
//         <Route path="/ba" element={<ProtectedRoute><Ba /></ProtectedRoute>} />
//         <Route path="/bba" element={<ProtectedRoute><Bba /></ProtectedRoute>} />
//         <Route path="/bsc" element={<ProtectedRoute><Bsc /></ProtectedRoute>} />
//         <Route path="/mca" element={<ProtectedRoute><Mca /></ProtectedRoute>} />
//       </Routes>

//       <Footer />
//     </BrowserRouter>
//   );
// };

// export default App;




import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import Enrollment from "./Pages/Enrollment";
import Contact from "./Pages/Contact";
import Logout from "./Pages/Logout";
import Courses from "./Pages/Courses";
import ProtectedRoute from "./Pages/ProtectedRoute";
import AdminDashboard from "./Pages/AdminDashboard";

// Course Pages
import Bca from "./Courses/Bca";
import Ba from "./Courses/Ba";
import Bba from "./Courses/Bba";
import Bsc from "./Courses/Bsc";
import Mca from "./Courses/Mca";
import EnrollmentList from "./Pages/EnrollmentList";


// 1. Create a Layout Wrapper Component
const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  // Define which paths should NOT show Navbar and Footer
  const hideLayout = location.pathname === "/admindashboard";

  return (
    <>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      {/* 2. Wrap everything inside LayoutWrapper */}
      <LayoutWrapper>
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/enrollmentlist" element={<EnrollmentList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />

          {/* 🔐 Protected Main Route */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 🔐 Degree Routes */}
          <Route path="/bca" element={<ProtectedRoute><Bca /></ProtectedRoute>} />
          <Route path="/ba" element={<ProtectedRoute><Ba /></ProtectedRoute>} />
          <Route path="/bba" element={<ProtectedRoute><Bba /></ProtectedRoute>} />
          <Route path="/bsc" element={<ProtectedRoute><Bsc /></ProtectedRoute>} />
          <Route path="/mca" element={<ProtectedRoute><Mca /></ProtectedRoute>} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
};

export default App;