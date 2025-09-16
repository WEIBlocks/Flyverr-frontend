import api from "@/lib/api";
import type { UserBadgesResponse } from "../badge.types";

export function getUserBadges(): Promise<UserBadgesResponse> {
  return api
    .get("/badges/my-badges")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
