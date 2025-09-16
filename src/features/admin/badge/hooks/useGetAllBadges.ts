import { useQuery } from "@tanstack/react-query";
import { getAllBadges } from "../services/api";
import type { AllBadgesResponse } from "../badge.types";

export function useGetAllBadges() {
  return useQuery<AllBadgesResponse>({
    queryKey: ["admin", "all-badges"],
    queryFn: getAllBadges,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
