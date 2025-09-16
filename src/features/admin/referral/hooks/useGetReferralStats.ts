import { useQuery } from "@tanstack/react-query";
import { getAdminReferralStats } from "../services/api";
import type { AdminReferralStatsResponse } from "../referral.types";

export function useGetReferralStats() {
  return useQuery<AdminReferralStatsResponse>({
    queryKey: ["admin", "referral-stats"],
    queryFn: getAdminReferralStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
