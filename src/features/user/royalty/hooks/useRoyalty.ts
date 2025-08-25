import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getMyLicenses,
  checkRoyaltyEligibility,
  getPlatformProducts,
  claimRoyalty,
  getRoyaltyHistory,
  getAcquiredRoyaltyLicenses,
} from "../services/api";
import type { ClaimRoyaltyRequest } from "../royalty.types";

export function useMyLicenses() {
  return useQuery({
    queryKey: ["royalty", "my-licenses"],
    queryFn: getMyLicenses,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useEligibility(licenseId?: string) {
  return useQuery({
    queryKey: ["royalty", "eligibility", licenseId],
    queryFn: () => checkRoyaltyEligibility(licenseId as string),
    enabled: Boolean(licenseId),
    staleTime: 60 * 1000,
  });
}

export function usePlatformProducts() {
  return useQuery({
    queryKey: ["royalty", "platform-products"],
    queryFn: getPlatformProducts,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useClaimRoyalty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ClaimRoyaltyRequest) => claimRoyalty(payload),
    onSuccess: (res) => {
      toast.success(res?.message || "Royalty claimed successfully");
      queryClient.invalidateQueries({ queryKey: ["royalty", "history"] });
      queryClient.invalidateQueries({
        queryKey: ["royalty", "acquired-licenses"],
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to claim royalty");
    },
  });
}

export function useRoyaltyHistory() {
  return useQuery({
    queryKey: ["royalty", "history"],
    queryFn: getRoyaltyHistory,
    staleTime: 60 * 1000,
  });
}

export function useAcquiredRoyaltyLicenses() {
  return useQuery({
    queryKey: ["royalty", "acquired-licenses"],
    queryFn: getAcquiredRoyaltyLicenses,
    staleTime: 60 * 1000,
  });
}
