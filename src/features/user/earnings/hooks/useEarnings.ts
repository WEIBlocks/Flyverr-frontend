import { useQuery } from "@tanstack/react-query";
import { getEarnings } from "../services/api";

export function useEarnings() {
  return useQuery({
    queryKey: ["earnings"],
    queryFn: getEarnings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
