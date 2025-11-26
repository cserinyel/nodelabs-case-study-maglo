import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { ROUTES } from "./utils/constants";
import { ACCESS_TOKEN_KEY } from "../utils/constants";
import { refreshToken } from "../api/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (token) {
        setIsAuthenticated(true);
        setIsChecking(false);
        return;
      }

      // No token found, try to refresh
      try {
        const response = await refreshToken();
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.SIGNIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
