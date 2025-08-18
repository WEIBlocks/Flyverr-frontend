export interface AdminUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  role: string;
  status: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  stats: {
    products: number;
    licenses: number;
    transactions: number;
  };
}

export interface UserStatistics {
  totalProducts: number;
  totalLicenses: number;
  totalPurchases: number;
  totalSales: number;
  totalSpent: number;
  totalEarned: number;
}

export interface RecentProduct {
  id: string;
  title: string;
  status: string;
  created_at: string;
  current_stage: string;
  total_licenses: number;
  remaining_licenses: number;
}

export interface RecentActivity {
  products: RecentProduct[];
  licenses: any[];
  transactions: any[];
}

export interface UserDetailResponse {
  success: boolean;
  message: string;
  data: {
    user: AdminUser;
    statistics: UserStatistics;
    recentActivity: RecentActivity;
  };
}

export interface UsersListResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminUser[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
  };
}
