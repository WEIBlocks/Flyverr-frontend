import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services/api";
import type { ReviewsResponse } from "../reviews.types";

export interface UseGetReviewsParams {
  page?: number;
  limit?: number;
  status?: "pending" | "active" | "rejected" | "deleted" | "all";
  rating?: number | null;
  search?: string;
}

export const useGetReviews = (params: UseGetReviewsParams) => {
  const { page = 1, limit = 20, status = "pending", rating = null, search = "" } =
    params || {};

  return useQuery<ReviewsResponse>({
    queryKey: [
      "admin-reviews",
      { page, limit, status, rating: rating ?? null, search: search || "" },
    ],
    queryFn: async () =>
      await getReviews({ page, limit, status, rating: rating ?? null, search }),


  });
};


