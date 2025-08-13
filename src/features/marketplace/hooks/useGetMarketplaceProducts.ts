import { useQuery } from "@tanstack/react-query";
import { getMarketplaceProducts } from "../services/api";
import type { MarketplaceFilters, MarketplaceResponse } from "../marketplace.types";

export const useGetMarketplaceProducts = (filters: MarketplaceFilters = {}) => {
  return useQuery({
    queryKey: ["marketplace-products", filters],
    queryFn: async (): Promise<MarketplaceResponse> => {
      const response = await getMarketplaceProducts(filters);
      return response;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
    
