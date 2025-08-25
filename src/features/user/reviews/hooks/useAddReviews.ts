import { useMutation } from "@tanstack/react-query";
import { addReview } from "../services/api";
import { AddReviewData } from "../review.types";

export function useAddReviews() {
  return useMutation({
    mutationFn: async ({
      productId,
      data,
    }: {
      productId: string;
      data: AddReviewData;
    }) => await addReview(productId, data),
  });
}
