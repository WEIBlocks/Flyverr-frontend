import { useQuery } from "@tanstack/react-query";
import { getReferralStats } from "../services/api";
import type { UserReferralStatsResponse } from "../referral.types";

export function useReferralStats() {
  return useQuery<UserReferralStatsResponse>({
    queryKey: ["user", "referral-stats"],
    queryFn: getReferralStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
