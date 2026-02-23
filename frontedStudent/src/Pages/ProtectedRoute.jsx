import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("admintoken");
  const role = localStorage.getItem("role");

  // 🔒 Not logged in (neither user nor admin)
  if (!userToken && !adminToken) {
    return <Navigate to="/login" />;
  }

  // 🔐 Role based protection
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
