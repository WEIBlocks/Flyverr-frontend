import api from "@/lib/api";
import type { InsuranceResponse } from "../insurance.types";
import type { InsuranceQueryParams } from "../insurance.types";

export function getExpiredInsurance(params?: InsuranceQueryParams) {
  const query = new URLSearchParams();
  if (params?.status) query.append("status", params.status);
  if (typeof params?.includeResold === "boolean") query.append("includeResold", String(params.includeResold));
  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));

  const qs = query.toString();
  const url = `/admin/insurance/expired${qs ? `?${qs}` : ""}`;

  return api
    .get(url)
    .then((res) => res.data as InsuranceResponse)
    .catch((err) => {
      throw err;
    });
}
