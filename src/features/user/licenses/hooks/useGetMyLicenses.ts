import { useQuery } from "@tanstack/react-query";
import { getMyLicenses } from "../services/apt";
import { useAuth } from "@/contexts/AuthContext";

export function useGetMyLicenses() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["my-licenses"],
    queryFn: async () => await getMyLicenses(),
    enabled: !!isAuthenticated,
  });
}
