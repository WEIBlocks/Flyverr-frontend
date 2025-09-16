import api from "@/lib/api";
import type {
  AllBadgesResponse,
  UserBadgeStatusResponse,
} from "../badge.types";

interface AssignBadgeRequest {
  userId: string;
  badgeType: "reseller" | "creator";
}

export function assignBadge(data: AssignBadgeRequest) {
  return api
    .post("/badges/verified-reseller-badge/new-user", data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getAllBadges(): Promise<AllBadgesResponse> {
  return api
    .get("/badges/all")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getUserBadgeStatus(
  userId: string
): Promise<UserBadgeStatusResponse> {
  return api
    .get(`/badges/status/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
