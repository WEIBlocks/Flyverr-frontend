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

export function getAllReviews() {
  return api
    .get("/admin/reviews")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getReviews(params: {
  page?: number;
  limit?: number;
  status?: "pending" | "active" | "rejected" | "deleted" | "all";
  rating?: number | null;
  search?: string;
}) {
  const { page = 1, limit = 20, status, rating, search } = params || {};
  // Send no status param when "all" is selected so backend returns all
  const computedStatus = status && status !== "all" ? status : undefined;

  return api
    .get("/admin/reviews", {
      params: {
        page,
        limit,
        status: computedStatus,
        rating: typeof rating === "number" ? rating : undefined,
        search: search && search.length > 0 ? search : undefined,
      },
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
