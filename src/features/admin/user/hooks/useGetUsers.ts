import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/api";
import { UsersListResponse } from "../user.types";

export function useGetUsers(page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ["admin-users", page, limit],
    queryFn: async (): Promise<UsersListResponse> => await getUsers(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
