export interface AddReviewData {
  rating: number;
  comment?: string;
}

export interface ReviewUser {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface ProductReview {
  id: string;
  rating: number;
  comment: string;
  is_verified: boolean;
  created_at: string;
  user: ReviewUser;
}

export interface ReviewSummary {
  total_reviews: number;
  average_rating: number;
  rating_counts: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
}

export interface ProductReviewsResponse {
  success: boolean;
  data: {
    product: {
      id: string;
      title: string;
    };
    reviews: ProductReview[];
    summary: ReviewSummary;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
