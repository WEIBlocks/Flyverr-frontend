import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "../services/api";
import { FAQFilters, FAQsResponse } from "../faqs.types";

export function useGetFaqs(filters?: FAQFilters) {
  return useQuery<FAQsResponse>({
    queryKey: ["faqs", filters],
    queryFn: () => getFaqs(filters),
   
  });
}
