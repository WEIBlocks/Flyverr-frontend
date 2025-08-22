import api from "@/lib/api";
import { AddReviewData } from "../review.types";

export function addReview(productId: string, data: AddReviewData) {
  return api.post(`/reviews/${productId}`, data);
}

export function getMyReviews() {
  return api
    .get(`/reviews/my-reviews`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getProductReviews(productId: string) {
  return api
    .get(`/reviews/product/${productId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
