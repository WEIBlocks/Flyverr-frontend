import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../services/api";
import { TransactionsResponse } from "../revenue.types";

export function useGetTransactions(
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
  return useQuery<TransactionsResponse>({
    queryKey: [
      "admin-transactions",
      page,
      limit,
      status,
      transactionType,
      search,
      startDate,
      endDate,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const response = await getTransactions(
        page,
        limit,
        status,
        transactionType,
        search,
        startDate,
        endDate,
        sortBy,
        sortOrder
      );
      return response;
    },
   
  });
}
