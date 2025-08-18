import api from "@/lib/api";
import { AdminUsersResponse } from "../user.types";

export const getUsers = async (page: number = 1, limit: number = 50): Promise<AdminUsersResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  return await api
    .get(`/admin/users?${params.toString()}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};


