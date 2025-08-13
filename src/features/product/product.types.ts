export type Product = {
    id?: string;
    title: string;
    description: string;
    // categoryId: string;
    thumbnailUrl: string;
    imagesUrls: string[];
    fileUrl: string;
    fileType: string;
    fileSize: number;
    originalPrice: string;
    totalLicenses: string;
}

// API Response types for user products
export interface UserProduct {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  file_type: string;
  original_price: number;
  total_licenses: number;
  remaining_licenses: number;
  status: string;
  current_stage: string;
  featured: boolean;
  admin_notes: string | null;
  created_at: string;
  approved_at: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface UserProductsResponse {
  success: boolean;
  data: {
    products: UserProduct[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Product Detail types
export interface ProductCreator {
  id: string;
  email: string;
  username: string;
  last_name: string;
  first_name: string;
}

export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
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
  creator: ProductCreator;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface ProductDetailResponse {
  success: boolean;
  data: {
    product: ProductDetail;
  };
}