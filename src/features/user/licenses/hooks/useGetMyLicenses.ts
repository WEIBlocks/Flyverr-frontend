import { useQuery } from "@tanstack/react-query";
import { getMyLicenses } from "../services/apt";
import { useAuth } from "@/contexts/AuthContext";
import { storage } from "@/lib/utils";

export function useGetMyLicenses(page = 1, limit = 20) {
  const { isAuthenticated } = useAuth();
  const token = storage.getToken();
  return useQuery({
    queryKey: ["my-licenses", page, limit, token],
    queryFn: async () => await getMyLicenses(page, limit),
    enabled: !!isAuthenticated || !!token,
    
  });
}
