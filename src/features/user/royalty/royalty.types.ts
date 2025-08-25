export interface CreatorInfo {
  id: string;
  name?: string;
  username?: string;
}

export interface LicenseProduct {
  id: string;
  title: string;
  description?: string;
  thumbnail_url: string;
  current_stage: string;
  current_round: number;
  original_price: number;
  total_licenses: number;
  remaining_licenses: number;
  creator?: CreatorInfo;
}

export interface UserLicenseItem {
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
  purchase_amount: number;
  purchase_date: string;
}

export interface GroupedUserLicenses {
  product: LicenseProduct;
  licenses: UserLicenseItem[];
}

export interface MyLicensesResponse {
  success: boolean;
  message?: string;
  data: {
    licenses: GroupedUserLicenses[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface EligibilityLicenseProduct {
  id: string;
  title: string;
  creator_id: string;
  current_round: number;
  current_stage: string;
}

export interface EligibilityLicense {
  id: string;
  product_id: string;
  license_token: string;
  current_owner_id: string;
  original_owner_id: string;
  purchase_type: string;
  resale_eligible: boolean;
  current_round: number;
  is_listed_for_resale: boolean;
  created_at: string;
  acquired_at: string;
  is_enabled_by_user_for_resale: boolean;
  purchased_round: number;
  is_reserved: boolean;
  reserved_until: string | null;
  reserved_by_user_id: string | null;
  reserved_transaction_id: string | null;
  product: EligibilityLicenseProduct;
}

export interface EligibilityResponse {
  success: boolean;
  data: {
    eligible: boolean;
    license: EligibilityLicense;
    reason: string;
    existingClaim: any | null;
  };
}

export interface PlatformProduct {
  product_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  total_licenses: number;
  allocated_licenses: number;
  available_licenses: number;
}

export interface PlatformProductsResponse {
  success: boolean;
  data: {
    platformProducts: PlatformProduct[];
    totalAvailable: number;
  };
}

export interface ClaimRoyaltyRequest {
  licenseId: string;
  selectedPlatformProductId: string;
}

export interface RoyaltyClaimData {
  royaltyClaim: {
    id: string;
    licensesAwarded: number;
    platformProduct: {
      id: string;
      title: string;
    };
    processedAt: string;
  };
  exitLicense: {
    id: string;
    productTitle: string;
    stage: string;
  };
  message: string;
}

export interface ClaimRoyaltyResponse {
  success: boolean;
  message?: string;
  data: RoyaltyClaimData;
}

export interface RoyaltyHistoryItem {
  id: string;
  user_id: string;
  exit_license_id: string;
  product_id: string;
  claim_date: string;
  status: string;
  royalty_licenses_count: number;
  selected_platform_product_id: string;
  processed_at: string | null;
  processed_by: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  exit_license: {
    id: string;
    product: {
      id: string;
      title: string;
    };
    license_token: string;
  };
  platform_product: {
    id: string;
    title: string;
    thumbnail_url: string;
  };
  distributions: Array<{
    id: string;
    distribution_date: string;
    licenses_allocated: number;
  }>;
}

export interface RoyaltyHistoryResponse {
  success: boolean;
  data: {
    royaltyClaims: RoyaltyHistoryItem[];
    totalClaims: number;
  };
}

export interface AcquiredRoyaltyLicenseItem {
  id: string;
  license_id: string;
  royalty_distribution_id: string;
  original_creator_id: string;
  platform_product_id: string;
  assigned_at: string;
  created_at: string;
  license: {
    id: string;
    acquired_at: string;
    current_owner: {
      id: string;
      email: string;
      last_name: string;
      first_name: string;
    };
    current_round: number;
    license_token: string;
    purchase_type: string;
    resale_eligible: boolean;
    current_owner_id: string;
    is_listed_for_resale: boolean;
  };
  platform_product: {
    id: string;
    title: string;
    current_round: number;
    current_stage: string;
    thumbnail_url: string;
  };
}

export interface AcquiredRoyaltyLicensesResponse {
  success: boolean;
  data: {
    royaltyLicenses: AcquiredRoyaltyLicenseItem[];
    totalLicenses: number;
    activeResales: number;
  };
}
