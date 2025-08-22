"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
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

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = false,
  redirectTo,
  allowedRoles,
}) => {
  const router = useRouter();
  const { mounted, isAuthenticated, isLoading } = useAuth();
  const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUser();

  // Set mounted state to prevent hydration mismatch

  // Auth is determined by presence of access token.

  useEffect(() => {
    // Wait until auth check completes to avoid flicker redirects on refresh
    if (!mounted || isLoading) return;

    // Protected route: must be authenticated
    if (requireAuth && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    // If route requires specific roles, check after authenticated
    if (
      requireAuth &&
      isAuthenticated &&
      Array.isArray(allowedRoles) &&
      allowedRoles.length > 0
    ) {
      // Wait for user profile to load to determine role
      if (isUserLoading || !currentUser?.role) return;
      const userRole = currentUser.role;
      // Allow admins to access routes that allow "user" as well
      const isAllowed =
        allowedRoles.includes(userRole) ||
        (userRole === "admin" && allowedRoles.includes("user"));
      if (!isAllowed) {
        // Redirect user to their default dashboard
        const fallback = userRole === "admin" ? "/admin/pending-products" : "/user/dashboard";
        router.replace(fallback);
        return;
      }
    }

    // Guest-only route (e.g., login/signup): redirect authenticated users
    if (!requireAuth && isAuthenticated) {
      // Wait for user profile to load to determine role
      if (isUserLoading || !currentUser?.role) return;
      const targetRoute =
        redirectTo || (currentUser.role === "admin" ? "/admin/pending-products" : "/user/dashboard");
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
  ]);

  // Prevent flashing content while redirecting
  if (!mounted || isLoading) return null;
  // If authenticated but user profile (role) is still loading, wait
  if (isAuthenticated && isUserLoading) return null;
  if (requireAuth && !isAuthenticated) return null;
  if (!requireAuth && isAuthenticated) return null;

  return <>{children}</>;
};
