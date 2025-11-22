import { redirect } from "react-router";
import { ROUTES } from "./constants";

export const authLoader = (): Response | null => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return redirect(ROUTES.DASHBOARD);
    }
    return null;
  } catch (error) {
    // localStorage might not be available in some environments
    console.error("Error accessing localStorage:", error);
    return null;
  }
};
