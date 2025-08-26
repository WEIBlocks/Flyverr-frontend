export interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  status: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    email: string;
    avatar_url: string | null;
  };
  product: {
    id: string;
    title: string;
    thumbnail_url: string;
  };
}

export interface PendingReviewsResponse {
  success: boolean;
  data: {
    reviews: ReviewItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface ReviewActionData {
  approved: boolean;
  adminNotes?: string;
  editedComment?: string;
}

export interface ReviewActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: any; // You can define a more specific Review type here
  action: "approve" | "reject";
  onSubmit: (data: ReviewActionData) => void;
  isSubmitting: boolean;
}

export interface ReviewsResponse {
  success: boolean;
  data: {
    reviews: ReviewItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    filters?: {
      status?: string;
      rating?: number | null;
      search?: string;
    };
  };
}
