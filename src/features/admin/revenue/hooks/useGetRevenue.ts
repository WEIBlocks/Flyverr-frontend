import { useQuery } from "@tanstack/react-query";
import { getRevenueOverview } from "../services/api";
import { RevenueResponse } from "../revenue.types";

export function useGetRevenue() {
  return useQuery<RevenueResponse>({
    queryKey: ["admin-revenue"],
    queryFn: async () => {
      const response = await getRevenueOverview();
      return response;
    },
    
  });
}
