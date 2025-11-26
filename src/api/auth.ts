import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiClient from "./client";
import { useNavigate } from "react-router";
import { ROUTES } from "../routes/utils/constants";
import { ACCESS_TOKEN_KEY } from "../utils/constants";
import type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  RefreshTokenResponse,
} from "../types/auth";
import useAuthStore from "../store/authStore";

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

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  // TODO: Add toast notification for token refresh
  const response = await apiClient.post<RefreshTokenResponse>(
    "/users/refresh-token"
  );
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
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token if provided
      localStorage.setItem(ACCESS_TOKEN_KEY, data?.data.accessToken);
      // Store user in Zustand
      setUser(data?.data.user);
      navigate(ROUTES.DASHBOARD.BASE);
    },
    onError: (error) => {
      console.error("Login failed:", error);
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
      navigate(ROUTES.AUTH.SIGNIN);
    },
    onError: (error) => {
      console.error("Register failed:", error);
    },
    ...options,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      clearUser();
      queryClient.clear(); // Clear all React Query cache
      navigate(ROUTES.AUTH.SIGNIN, { replace: true });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data?.data.accessToken);
    },
    onError: (error) => {
      console.error("Token refresh failed:", error);
    },
  });
};
