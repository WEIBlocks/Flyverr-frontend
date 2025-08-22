export interface SponsorshipProduct {
  id: string;
  title: string;
  thumbnail_url: string;
  current_stage: string;
}

export interface SponsorshipCreator {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface Sponsorship {
  id: string;
  product: SponsorshipProduct;
  creator: SponsorshipCreator;
  amount: number;
  payment_method: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  created_at: string;
  completed_at: string | null;
}

export interface SponsorshipPagination {
  total: number;
  limit: string;
  offset: number;
  hasMore: boolean;
}

export interface SponsorshipResponse {
  success: boolean;
  message: string;
  data: {
    sponsorships: Sponsorship[];
    pagination: SponsorshipPagination;
  };
}
