import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import ErrorOverlay from "../shared/components/errorOverlay/errorOverlay";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;
  let errorTitle: string = "Error";

  if (isRouteErrorResponse(error)) {
    errorTitle = error.status === 404 ? "Page Not Found" : "Error";
    errorMessage =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.statusText ||
          error.data?.message ||
          "An unexpected error occurred";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "An unknown error occurred";
  }

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4" role="main">
      <article className="w-full max-w-2xl">
        <ErrorOverlay
          error={new Error(errorMessage)}
          onClick={handleGoHome}
          buttonText="Go Home"
          title={errorTitle}
        />
      </article>
    </main>
  );
}
