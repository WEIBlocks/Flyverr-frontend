export interface UserStats {
  products: number;
  licenses: number;
  transactions: number;
}

export interface AdminUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  role: string;
  status: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  stats: UserStats;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminUser[];
    pagination: Pagination;
  };
}
