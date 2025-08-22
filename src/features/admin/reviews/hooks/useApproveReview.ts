import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveReview } from "../services/api";

interface ApproveReviewData {
  approved: boolean;
  adminNotes?: string;
  editedComment?: string;
}

export function useApproveReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, data }: { reviewId: string; data: ApproveReviewData }) => 
      await approveReview(reviewId, data),
    onSuccess: () => {
      // Invalidate and refetch pending reviews
      queryClient.invalidateQueries({ queryKey: ["pending-reviews"] });
    },
  });
}
