import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "../services/api";
import { useAuth } from "@/contexts/AuthContext";
import { UserProductsResponse } from "../product.types";
import { storage } from "@/lib/utils";

export function useGetMyProducts() {
  const { isAuthenticated } = useAuth();
  const token = storage.getToken();
  return useQuery<UserProductsResponse>({
    queryKey: ["user-products", isAuthenticated, token],
    queryFn: async () => {
      const response = await getMyProducts();
      return response;
    },
    enabled: !!isAuthenticated && !!token,
  });
}
