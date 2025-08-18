import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/api";
import { AdminUsersResponse } from "../user.types";

export function useGetUsers(page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ["admin-users", page, limit],
    queryFn: (): Promise<AdminUsersResponse> => getUsers(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
