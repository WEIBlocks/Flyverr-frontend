"use client";

import { useQuery } from "@tanstack/react-query";
import { getMarketplaceProducts } from "../services/api";
import { useCategoryPreferences } from "./useCategoryPreferences";
import type { MarketplaceProduct } from "../marketplace.types";

export function useRecommendedProducts(limitPerCategory = 6) {
  const { getMostRecentCategory } = useCategoryPreferences();
  const mostRecent = getMostRecentCategory();

  return useQuery({
    queryKey: ["recommended-products", mostRecent, limitPerCategory],
    queryFn: async (): Promise<MarketplaceProduct[]> => {
      if (!mostRecent) return [];
      const response = await getMarketplaceProducts({
        category: mostRecent,
        limit: limitPerCategory,
      });
      return (response.data.products as MarketplaceProduct[]).filter(
        (p) => p.category_id === mostRecent
      );
    },
    enabled: true,
   
  });
}
