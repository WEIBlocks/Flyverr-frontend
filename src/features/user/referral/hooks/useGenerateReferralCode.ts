import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateReferralCode } from "../services/api";
import type { GenerateReferralCodeResponse } from "../referral.types";
import { swal } from "@/lib/utils";
import { createUserFriendlyError } from "@/lib/errorUtils";
import { ErrorResponse } from "@/lib/types";

export function useGenerateReferralCode() {
  const queryClient = useQueryClient();

  return useMutation<GenerateReferralCodeResponse, ErrorResponse, void>({
    mutationFn: generateReferralCode,
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate referral stats to refresh the data
        queryClient.invalidateQueries({
          queryKey: ["user", "referral-stats"],
        });

        swal(
          "Success",
          response.message || "Referral code generated successfully!",
          "success"
        );
      } else {
        throw new Error(response.message || "Failed to generate referral code");
      }
    },
    onError: (error: ErrorResponse) => {
      swal("Error", createUserFriendlyError(error), "error");
    },
  });
}
