import axios, { type AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { delay } from "../utils/helpers";
import {
  ACCESS_TOKEN_KEY,
  AUTH_ENDPOINTS,
  AUTH_ERROR_CODES,
  SIMULATED_ERROR_RATE,
} from "../utils/constants";
import { ROUTES } from "../routes/utils/constants";

// Use proxy in dev mode, direct URL in production
const API_BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_URL || "https://case.nodelabs.dev/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Queue item type for pending requests during token refresh
interface QueueItem {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
}

// Token refresh state management
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

// Process queued requests after token refresh
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Handle session expiry - redirect to sign in
const handleSessionExpiry = () => {
  toast.error("Session expired. Redirecting to sign in...", {
    duration: 1000,
  });
  delay(1000).then(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.href = ROUTES.AUTH.SIGNIN;
  });
};

// Perform token refresh
const performTokenRefresh = async (): Promise<string | null> => {
  const response = await axios.post(
    `${API_BASE_URL}/users/refresh-token`,
    {},
    { withCredentials: true }
  );
  const newToken = response.data?.data?.accessToken;
  if (newToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
  }
  return newToken;
};

// Check if URL is an auth endpoint
const isAuthEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
};

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  async (config) => {
    // Skip token check for auth endpoints
    if (isAuthEndpoint(config.url)) {
      return config;
    }

    let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    // If no token and not already refreshing, try to refresh
    if (!accessToken && !isRefreshing) {
      isRefreshing = true;
      try {
        accessToken = await performTokenRefresh();
        processQueue(null, accessToken);
      } catch {
        processQueue(new Error("Session expired"), null);
        handleSessionExpiry();
        return Promise.reject(new Error("Session expired"));
      } finally {
        isRefreshing = false;
      }
    }

    // If refresh is in progress, queue this request
    if (!accessToken && isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            resolve(config);
          },
          reject: (err) => {
            reject(err);
          },
        });
      });
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  async (response) => {
    // Skip simulated delay and errors for auth endpoints
    if (isAuthEndpoint(response.config?.url)) {
      return response;
    }

    // Dev only: simulate network delay
    if (import.meta.env.DEV) {
      await delay(1000);
    }

    // Dev only: simulate random errors (10% chance)
    if (import.meta.env.DEV && Math.random() < SIMULATED_ERROR_RATE) {
      const simulatedError = {
        config: response.config,
        response: {
          status: 500,
          statusText: "Internal Server Error",
          data: { message: "Simulated server error" },
        },
        message: "Request failed with simulated error",
      };
      return Promise.reject(simulatedError);
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const errorCode = error.response?.data?.code;

    // For auth endpoints, pass through all errors without session handling
    // These errors (like INVALID_CREDENTIALS) should be handled by the calling code
    if (isAuthEndpoint(originalRequest?.url)) {
      return Promise.reject(error);
    }

    // Handle known auth error codes that shouldn't trigger session handling
    if (AUTH_ERROR_CODES.includes(errorCode)) {
      return Promise.reject(error);
    }

    // Handle 400 with TOKEN_MISSING - no refresh token cookie
    if (
      error.response?.status === 400 &&
      error.response?.data?.code === "TOKEN_MISSING"
    ) {
      handleSessionExpiry();
      return Promise.reject(error);
    }

    // Handle 401 (expired token) - try to refresh once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue this request while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (token && originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(apiClient(originalRequest));
            },
            reject: (err) => {
              reject(err);
            },
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await performTokenRefresh();
        processQueue(null, newToken);
        isRefreshing = false;

        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch {
        processQueue(new Error("Session expired"), null);
        isRefreshing = false;
        handleSessionExpiry();
        return Promise.reject(new Error("Session expired"));
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
