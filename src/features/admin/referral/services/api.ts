import api from "@/lib/api";
import type { AdminReferralStatsResponse } from "../referral.types";

export function getAdminReferralStats(): Promise<AdminReferralStatsResponse> {
  return api
    .get("/admin/referral/stats")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
