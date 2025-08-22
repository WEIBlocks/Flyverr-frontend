export interface PayoutMethod {
  id: string;
  payment_method: string;
  account_details: {
    note?: string;
    [key: string]: any;
  };
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PayoutMethodsData {
  active: PayoutMethod[];
  inactive: PayoutMethod[];
  all: PayoutMethod[];
}

export interface PayoutSummary {
  totalMethods: number;
  activeMethods: number;
  inactiveMethods: number;
  verifiedMethods: number;
  unverifiedMethods: number;
  hasPayoutMethod: boolean;
  hasActivePayoutMethod: boolean;
  hasVerifiedPayoutMethod: boolean;
}

export interface PayoutInfoResponse {
  success: boolean;
  data: {
    primaryPayoutMethod: PayoutMethod | null;
    payoutMethods: PayoutMethodsData;
    summary: PayoutSummary;
  };
}

export interface CreatePayoutMethodRequest {
  payment_method: string;
  account_details: {
    note?: string;
    [key: string]: any;
  };
}

export interface CreatePayoutMethodResponse {
  success: boolean;
  data: {
    id: string;
  };
}

export interface PayoutRequest {
  amount: number;
  payout_info_id: string;
  notes: string;
}

export interface PayoutRequestResponse {
  success: boolean;
  data: {
    id: string;
    amount: number;
    status: string;
  };
}

export interface UserPayout {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed" | "processing";
  request_date: string;
  processed_date: string | null;
  notes: string;
}

export interface UserPayoutsResponse {
  success: boolean;
  data: UserPayout[];
}
