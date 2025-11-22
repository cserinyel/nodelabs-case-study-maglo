import axios from "axios";
import { delay } from "../utils/helpers";

const API_BASE_URL = "https://case.nodelabs.dev/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // or your token storage method
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
    await delay(1000); // Simulate network delay

    // Simulate error with 10% chance
    if (Math.random() < 0.5) {
      const simulatedError = {
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
    await delay(1000); // Simulate network delay
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token, redirect to login, etc.
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
