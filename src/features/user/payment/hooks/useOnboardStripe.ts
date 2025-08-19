import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboardStripe } from "../services/apt";

import Swal from "sweetalert2";
import { ErrorResponse } from "@/lib/types";

export function useOnboardStripe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await onboardStripe();
    },
    onSuccess: (data) => {
    
      // Invalidate relevant queries to refresh user data
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-user"],
      });

     
    },
    onError: (error: ErrorResponse) => {
      console.error("Error initiating Stripe onboarding:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: error?.data?.response?.message,
      });
    },
  });
}
