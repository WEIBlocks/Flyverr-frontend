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

export function getMyLicenses() {
  return api
    .get("/licenses/my-licenses")
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

export function getRoyaltyHistory() {
  return api
    .get("/royalty/history")
    .then((res) => res.data as RoyaltyHistoryResponse);
}

export function getAcquiredRoyaltyLicenses() {
  return api
    .get("/royalty/acquired-licenses")
    .then((res) => res.data as AcquiredRoyaltyLicensesResponse);
}
