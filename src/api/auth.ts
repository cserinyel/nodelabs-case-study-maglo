import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiClient from "./client";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  lastLoginIP: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: UserResponse;
    accessToken: string;
  };
}

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

// React Query hook
export const useLogin = (
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginCredentials>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token if provided
      if (data.data.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
      }
    },
    ...options,
  });
};
