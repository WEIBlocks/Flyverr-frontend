import { useQuery } from "@tanstack/react-query";
import { getPayouts } from "../services/api";
import { PayoutResponse } from "../payout.types";

export function useGetPayouts(status?: string) {
  return useQuery<PayoutResponse>({
    queryKey: ["admin-payouts", status],
    queryFn: async () => {
      const response = await getPayouts(status);
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
