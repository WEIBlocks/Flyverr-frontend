import { useQuery } from "@tanstack/react-query";
import { getUsers, searchUsers } from "../services/api";
import { UsersListResponse } from "../user.types";
import { storage } from "@/lib/utils";

export function useGetUsers(page: number = 1, limit: number = 50) {
  const token = storage.getToken();
  return useQuery({
    queryKey: ["admin-users", page, limit, token],
    queryFn: async (): Promise<UsersListResponse> =>
      await getUsers(page, limit),
  
    enabled: !!token,
  });
}

export function useSearchUsers(params: {
  email?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}) {
  const token = storage.getToken();
  const { email = "", status = "", role = "", page = 1, limit = 50 } = params || {};
  return useQuery({
    queryKey: [
      "admin-users-search",
      { email, status, role, page, limit },
      token,
    ],
    queryFn: async (): Promise<UsersListResponse> =>
      await searchUsers({ email, status, role, page, limit }),
    enabled: !!token && (!!email || !!status || !!role),
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });
}
