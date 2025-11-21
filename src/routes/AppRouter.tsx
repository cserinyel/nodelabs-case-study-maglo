import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../features/auth/shared/authLayout";
import SignIn from "../features/auth/pages/signIn";
import Dashboard from "../features/dashboard/pages/dashboard";
import SignUp from "../features/auth/pages/signUp";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/signin" replace />,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/signin" replace />,
      },
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);

export default AppRouter;
