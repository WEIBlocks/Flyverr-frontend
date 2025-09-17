import { useQuery } from "@tanstack/react-query";
import { getResaleListings } from "../services/api";

export function useResaleListings(
  page: number = 1,
  limit: number = 20,
  sold?: boolean
) {
  return useQuery({
    queryKey: ["resale-listings", page, limit, sold],
    queryFn: () => getResaleListings(page, limit, sold),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
