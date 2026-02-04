import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  const payload = JSON.parse(atob(token.split(".")[1]));

  return payload.role === "admin"
    ? children
    : <Navigate to="/" />;
};

export default AdminRoute;
