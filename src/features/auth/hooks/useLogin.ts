import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { login } from "../services/api";
import type { LoginData } from "../auth.types";
import { storage } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => await login(data),
    onSuccess: async (response) => {
      const responseData = response.data as {
        success: boolean;
        data?: {
          user?: { id: string; email: string };
          session?: {
            accessToken: string;
            refreshToken: string;
            expiresAt?: number;
          };
        };
        message?: string;
      };

      if (!responseData?.success) {
        throw new Error(responseData?.message || "Login failed");
      }

      const user = responseData.data?.user;
      const session = responseData.data?.session;

      if (!user || !session?.accessToken) {
        throw new Error("Invalid login response - missing user or token");
      }

      // Store tokens and user data in localStorage
      storage.setToken(session.accessToken);
      storage.setRefreshToken(session.refreshToken);
      storage.setUser(user);
      setIsAuthenticated(true);

      // Establish Supabase client session on the browser so Storage RLS sees authenticated role
      try {
        await supabase.auth.setSession({
          access_token: session.accessToken,
          refresh_token: session.refreshToken,
        });
      } catch (e) {
        console.error("Failed to set Supabase session on client:", e);
      }

      // Update React Query cache
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });

      // Show success message
      toast.success("Login successful! Welcome back!");

      // Redirect to dashboard
      router.push("/user/dashboard");

      console.log("🔐 Login successful - tokens stored and user redirected");
    },
    onError: (error: unknown) => {
      const apiMessage = (
        error as { response?: { data?: { message?: string } } }
      )?.response?.data?.message;
      const message = apiMessage || (error as Error)?.message || "Login failed";
      toast.error(message);
      console.error("Login error:", error);
    },
  });

  return {
    login: mutation.mutate,
    isLoggingIn: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error as Error | null,
    reset: mutation.reset,
  };
}
