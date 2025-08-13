import api from "@/lib/api";
import { FAQsResponse, FAQFilters } from "../faqs.types";

export async function getFaqs(filters?: FAQFilters): Promise<FAQsResponse> {
  const params = new URLSearchParams();
  
  if (filters?.category) {
    params.append("category", filters.category);
  }

  const url = `/marketplace/faqs${params.toString() ? `?${params.toString()}` : ""}`;
  
  try {
    const response = await api.get<FAQsResponse>(url);
    return response.data;
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    throw err;
  }
}
