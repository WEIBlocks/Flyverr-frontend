import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "../services/api";
import { useAuth } from "@/contexts/AuthContext";
import { UserProductsResponse } from "../product.types";
import { storage } from "@/lib/utils";

export function useGetMyProducts(page = 1, limit = 10, status?: string) {
  const { isAuthenticated } = useAuth();
  const token = storage.getToken();
  return useQuery<UserProductsResponse>({
    queryKey: ["user-products", isAuthenticated, token, page, limit, status],
    queryFn: async () => {
      const response = await getMyProducts(page, limit, status);
      return response;
    },
    enabled: !!isAuthenticated && !!token,
  });
}
