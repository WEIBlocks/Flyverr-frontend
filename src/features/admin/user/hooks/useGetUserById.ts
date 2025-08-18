import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/api";
import { UserDetailResponse } from "../user.types";

export function useGetUserById(userId: string) {
  return useQuery<UserDetailResponse>({
    queryKey: ["admin-user", userId],
    queryFn: async () => {
      const response = await getUserById(userId);
      return response;
    },
    enabled: !!userId,
  });
}
