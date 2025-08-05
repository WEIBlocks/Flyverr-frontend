import axios from "axios";
import { storage } from "./utils";

/**
 * Axios instance for all API requests.
 * Configured with base URL, credentials, and timeout.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://flyverr-api-production.up.railway.app/api", // Updated to match your backend
  withCredentials: true, // Send cookies if needed
  timeout: 10000, // 10 seconds timeout
});

/**
 * Request interceptor: Attach auth token if available.
 * You can customize this to use cookies, localStorage, or any auth provider.
 */
api.interceptors.request.use(
  (config) => {
    // Attach token from localStorage
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor: Handle global errors and responses.
 * You can add logging, error notifications, or global redirects here.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      // Optionally, redirect to login or clear auth state
      // window.location.href = "/login";
    }
    // Optionally, handle other status codes or log errors
    return Promise.reject(error);
  }
);

/**
 * Generic API request helper for custom requests.
 * @param config AxiosRequestConfig
 */
export const apiRequest = (config: Parameters<typeof api.request>[0]) => {
  return api.request(config);
};

/**
 * Login API helper
 * @param data { email, password }
 */
export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

/**
 * Signup API helper - Updated to match backend requirements
 * @param data { firstName, lastName, username, email, password }
 */
export const signup = (data: { 
  firstName: string; 
  lastName: string; 
  username: string; 
  email: string; 
  password: string; 
}) => api.post("/auth/signup", data);

/**
 * Forgot Password API helper
 * @param data { email }
 */
export const forgotPassword = (data: { email: string }) =>
  api.post("/auth/forgot-password", data);

/**
 * Reset Password API helper
 * @param data { password, token }
 */
export const resetPassword = (data: { password: string; token: string }) => {
  // console.log("🔍 API Helper - Reset Password Data:", {
  //   password: data.password ? "***" : "undefined",
  //   token: data.token ? data.token.substring(0, 20) + "..." : "undefined"
  // });
  return api.post("/auth/reset-password", data);
};

export default api; 