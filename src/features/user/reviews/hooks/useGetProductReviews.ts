import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "../services/api";

export function useGetProductReviews(productId: string) {
  return useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: async () => await getProductReviews(productId),
  });
}
