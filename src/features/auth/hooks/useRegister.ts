import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { signup } from "../services/api";
import type { SignupData } from "../auth.types";
import { useAuth } from "@/contexts/AuthContext";
import { createUserFriendlyError } from "@/lib/errorUtils";
import { ErrorResponse } from "@/lib/types";
import { swal } from "@/lib/utils";

export function useRegister() {
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: SignupData) => await signup(data),
    onSuccess: (response) => {
      const responseData: any = response.data;
      console.log(responseData);

      if (!responseData?.success) {
        throw new Error(responseData?.message || "Registration failed");
      }

      // Tokens are automatically stored by the interceptor
      // Just update the cache and redirect
      const user = responseData.data?.user;
      if (user) {
        swal(
          "Success",
          "Account created successfully! Please verify your email to continue.",
          "success"
        );
      }
    },
    onError: (error: ErrorResponse) => {
      swal("Error", createUserFriendlyError(error), "error");
    },
  });

  return {
    register: mutation.mutate,
    isRegistering: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
}
