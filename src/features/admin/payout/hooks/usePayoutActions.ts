import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvePayout, rejectPayout, retryPayout } from "../services/api";
import { PayoutActionRequest, PayoutActionResponse } from "../payout.types";

import { swal } from "@/lib/utils";
import { createUserFriendlyError } from "@/lib/errorUtils";

export function useApprovePayout() {
  const queryClient = useQueryClient();

  return useMutation<
    PayoutActionResponse,
    Error,
    { payoutId: string; data?: PayoutActionRequest }
  >({
    mutationFn: async ({ payoutId, data }) =>
      await approvePayout(payoutId, data),
    onSuccess: (data) => {
      swal(
        "Success",
        data.message || "Payout approved successfully",
        "success",
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin-payouts"] });
        }
      );
    },
    onError: (error: any) => {
      swal("Error", createUserFriendlyError(error), "error");
    },
  });
}

export function useRejectPayout() {
  const queryClient = useQueryClient();

  return useMutation<
    PayoutActionResponse,
    Error,
    { payoutId: string; data?: PayoutActionRequest }
  >({
    mutationFn: async ({ payoutId, data }) =>
      await rejectPayout(payoutId, data),
    onSuccess: (data) => {
      swal(
        "Success",
        data.message || "Payout rejected successfully",
        "success",
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin-payouts"] });
        }
      );
    },
    onError: (error: any) => {
      swal("Error", createUserFriendlyError(error), "error");
    },
  });
}

export function useRetryPayout() {
  const queryClient = useQueryClient();

  return useMutation<PayoutActionResponse, Error, string>({
    mutationFn: async (payoutId) => await retryPayout(payoutId),
    onSuccess: (data) => {
      swal(
        "Success",
        data.message || "Payout retry initiated successfully",
        "success",
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin-payouts"] });
        }
      );
    },
    onError: (error: any) => {
      swal("Error", createUserFriendlyError(error), "error");
    },
  });
}
