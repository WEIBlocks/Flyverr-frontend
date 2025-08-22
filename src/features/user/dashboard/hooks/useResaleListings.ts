import { useQuery } from "@tanstack/react-query";
import { getResaleListings } from "../services/api";

export function useResaleListings(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ["resale-listings", page, limit],
    queryFn: () => getResaleListings(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
