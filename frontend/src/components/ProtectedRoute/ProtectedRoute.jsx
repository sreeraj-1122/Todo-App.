import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const authToken = localStorage.getItem("authToken");
  const isLoggedIn = !!authToken;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
