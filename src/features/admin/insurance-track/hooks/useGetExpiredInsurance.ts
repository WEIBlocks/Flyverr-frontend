import { useQuery } from "@tanstack/react-query";
import { getExpiredInsurance } from "../services/api";
import { storage } from "@/lib/utils";
import type { InsuranceResponse } from "../insurance.types";

export function useGetExpiredInsurance() {
  const token = storage.getToken();
  return useQuery<InsuranceResponse>({
    queryKey: ["expired-insurance"],
    queryFn: async () => {
      return await getExpiredInsurance();
    },
    enabled: !!token,
  });
}
