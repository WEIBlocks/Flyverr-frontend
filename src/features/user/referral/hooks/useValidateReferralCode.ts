import { useMutation } from "@tanstack/react-query";
import { validateReferralCode } from "../services/api";
import type {
  ValidateReferralCodeRequest,
  ValidateReferralCodeResponse,
} from "../referral.types";
import { swal } from "@/lib/utils";
import { createUserFriendlyError } from "@/lib/errorUtils";
import { ErrorResponse } from "@/lib/types";

export function useValidateReferralCode() {
  return useMutation<
    ValidateReferralCodeResponse,
    ErrorResponse,
    ValidateReferralCodeRequest
  >({
    mutationFn: validateReferralCode,
    onSuccess: (response) => {
      if (response.success) {
        if (response.data.valid) {
          swal(
            "Valid Code",
            response.data.description || "This referral code is valid!",
            "success"
          );
        } else {
          swal(
            "Invalid Code",
            response.data.reason || "This referral code is not valid.",
            "warning"
          );
        }
      } else {
        throw new Error(response.message || "Failed to validate referral code");
      }
    },
    onError: (error: ErrorResponse) => {
      swal("Error", createUserFriendlyError(error), "error");
    },
  });
}
