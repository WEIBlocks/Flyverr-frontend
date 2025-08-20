import api from "@/lib/api";


export function onboardStripe() {
    return api.post('/payments/stripe/connect/onboard');
}


