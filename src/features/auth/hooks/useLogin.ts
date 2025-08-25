import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { login } from "../services/api";
import type { LoginData } from "../auth.types";
import { storage, swal } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
import { ErrorResponse } from "@/lib/types";
import { createUserFriendlyError } from "@/lib/errorUtils";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => await login(data),
    onSuccess: async (response) => {
      const responseData: any = response.data;

      if (!responseData?.success) {
        throw new Error(responseData?.message || "Login failed");
      }

      const user = responseData.data?.user;
      const session = responseData.data?.session;
   
      
      if (!user || !session?.accessToken) {
        throw new Error("Invalid login response - missing user or token");
      }
      

    

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

      Swal.fire({
        title: "Login successful!",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          storage.setToken(session.accessToken);
          storage.setRefreshToken(session.refreshToken);
          storage.setUser(user);
          setIsAuthenticated(true);
          await queryClient.invalidateQueries({ queryKey: ["auth", "user"] });

          // Handle role-based redirect after confirmation
          if (user.profile.role === "admin") {
            router.push("/admin/pending-products");
          } else {
            router.push("/user/dashboard");
          }
        }
      });

      console.log("🔐 Login successful - tokens stored and user redirected");
    },
    onError: (error: ErrorResponse) => {
      swal("Error", createUserFriendlyError(error), "error");
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
