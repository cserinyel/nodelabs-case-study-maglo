import { redirect } from "react-router";
import { ROUTES } from "./constants";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

export const authLoader = (): Response | null => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      return redirect(ROUTES.DASHBOARD.BASE);
    }
    return null;
  } catch (error) {
    // localStorage might not be available in some environments
    console.error("Error accessing localStorage:", error);
    return null;
  }
};
