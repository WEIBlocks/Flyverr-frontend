import { useQuery } from "@tanstack/react-query";
import { getPendingProducts } from "../services/ap";
import type { PendingProductsResponse } from "../product.types";

interface UseGetPendingProductsParams {
  page?: number;
  limit?: number;
}

export const useGetPendingProducts = (params: UseGetPendingProductsParams = {}) => {
  const { page = 1, limit = 20 } = params;
  
  return useQuery({
    queryKey: ["pending-products", page, limit],
    queryFn: async (): Promise<PendingProductsResponse> => {
      const res = await getPendingProducts(page, limit);
      return res;
    },
  });
};
