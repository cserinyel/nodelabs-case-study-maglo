import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../features/auth/shared/authLayout";
import SignIn from "../features/auth/pages/signIn";
import Dashboard from "../features/dashboard/pages/dashboard";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "login",
        Component: SignIn,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);

export default AppRouter;
