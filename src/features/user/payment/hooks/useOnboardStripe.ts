import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboardStripe } from "../services/apt";

import Swal from "sweetalert2";
import { ErrorResponse } from "@/lib/types";
import { storage } from "@/lib/utils";

export function useOnboardStripe() {
  const queryClient = useQueryClient();
  const token = storage.getToken();
  return useMutation({
    mutationFn: async () => {
      return await onboardStripe();
    },
    onSuccess: async (data) => {
    
      // Invalidate relevant queries to refresh user data
      await queryClient.invalidateQueries({
        queryKey: [, "current-user", token],
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
