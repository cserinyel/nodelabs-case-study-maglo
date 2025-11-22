import { Navigate, Outlet } from "react-router";
import { ROUTES } from "./utils/constants";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.SIGNIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
