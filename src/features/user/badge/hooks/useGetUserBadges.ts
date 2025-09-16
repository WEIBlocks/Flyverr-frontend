import { useQuery } from "@tanstack/react-query";
import { getUserBadges } from "../services/api";
import type { UserBadgesResponse } from "../badge.types";

export function useGetUserBadges() {
  return useQuery<UserBadgesResponse>({
    queryKey: ["user", "badges"],
    queryFn: getUserBadges,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
}
