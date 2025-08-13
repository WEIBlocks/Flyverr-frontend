import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/api";
import { ProductDetailResponse } from "../product.types";

export function useGetProductById(id: string) {
  return useQuery<ProductDetailResponse>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await getProductById(id);
      return response;
    },
    enabled: !!id, // Only run query if ID is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
