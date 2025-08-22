import { useQuery } from "@tanstack/react-query";
import { getStripeConnectStatus } from "../services/api";
import { storage } from "@/lib/utils";
import { StripeConnectStatusResponse } from "../payment.types";

export const useGetStripeConnectStatus = () => {
  const token = storage.getToken();
  return useQuery<StripeConnectStatusResponse>({
    queryKey: ["stripe-connect-status", token],
    queryFn: async () => {
      return await getStripeConnectStatus();
    },
    enabled: !!token,
  });
};
