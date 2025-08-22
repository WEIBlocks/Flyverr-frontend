export interface RevenueByType {
  purchase: {
    revenue: string;
    count: number;
  };
  resale: {
    revenue: string;
    count: number;
  };
}

export interface RevenueDataItem {
  period: string;
  totalRevenue: number;
  platformFees: number;
  insuranceFees: number;
  transactionAmount: number;
  transactionCount: number;
  purchaseCount: number;
  resaleCount: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface RevenueOverview {
  totalRevenue: string;
  totalPlatformFees: string;
  totalInsuranceFees: string;
  totalTransactionAmount: string;
  totalTransactions: number;
  avgRevenuePerTransaction: string;
  revenueByType: RevenueByType;
  revenueData: RevenueDataItem[];
  dateRange: DateRange;
}

export interface RevenueResponse {
  success: boolean;
  data: RevenueOverview;
}

// Transaction types
export interface TransactionUser {
  id: string;
  email: string;
  username: string;
  last_name: string;
  first_name: string;
}

export interface TransactionProduct {
  id: string;
  title: string;
  creator: TransactionUser;
  current_round: number;
  current_stage: string;
  thumbnail_url: string;
  original_price: number;
}

export interface Transaction {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  license_id: string;
  transaction_type: "purchase" | "resale";
  purchase_type: "use" | "resell";
  amount: number;
  platform_fee: number;
  creator_royalty: number;
  seller_earnings: number;
  insurance_fee: number;
  has_insurance: boolean;
  payment_method: string;
  payment_intent_id: string | null;
  status: "pending" | "completed" | "failed" | "refunded";
  resale_round: number;
  created_at: string;
  completed_at: string | null;
  buyer: TransactionUser;
  seller: TransactionUser;
  product: TransactionProduct;
}

export interface TransactionPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TransactionSummary {
  totalAmount: string;
  totalPlatformFees: string;
  totalInsuranceFees: string;
  totalRevenue: string;
  transactionCount: number;
}

export interface TransactionsResponse {
  success: boolean;
  data: {
    transactions: Transaction[];
    pagination: TransactionPagination;
    summary: TransactionSummary;
  };
}
