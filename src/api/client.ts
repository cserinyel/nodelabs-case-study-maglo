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
    const token = localStorage.getItem("token"); // or your token storage method
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
