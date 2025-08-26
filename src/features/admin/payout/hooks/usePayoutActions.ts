import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvePayout, rejectPayout, retryPayout } from "../services/api";
import { PayoutActionRequest, PayoutActionResponse } from "../payout.types";
import toast from "react-hot-toast";

export function useApprovePayout() {
  const queryClient = useQueryClient();

  return useMutation<
    PayoutActionResponse,
    Error,
    { payoutId: string; data?: PayoutActionRequest }
  >({
    mutationFn: async ({ payoutId, data }) => await approvePayout(payoutId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-payouts"] });
      toast.success(data.message || "Payout approved successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to approve payout");
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
    mutationFn: async ({ payoutId, data }) => await rejectPayout(payoutId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-payouts"] });
      toast.success(data.message || "Payout rejected successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to reject payout");
    },
  });
}

export function useRetryPayout() {
  const queryClient = useQueryClient();

  return useMutation<PayoutActionResponse, Error, string>({
    mutationFn: async (payoutId) => await retryPayout(payoutId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-payouts"] });
      toast.success(data.message || "Payout retry initiated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to retry payout");
    },
  });
}
