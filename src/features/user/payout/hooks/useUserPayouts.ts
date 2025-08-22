import { useQuery } from "@tanstack/react-query";
import { getUserPayouts } from "../services/api";

export function useUserPayouts() {
  return useQuery({
    queryKey: ["user-payouts"],
    queryFn: getUserPayouts,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
}
