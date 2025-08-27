"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { storage, swal } from "@/lib/utils";

import { useAuth } from "@/contexts/AuthContext";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const logout = () => {
    // Clear all stored auth data
    storage.clearAuth();

    // Clear React Query cache
    queryClient.clear();

    setIsAuthenticated(false);

    // Show success message
    swal("Success", "Logged out successfully", "success", () => {
      router.replace("/login");
    });

   
  };

  return { logout };
}
