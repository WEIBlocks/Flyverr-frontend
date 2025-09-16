import api from "@/lib/api";
import type {
  UserReferralStatsResponse,
  GenerateReferralCodeResponse,
  ValidateReferralCodeRequest,
  ValidateReferralCodeResponse,
} from "../referral.types";

export function getReferralStats(): Promise<UserReferralStatsResponse> {
  return api
    .get("/referral/stats")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function generateReferralCode(): Promise<GenerateReferralCodeResponse> {
  return api
    .post("/referral/generate-code")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function validateReferralCode(
  data: ValidateReferralCodeRequest
): Promise<ValidateReferralCodeResponse> {
  return api
    .post("/referral/validate", data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
