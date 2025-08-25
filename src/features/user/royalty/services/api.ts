import api from "@/lib/api";
import {
  MyLicensesResponse,
  EligibilityResponse,
  PlatformProductsResponse,
  ClaimRoyaltyRequest,
  ClaimRoyaltyResponse,
  RoyaltyHistoryResponse,
  AcquiredRoyaltyLicensesResponse,
} from "../royalty.types";

export function getMyLicenses(page = 1, limit = 20) {
  return api
    .get("/licenses/my-licenses", { params: { page, limit } })
    .then((res) => res.data as MyLicensesResponse);
}

export function checkRoyaltyEligibility(licenseId: string) {
  return api
    .get(`/royalty/eligibility/${licenseId}`)
    .then((res) => res.data as EligibilityResponse);
}

export function getPlatformProducts() {
  return api
    .get("/royalty/platform-products")
    .then((res) => res.data as PlatformProductsResponse);
}

export function claimRoyalty(data: ClaimRoyaltyRequest) {
  return api
    .post("/royalty/claim", data)
    .then((res) => res.data as ClaimRoyaltyResponse);
}

export function getRoyaltyHistory(page = 1, limit = 10) {
  return api
    .get("/royalty/history", { params: { page, limit } })
    .then((res) => res.data as RoyaltyHistoryResponse);
}

export function getAcquiredRoyaltyLicenses(page = 1, limit = 10) {
  return api
    .get("/royalty/acquired-licenses", { params: { page, limit } })
    .then((res) => res.data as AcquiredRoyaltyLicensesResponse);
}
