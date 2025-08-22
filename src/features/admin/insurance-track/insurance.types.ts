export type InsuranceStatusFilter = "active" | "expired" | "all";

export interface InsuranceQueryParams {
	status?: InsuranceStatusFilter;
	includeResold?: boolean;
	page?: number;
	limit?: number;
}

export interface InsuranceUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
}

export interface InsuranceProduct {
  id: string;
  title: string;
  originalPrice: number;
  currentStage: string;
  currentRound: number;
}

export interface InsuranceLicense {
  id: string;
  licenseToken: string;
  purchaseType: string;
  purchasePrice: number;
  createdAt: string;
}

export interface InsuranceTransaction {
  id: string;
  amount: number;
  feeAmount: number;
  status: string;
  createdAt: string;
}

export interface InsuranceRecord {
  id: string;
  userId: string;
  productId: string;
  licenseId: string;
  transactionId: string;
  insuranceFee: number;
  purchaseDate: string;
  insuranceDeadline: string;
  insuranceStatus: string;
  isResold: boolean;
  resoldAt: string | null;
  refundProcessed: boolean;
  refundProcessedAt: string | null;
  refundProcessedBy: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
  isOverdue: boolean;
  daysOverdue: number;
  user: InsuranceUser;
  product: InsuranceProduct;
  license: InsuranceLicense | null;
  transaction: InsuranceTransaction | null;
}

export interface InsuranceSummary {
  total: number;
  active: number;
  expired: number;
  overdue: number;
  refundProcessed: number;
  totalInsuranceFees: number;
  averageDaysOverdue: number;
}

export interface InsurancePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface InsuranceResponse {
  success: boolean;
  message: string;
  data: {
    records: InsuranceRecord[];
    summary: InsuranceSummary;
    pagination: InsurancePagination;
  };
}
