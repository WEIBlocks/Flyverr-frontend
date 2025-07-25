import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

/**
 * Axios instance for all API requests.
 * Configured with base URL, credentials, and timeout.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api", // Set your API base URL
  withCredentials: true, // Send cookies if needed
  timeout: 10000, // 10 seconds timeout
});

/**
 * Request interceptor: Attach auth token if available.
 * You can customize this to use cookies, localStorage, or any auth provider.
 */
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Example: Attach token from localStorage (customize as needed)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * Response interceptor: Handle global errors and responses.
 * You can add logging, error notifications, or global redirects here.
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
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
export const apiRequest = <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api.request<T>(config);
};

/**
 * Login API helper
 * @param data { email, password }
 */
export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

/**
 * Signup API helper
 * @param data { name, email, password }
 */
export const signup = (data: { name: string; email: string; password: string }) =>
  api.post("/auth/signup", data);

export default api; 