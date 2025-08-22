import { TrendingUp, Gift, Flame, Zap } from "lucide-react";

export interface MarketplaceFilters {
  category?: string;
  stage?: "newboom" | "blossom" | "evergreen" | "exit";
  featured?: boolean;
  trending?: boolean;
  recommended?: boolean;
  hotDeals?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: "created_at" | "price" | "title" | "remaining_licenses";
  sortOrder?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  original_price: number;
  current_price: number;
  total_licenses: number;
  remaining_licenses: number;
  current_stage: "newboom" | "blossom" | "evergreen" | "exit";
  featured: boolean;
  created_at: string;
  creator_id: string;
  category_id: string | null;
  is_platform_product: boolean;
  stage_pricing: {
    newboom: number;
    blossom: number;
    evergreen: number;
    exit: number;
  } | null;
}

export interface ProductDetail {
  id: string;
  creator_id: string;
  category_id: string | null;
  title: string;
  description: string;
  thumbnail_url: string;
  file_url: string;
  file_type: string;
  file_size: number;
  original_price: number;
  total_licenses: number;
  remaining_licenses: number;
  current_stage: "newboom" | "blossom" | "evergreen" | "exit";
  current_round: number;
  status: string;
  featured: boolean;
  admin_notes: string;
  is_platform_product: boolean;
  created_at: string;
  updated_at: string;
  approved_at: string;
  approved_by: string;
  images_urls: string[];
  current_price: number;
  stage_pricing: {
    newboom: number;
    blossom: number;
    evergreen: number;
    exit: number;
  };
  file_size_formatted: string;
  sold_licenses: number;
  availability_percentage: number;
}

export interface MarketplaceResponse {
  success: boolean;
  message: string;
  data: {
    products: MarketplaceProduct[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
      hasMore: boolean;
    };
  };
}

export interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: ProductDetail;
}

export interface AvailableLicensesResponse {
  success: boolean;
  data: {
    product: {
      id: string;
      title: string;
      current_stage: "newboom" | "blossom" | "evergreen" | "exit";
      current_round: number;
      remaining_licenses: number;
    };
    available_licenses: any[]; // You can define a more specific type if needed
    total_available: number;
  };
}

export const resaleStages = [
  {
    id: "newboom",
    name: "Newboom",
    icon: Gift,
    color: "bg-green-500",
    description: "Never resold",
  },
  {
    id: "blossom",
    name: "Blossom",
    icon: TrendingUp,
    color: "bg-blue-500",
    description: "1st resale cycle",
  },
  {
    id: "evergreen",
    name: "Evergreen",
    icon: Flame,
    color: "bg-purple-500",
    description: "2nd resale cycle",
  },
  {
    id: "exit",
    name: "Exit",
    icon: Zap,
    color: "bg-orange-500",
    description: "3rd resale cycle",
  },
];
