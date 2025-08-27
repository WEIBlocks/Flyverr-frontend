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

export function searchUsers(params: {
  email?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}) {
  const qp = new URLSearchParams();
  if (params.email) qp.append("email", params.email);
  if (params.status && params.status !== "all") qp.append("status", params.status);
  if (params.role && params.role !== "all") qp.append("role", params.role);
  qp.append("page", String(params.page ?? 1));
  qp.append("limit", String(params.limit ?? 50));

  return api
    .get(`/admin/users/search?${qp.toString()}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
