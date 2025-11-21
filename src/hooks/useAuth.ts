import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import type { LoginCredentials, LoginResponse } from "../types/auth";

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
