import { useQuery } from "@tanstack/react-query";
import { getMyLicenses } from "../services/apt";
import { a } from "framer-motion/client";
import { useAuth } from "@/contexts/AuthContext";

export function useGetMyLicenses() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-licenses"],
    queryFn: async () => await getMyLicenses(),
    enabled: !!user,
  });
}
