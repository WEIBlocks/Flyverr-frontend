import api from "@/lib/api";

export function getUsers(page: number = 1, limit: number = 50) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  return api
    .get(`/admin/users?${params.toString()}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getUserById(userId: string) {
  return api
    .get(`/admin/users/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getUserStats(userId: string) {
  return api
    .get(`/admin/users/${userId}/stats`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function updateUserStatus(
  userId: string,
  data: {
    status: "active" | "suspended" | "banned";
    reason?: string;
    adminNotes?: string;
    suspensionDuration?: number; // days
  }
) {
  return api.put(`/admin/users/${userId}/status`, data);
}

export function updateUserRole(
  userId: string,
  data: {
    role: string;
    reason: string;
  }
) {
  return api.put(`/admin/users/${userId}/role`, data);
}
