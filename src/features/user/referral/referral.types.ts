export interface ReferralStats {
  referralCode: string | null;
  canGenerateCode: boolean;
  stats: {
    totalReferrals: number;
    totalEarnings: number;
    signupBonuses: number;
    purchaseBonuses: number;
  };
  recentTransactions: ReferralTransaction[];
}

export interface ReferralTransaction {
  transaction_type: "signup" | "first_purchase";
  amount: string;
  created_at: string;
}

export interface UserReferralStatsResponse {
  success: boolean;
  data: ReferralStats;
}

export interface GenerateReferralCodeResponse {
  success: boolean;
  message: string;
  data: {
    referralCode: string;
  };
}

export interface ValidateReferralCodeRequest {
  referralCode: string;
}

export interface ValidateReferralCodeResponse {
  success: boolean;
  message: string;
  data: {
    valid: boolean;
    type?: "admin" | "user";
    description?: string;
    reason?: string;
  };
}
