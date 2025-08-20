import api from "@/lib/api";
import type { InsuranceResponse } from "../insurance.types";

export function getExpiredInsurance() {
  return api
    .get("/admin/insurance/expired")
    .then((res) => res.data as InsuranceResponse)
    .catch((err) => {
      throw err;
    });
}
