import axios from "axios";
import { storage } from "./utils";

interface RefreshTokenResponse {
  success: boolean;
  data: {
    session: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  };
}

/**
 * Axios instance for all API requests.
 * Configured with base URL, credentials, and timeout.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
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
 * Automatically refreshes tokens on 401 errors.
 */
api.interceptors.response.use(
  (response) => {
    // Just return the response - no automatic token storage
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized with automatic token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = storage.getRefreshToken();

      if (refreshToken) {
        try {
          // Call refresh token API
          const response = await axios.post(
            `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
            }/auth/refresh`,
            { refreshToken }
          );

          const refreshData = response.data as RefreshTokenResponse;
          if (refreshData.success) {
            // Store new tokens
            storage.setToken(refreshData.data.session.accessToken);
            storage.setRefreshToken(refreshData.data.session.refreshToken);

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${refreshData.data.session.accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // If refresh fails, clear auth and redirect to login
          storage.clearAuth();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      } else {
        // No refresh token available, clear auth and redirect to login
        storage.clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    // Handle token expiration (if you have refresh token logic)
    if (
      error.response?.status === 403 &&
      error.response?.data?.message?.includes("expired")
    ) {
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
 * @param data { firstName, lastName, username, email, password, referralCode }
 */
export const signup = (data: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  referralCode: string;
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
