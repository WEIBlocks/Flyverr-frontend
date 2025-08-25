import { useQuery } from "@tanstack/react-query";
import { getEarnings } from "../services/api";

export function useEarnings(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["earnings", page, limit],
    queryFn: () => getEarnings(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
