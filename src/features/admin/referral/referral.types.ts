export interface ReferralStats {
  totalReferrals: number;
  adminCodeSignups: number;
  totalPaidOut: number;
  signupBonusesPaid: number;
  purchaseBonusesPaid: number;
}

export interface AdminReferralStatsResponse {
  success: boolean;
  data: ReferralStats;
}
