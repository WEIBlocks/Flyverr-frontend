import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "../services/api";
import { useAuth } from "@/contexts/AuthContext";
import { UserProductsResponse } from "../product.types";

export function useGetMyProducts() {
  const { user } = useAuth();

  return useQuery<UserProductsResponse>({
    queryKey: ["user-products"],
    queryFn: async () => {
      const response = await getMyProducts();
      return response;
    },
    enabled: !!user ,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}
