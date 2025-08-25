import { useQuery } from "@tanstack/react-query";
import { getPendingReviews } from "../services/api";
import type { PendingReviewsResponse } from "../reviews.types";

interface UseGetPendingReviewParams {
  page?: number;
  limit?: number;
}

export const useGetPendingReview = ({ page = 1, limit = 20 }: UseGetPendingReviewParams = {}) => {
  return useQuery<PendingReviewsResponse>({
    queryKey: ["pending-reviews", page, limit],
    queryFn: async () => await getPendingReviews(page, limit),
  });
};
