import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/api";

// Types based on the API response
interface RoundPricing {
  id: string;
  exit_price: number;
  blossom_price: number;
  evergreen_price: number;
}

interface Creator {
  id: string;
  email: string;
  status: string;
  username: string;
  last_name: string;
  first_name: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  file_type: string;
  file_size: number;
  original_price: number;
  total_licenses: number;
  remaining_licenses: number;
  images_urls: string[];
  current_stage: string;
  dealTypes: string[];
  current_round: number;
  status: string;
  featured: boolean;
  admin_notes: string;
  created_at: string;
  updated_at: string;
  creator: Creator;
  category: Category;
  round_pricing: RoundPricing;
}

interface ProductStatistics {
  totalLicenses: number;
  soldLicenses: number;
  totalTransactions: number;
  totalRevenue: number;
  averagePrice: number;
}

interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: {
    product: Product;
    statistics: ProductStatistics;
    recentActivity: {
      licenses: any[];
      transactions: any[];
    };
  };
}

export function useGetProductById(id: string) {
  return useQuery<ProductDetailResponse>({
    queryKey: ["admin-product", id],
    queryFn: async () => {
      const response = await getProductById(id);
      return response;
    },
    enabled: !!id,
  
  });
}
