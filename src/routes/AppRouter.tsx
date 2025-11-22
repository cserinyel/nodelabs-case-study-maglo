import { createBrowserRouter, Navigate, type RouteObject } from "react-router";
import AuthLayout from "../features/auth/shared/authLayout";
import ProtectedRoute from "./ProtectedRoute";
import { authLoader } from "./utils/loaders";
import { ROUTES } from "./utils/constants";
import { lazy } from "react";
import DashboardTemplate from "../features/dashboard/shared/dashboardTemplate";

const SignIn = lazy(() => import("../features/auth/pages/signIn"));
const SignUp = lazy(() => import("../features/auth/pages/signUp"));
const Dashboard = lazy(() => import("../features/dashboard/pages/dashboard"));

const routes: RouteObject[] = [
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.AUTH.SIGNIN} replace />,
  },
  {
    path: ROUTES.AUTH.BASE,
    Component: AuthLayout,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.AUTH.SIGNIN} replace />,
      },
      {
        path: ROUTES.AUTH.SIGNIN,
        Component: SignIn,
      },
      {
        path: ROUTES.AUTH.SIGNUP,
        Component: SignUp,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardTemplate />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        Component: Dashboard,
      },
    ],
  },
];

const AppRouter = createBrowserRouter(routes);

export default AppRouter;
