import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/ap";
import { AdminProductsResponse } from "../product.types";

export function useGetAllProducts(page: number = 1, limit: number = 20, status?: string, search?: string) {
  return useQuery({
    queryKey: ["admin-products", page, limit, status, search],
    queryFn: (): Promise<AdminProductsResponse> => getAllProducts(page, limit, status, search),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
