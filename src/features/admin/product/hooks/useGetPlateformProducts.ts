import { useQuery } from "@tanstack/react-query";
import { getPlatformProducts } from "../services/api";

export function useGetPlatformProducts(
  page: number = 1,
  limit: number = 20,
  status?: string,
  search?: string
) {
  return useQuery({
    queryKey: ["platform-products", { page, limit, status, search }],
    queryFn: async () => await getPlatformProducts(page, limit, status, search),
  
  });
}
