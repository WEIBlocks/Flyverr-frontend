import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboardStripe } from "../services/apt";

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
      console.log("Stripe onboarding initiated successfully:", data);
    },
    onError: (error) => {
      console.error("Error initiating Stripe onboarding:", error);
    },
  });
}
