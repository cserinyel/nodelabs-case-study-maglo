import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiClient from "./client";
import { useNavigate } from "react-router";
import { ROUTES } from "../routes/utils/constants";
import type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
} from "../types/auth";
import toast from "react-hot-toast";

// API function
export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/users/login",
    credentials
  );
  return response.data;
};

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    "/users/register",
    credentials
  );
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  const response = await apiClient.post<void>("/users/logout");
  return response.data;
};

// React Query hook
export const useLogin = (
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginCredentials>,
    "mutationFn"
  >
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token if provided
      localStorage.setItem("accessToken", data?.data.accessToken);
      toast.success(`Welcome back! ${data?.data.user.fullName}`);
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    },
    ...options,
  });
};

export const useRegister = (
  options?: Omit<
    UseMutationOptions<RegisterResponse, Error, RegisterCredentials>,
    "mutationFn"
  >
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      console.log("Register successful");
      toast.success("Account created successfully. Please login to continue.");
      navigate(ROUTES.AUTH.SIGNIN);
    },
    onError: (error) => {
      console.error("Register failed:", error);
      toast.error("Account creation failed. Please try again.");
    },
    ...options,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.clear(); // Clear all React Query cache
      toast.success("Logged out successfully.");
      navigate(ROUTES.AUTH.SIGNIN, { replace: true });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    },
  });
};
