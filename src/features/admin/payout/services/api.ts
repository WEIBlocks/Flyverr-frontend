import api from "@/lib/api";
import { PayoutActionRequest } from "../payout.types";

export function getPayouts(status?: string) {
  const params = new URLSearchParams();
  if (status) {
    params.append("status", status);
  } else {
    // For getting all payouts, we need to make multiple calls or modify the API
    // For now, let's explicitly pass "all" to indicate we want all statuses
    params.append("status", "all");
  }

  return api
    .get(`/admin/payouts?${params.toString()}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function approvePayout(payoutId: string, data?: PayoutActionRequest) {
  return api
    .post(`/admin/payouts/${payoutId}/approve`, data || {})
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function rejectPayout(payoutId: string, data?: PayoutActionRequest) {
  return api
    .post(`/admin/payouts/${payoutId}/reject`, data || {})
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function retryPayout(payoutId: string) {
  return api
    .post(`/admin/payouts/${payoutId}/retry`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
