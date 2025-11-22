import { Navigate } from "react-router";
import { ROUTES } from "./utils/constants";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.SIGNIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
