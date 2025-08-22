import { useQuery } from "@tanstack/react-query";
import { getExpiredInsurance } from "../services/api";
import { storage } from "@/lib/utils";
import type { InsuranceResponse } from "../insurance.types";
import type { InsuranceQueryParams } from "../insurance.types";

export function useGetExpiredInsurance(params: InsuranceQueryParams = {}) {
  const token = storage.getToken();
  const {
    status = "expired",
    includeResold = false,
    page = 1,
    limit = 20,
  } = params;

  return useQuery<InsuranceResponse>({
    queryKey: [
      "expired-insurance",
      { status, includeResold, page, limit },
    ],
    queryFn: async () => {
      return await getExpiredInsurance({ status, includeResold, page, limit });
    },
    enabled: !!token,
    placeholderData: (previousData) => previousData as InsuranceResponse | undefined,
  });
}
