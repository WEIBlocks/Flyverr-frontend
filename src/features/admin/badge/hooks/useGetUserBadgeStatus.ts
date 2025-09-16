import { useQuery } from "@tanstack/react-query";
import { getUserBadgeStatus } from "../services/api";
import type { UserBadgeStatusResponse } from "../badge.types";

export function useGetUserBadgeStatus(userId: string) {
  return useQuery<UserBadgeStatusResponse>({
    queryKey: ["admin", "user-badge-status", userId],
    queryFn: () => getUserBadgeStatus(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
}
