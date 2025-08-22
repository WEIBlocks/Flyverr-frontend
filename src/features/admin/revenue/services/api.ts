import api from "@/lib/api";

export function getRevenueOverview() {
  return api
    .get("/admin/transactions/revenue")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getTransactions(
  page: number = 1,
  limit: number = 20,
  status?: string,
  transactionType?: string,
  search?: string,
  startDate?: string,
  endDate?: string,
  sortBy?: string,
  sortOrder?: string
) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (status) {
    params.append("status", status);
  }
  if (transactionType) {
    params.append("transaction_type", transactionType);
  }
  if (search) {
    params.append("search", search);
  }
  if (startDate) {
    params.append("start_date", startDate);
  }
  if (endDate) {
    params.append("end_date", endDate);
  }
  if (sortBy) {
    params.append("sort_by", sortBy);
  }
  if (sortOrder) {
    params.append("sort_order", sortOrder);
  }

  return api
    .get(`/admin/transactions?${params.toString()}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
