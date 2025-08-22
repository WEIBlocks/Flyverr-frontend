import { useQuery } from "@tanstack/react-query";
import { getMyLicenses } from "../services/apt";
import { useAuth } from "@/contexts/AuthContext";

export function useGetMyLicenses(page = 1, limit = 20) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["my-licenses", page, limit],
    queryFn: async () => await getMyLicenses(page, limit),
    enabled: !!isAuthenticated,
  });
}
