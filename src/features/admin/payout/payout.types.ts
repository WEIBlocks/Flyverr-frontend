export interface Payout {
  id: string;
  user_id: string;
  payout_info_id: string;
  amount: number;
  status: "pending" | "completed" | "failed" | "processing";
  request_date: string;
  notes: string | null;
  processed_date?: string | null;
  processed_by?: string | null;
  retry_count?: number | null;
  last_error?: string | null;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  };
}

export interface PayoutResponse {
  success: boolean;
  data: Payout[];
}

export interface PayoutActionResponse {
  success: boolean;
  message: string;
}

export interface PayoutActionRequest {
  approved_amount?: number;
  reason?: string;
}
