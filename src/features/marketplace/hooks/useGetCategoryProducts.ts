"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryProducts } from "../services/api";

type CategoryType = "all" | "trending" | "featured" | "sponsored" | "hot_deals";

export function useGetCategoryProducts(
  type: CategoryType,
  {
    limit = 20,
    page = 1,
    enabled = true,
  }: { limit?: number; page?: number; enabled?: boolean } = {}
) {
  return useQuery({
    queryKey: ["category-products", type, limit, page],
    queryFn: async () => {
      const res = await getCategoryProducts({ type, limit, page });
      return res as {
        success: boolean;
        data: { category: string; products: any[]; pagination: any };
      };
    },
    enabled,
   
  });
}
