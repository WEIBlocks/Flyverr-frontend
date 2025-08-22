import api from "@/lib/api";

export function getSponsorships(page: number = 1, limit: number = 10) {
  return api
    .get(`/admin/sponsorships?page=${page}&limit=${limit}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
