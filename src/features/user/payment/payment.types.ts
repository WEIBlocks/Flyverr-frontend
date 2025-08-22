export interface OnboardStripeData {
  country: string;
}

export interface StripeConnectStatusResponse {
  success: boolean;
  data: {
    account_id: string;
    charges_enabled: boolean;
  };
}
