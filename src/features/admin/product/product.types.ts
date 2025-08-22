export interface Creator {
  id: string;
  email: string;
  username: string;
  last_name: string;
  first_name: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface RoundPricing {
  id: string;
  blossom_price: number;
  evergreen_price: number;
  exit_price: number;
}

export interface AdminProduct {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  file_url: string;
  file_type: string;
  file_size: number;
  original_price: number;
  total_licenses: number;
  remaining_licenses: number;
  status: string;
  current_stage: string;
  current_round: number;
  featured: boolean;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  creator: Creator;
  approved_by_admin: Creator | null;
  category: Category | null;
  round_pricing: RoundPricing | null;
}

export interface PendingProduct {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  file_url: string;
  file_type: string;
  file_size: number;
  original_price: number;
  total_licenses: number;
  remaining_licenses: number;
  status: string;
  current_stage: string;
  featured: boolean;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  creator: Creator;
  category: Category | null;
  round_pricing: RoundPricing | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: AdminProduct[];
    pagination: Pagination;
  };
}

export interface PendingProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: PendingProduct[];
    pagination: Pagination;
  };
}

// Product Approval Types
export interface ProductApprovalRequest {
  approved: boolean;
  adminNotes: string;
  roundPricing: {
    originalPrice?: number;
    blossomPrice: number;
    evergreenPrice: number;
    exitPrice: number;
  };
}

export interface ProductApprovalResponse {
  success: boolean;
  message: string;
  data?: {
    product: PendingProduct;
  };
}
