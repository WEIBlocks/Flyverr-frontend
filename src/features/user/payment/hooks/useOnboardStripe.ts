import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboardStripe } from "../services/api";

import Swal from "sweetalert2";
import { ErrorResponse } from "@/lib/types";
import { storage } from "@/lib/utils";
import { OnboardStripeData } from "../payment.types";
import { createUserFriendlyError } from "@/lib/errorUtils";

export function useOnboardStripe() {
  const queryClient = useQueryClient();
  const token = storage.getToken() as string;
  return useMutation({
    mutationFn: async (data: OnboardStripeData) => {
      return await onboardStripe(data);
    },
    onSuccess: async (data) => {
      // Invalidate relevant queries to refresh user data
      console.log("data", data);
      await queryClient.invalidateQueries({
        queryKey: ["auth", "current-user", token],
      });
    },
    onError: (error: ErrorResponse) => {
      console.error("Error initiating Stripe onboarding:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: createUserFriendlyError(error),
      });
    },
  });
}
