import api from "@/lib/api";

export function getPendingReviews(page: number = 1, limit: number = 20) {
  return api
    .get("/admin/reviews/pending", {
      params: { page, limit },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function approveReview(
  reviewId: string,
  data: { approved: boolean; adminNotes?: string; editedComment?: string }
) {
  return api.post(`/admin/reviews/${reviewId}/approve`, data);
}
