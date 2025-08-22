import api from "@/lib/api";
import {
  PayoutInfoResponse,
  CreatePayoutMethodRequest,
  CreatePayoutMethodResponse,
  PayoutRequest,
  PayoutRequestResponse,
  UserPayoutsResponse,
} from "../payout.types";

export function getPayoutInfo() {
  return api
    .get("/payout-info/me")
    .then((res) => res.data as PayoutInfoResponse)
    .catch((err) => {
      throw err;
    });
}

export function createPayoutMethod(data: CreatePayoutMethodRequest) {
  return api
    .post("/payout-info", data)
    .then((res) => res.data as CreatePayoutMethodResponse)
    .catch((err) => {
      throw err;
    });
}

export function requestPayout(data: PayoutRequest) {
  return api
    .post("/payouts/request", data)
    .then((res) => res.data as PayoutRequestResponse)
    .catch((err) => {
      throw err;
    });
}

export function getUserPayouts() {
  return api
    .get("/payouts/me")
    .then((res) => res.data as UserPayoutsResponse)
    .catch((err) => {
      throw err;
    });
}
