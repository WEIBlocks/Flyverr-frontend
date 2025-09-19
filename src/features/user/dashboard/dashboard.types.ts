export interface DashboardStats {
  total_revenue: number;
  active_products: number;
  total_licenses: number;
  sold_licenses: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStats;
}

export interface ResaleListing {
  id: string;
  license_token: string;
  purchase_type: string;
  resale_eligible: boolean;
  current_round: number;
  purchased_round: number;
  is_listed_for_resale: boolean;
  is_enabled_by_user_for_resale: boolean;
  created_at: string;
  acquired_at: string;
  product: {
    id: string;
    title: string;
    thumbnail_url: string;
    current_stage: string;
    current_round: number;
    original_price: number;
    total_licenses: number;
    remaining_licenses: number;
  };
}

export interface ResaleListingsResponse {
  success: boolean;
  message: string;
  data: {
    listings: ResaleListing[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
