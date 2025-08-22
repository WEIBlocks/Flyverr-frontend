import { useQuery } from "@tanstack/react-query";
import { getPayoutInfo } from "../services/api";

export function usePayoutInfo() {
  return useQuery({
    queryKey: ["payout-info"],
    queryFn: getPayoutInfo,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
