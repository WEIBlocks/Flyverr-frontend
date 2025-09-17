import api from "@/lib/api";
import {
  DashboardStatsResponse,
  ResaleListingsResponse,
} from "../dashboard.types";

export function getDashboardStats() {
  return api
    .get("/auth/stats")
    .then((res) => res.data as DashboardStatsResponse)
    .catch((err) => {
      throw err;
    });
}

export function getResaleListings(
  page: number = 1,
  limit: number = 20,
  sold?: boolean
) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (sold !== undefined) {
    params.append("sold", sold.toString());
  }

  return api
    .get(`/licenses/my-resell-listings?${params.toString()}`)
    .then((res) => res.data as ResaleListingsResponse)
    .catch((err) => {
      throw err;
    });
}
