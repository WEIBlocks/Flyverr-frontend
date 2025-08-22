import api from "@/lib/api";
import { EarningsResponse } from "../earnings.types";

export function getEarnings() {
  return api
    .get("/earnings/me")
    .then((res) => res.data as EarningsResponse)
    .catch((err) => {
      throw err;
    });
}
