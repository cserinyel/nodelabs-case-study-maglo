import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import "./Main.css";
import AppRouter from "./routes/AppRouter.tsx";
import ToastManager from "./features/toast/toastManager.tsx";
import ErrorBoundary from "./shared/components/errorBoundary/errorBoundary.tsx";
import { Tooltip } from "react-tooltip";

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <ToastManager>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
      </QueryClientProvider>
    </ToastManager>
    <Tooltip
      id="global-tooltip"
      place="top"
      delayShow={150}
      opacity={1}
      variant="dark"
      style={{
        color: "var(--light-color)",
        fontSize: "14px",
        lineHeight: "100%",
        fontWeight: "500",
        backgroundColor: "var(--accent-color)",
        borderRadius: "5px",
        padding: "10px 15px",
        border: "none",
      }}
    />
  </ErrorBoundary>
);
