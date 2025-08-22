export interface Earning {
  id: string;
  amount: number;
  earning_type: "royalty" | "resale";
  is_withdrawn: boolean;
  payout_id: string | null;
  created_at: string;
}

export interface EarningsSummary {
  total: number;
  withdrawn: number;
  reserved: number;
  available: number;
}

export interface EarningsData {
  summary: EarningsSummary;
  earnings: Earning[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface EarningsResponse {
  success: boolean;
  data: EarningsData;
}
