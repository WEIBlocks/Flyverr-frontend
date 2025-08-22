import api from "@/lib/api";
import { OnboardStripeData } from "../payment.types";

export function onboardStripe(data: OnboardStripeData) {
  return api.post("/payments/stripe/connect/onboard", data);
}

export function getStripeConnectStatus() {
  return api
    .get("/payments/stripe/connect/status")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
