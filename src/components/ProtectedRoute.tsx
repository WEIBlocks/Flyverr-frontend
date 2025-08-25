"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  // When the route is guest-only (requireAuth=false) and user is authenticated,
  // redirect them here. If not specified, will redirect based on user role.
  redirectTo?: string;
  // Optional role restriction. If provided, authenticated users must match one of these roles.
  allowedRoles?: string[];
}

// Spinner component with smooth animation
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="relative">
      {/* Outer ring */}
      <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-pulse"></div>
      {/* Spinning ring */}
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-flyverr-primary rounded-full animate-spin"></div>
      {/* Inner dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-flyverr-primary rounded-full animate-ping"></div>
    </div>
    <div className="ml-4">
      <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Loading...
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Please wait while we verify your access
      </div>
    </div>
  </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = false,
  redirectTo,
  allowedRoles,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { mounted, isAuthenticated, isLoading } = useAuth();
  const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUser();

  // Set mounted state to prevent hydration mismatch

  // Auth is determined by presence of access token.

  useEffect(() => {
    // Wait until auth check completes to avoid flicker redirects on refresh
    if (!mounted || isLoading) return;

    // Handle page refresh/direct access scenarios
    if (requireAuth) {
      // Protected route: must be authenticated
      if (!isAuthenticated && pathname !== "/" && pathname !== "/marketplace") {
        // User not authenticated, redirect to login
        router.replace("/login");
        return;
      }

      // User is authenticated, check role-based access
      if (isAuthenticated) {
        // Wait for user profile to load to determine role
        if (isUserLoading || !currentUser?.role) return;

        // Check if specific roles are required
        if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
          const userRole = currentUser.role;
          // Allow admins to access routes that allow "user" as well
          const isAllowed =
            allowedRoles.includes(userRole) ||
            (userRole === "admin" && allowedRoles.includes("user"));
          
          if (!isAllowed) {
            // Redirect user to their default dashboard based on role
            const fallback =
              userRole === "admin" ? "/admin/pending-products" : "/user/dashboard";
            router.replace(fallback);
            return;
          }
        }
        
        // If no specific roles required but user is on wrong section (admin vs user)
        // This handles the case where a user refreshes the page
        if (!allowedRoles || allowedRoles.length === 0) {
          const userRole = currentUser.role;
          const isAdminRoute = pathname.startsWith('/admin');
          const isUserRoute = pathname.startsWith('/user');
          
          if ((userRole !== "admin" && isAdminRoute) || 
              (userRole === "admin" && isUserRoute)) {
            // User is in the wrong section based on their role
            const correctPath = userRole === "admin" ? "/admin/pending-products" : "/user/dashboard";
            router.replace(correctPath);
            return;
          }
        }
      }
    }

    // Guest-only route (e.g., login/signup): redirect authenticated users
    if (!requireAuth && isAuthenticated) {
      // Wait for user profile to load to determine role
      if (isUserLoading || !currentUser?.role) return;
      const targetRoute =
        redirectTo ||
        (currentUser.role === "admin"
          ? "/admin/pending-products"
          : "/user/dashboard");
      router.replace(targetRoute);
    }
  }, [
    requireAuth,
    isAuthenticated,
    redirectTo,
    router,
    mounted,
    allowedRoles,
    currentUser,
    isLoading,
    isUserLoading,
    pathname,
  ]);

  // Show loading spinner while checking authentication or loading user profile
  if (!mounted || isLoading) return <LoadingSpinner />;

  // If authenticated but user profile (role) is still loading, show spinner
  if (isAuthenticated && isUserLoading) return <LoadingSpinner />;

  // Show spinner while redirecting for protected routes
  if (requireAuth && !isAuthenticated) return <LoadingSpinner />;

  // Show spinner while redirecting for guest-only routes
  if (!requireAuth && isAuthenticated) return <LoadingSpinner />;

  return <>{children}</>;
};
