import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayoutMethod, requestPayout } from "../services/api";
import { CreatePayoutMethodRequest, PayoutRequest } from "../payout.types";
import toast from "react-hot-toast";

export function useCreatePayoutMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePayoutMethodRequest) => createPayoutMethod(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payout-info"] });
      toast.success("Payout method added successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to add payout method"
      );
    },
  });
}

export function useRequestPayout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PayoutRequest) => requestPayout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-payouts"] });
      toast.success("Payout request submitted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to request payout");
    },
  });
}
