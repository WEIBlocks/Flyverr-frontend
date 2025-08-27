import { useQuery } from "@tanstack/react-query";
import { getMarketplaceProducts } from "../services/api";
import type {
  MarketplaceFilters,
  MarketplaceResponse,
} from "../marketplace.types";

export const useGetMarketplaceProducts = (
  filters: MarketplaceFilters = {},
  options: { enabled?: boolean } = {}
) => {
  return useQuery({
    queryKey: ["marketplace-products", filters],
    queryFn: async (): Promise<MarketplaceResponse> => {
      const response = await getMarketplaceProducts(filters);
      return response;
    },
    enabled: options.enabled !== undefined ? options.enabled : true,

  });
};
