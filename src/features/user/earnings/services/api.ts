import api from "@/lib/api";
import { EarningsResponse } from "../earnings.types";

export function getEarnings(page = 1, limit = 20) {
  return api
    .get("/earnings/me", { params: { page, limit } })
    .then((res) => res.data as EarningsResponse)
    .catch((err) => {
      throw err;
    });
}
