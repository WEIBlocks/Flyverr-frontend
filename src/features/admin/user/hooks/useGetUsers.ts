import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/api";
import { UsersListResponse } from "../user.types";
import { storage } from "@/lib/utils";

export function useGetUsers(page: number = 1, limit: number = 50) {
  const token = storage.getToken();
  return useQuery({
    queryKey: ["admin-users", page, limit, token],
    queryFn: async (): Promise<UsersListResponse> =>
      await getUsers(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!token,
  });
}
