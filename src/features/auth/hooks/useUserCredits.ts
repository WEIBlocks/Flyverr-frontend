import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface UserCredits {
  available_credits: number;
  has_used_credit: boolean;
  credit_amount: number;
}

interface UserCreditsResponse {
  success: boolean;
  data: UserCredits;
}

export function useUserCredits() {
  return useQuery({
    queryKey: ["user-credits"],
    queryFn: async (): Promise<UserCredits> => {
      const response = await api.get<UserCreditsResponse>("/auth/credits");
      return response.data.data;
    },
    staleTime: 0, // Always consider data stale - refetch on every mount
    gcTime: 0, // Don't cache data - always fetch fresh
    retry: 1,
  });
}
