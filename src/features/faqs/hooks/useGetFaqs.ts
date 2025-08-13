import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "../services/api";
import { FAQFilters, FAQsResponse } from "../faqs.types";

export function useGetFaqs(filters?: FAQFilters) {
  return useQuery<FAQsResponse>({
    queryKey: ["faqs", filters],
    queryFn: () => getFaqs(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
