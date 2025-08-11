import axios from "axios";
import { storage } from "./utils";

/**
 * Axios instance for all API requests.
 * Configured with base URL, credentials, and timeout.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://flyverr-api-production.up.railway.app/api",

});

/**
 * Request interceptor: Attach auth token if available.
 * Automatically adds Authorization header to all requests.
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
 * Response interceptor: Handle global error responses.
 * Clears auth data on unauthorized responses.
 */
api.interceptors.response.use(
  (response) => {
    // Just return the response - no automatic token storage
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      // Clear stored auth data on unauthorized
      storage.clearAuth();
      
      // Optionally redirect to login (uncomment if needed)
      // if (typeof window !== 'undefined') {
      //   window.location.href = "/login";
      // }
    }
    
    // Handle token expiration (if you have refresh token logic)
    if (error.response?.status === 403 && error.response?.data?.message?.includes('expired')) {
      // Could implement refresh token logic here
      storage.clearAuth();
    }
    
    return Promise.reject(error);
  }
);

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
  return api.post("/auth/reset-password", data);
};

export default api; 