import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseProduct } from "../services/api";
import Swal from "sweetalert2";
import { createUserFriendlyError } from "@/lib/errorUtils";
import { ErrorResponse } from "@/lib/types";
import { log } from "console";
import { swal } from "@/lib/utils";

export function usePurchaseProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        licenseId?: string;
        purchaseType: string;
        hasInsurance: boolean;
        paymentMethod: string;
        useSignupCredit?: boolean;
      };
    }) => await purchaseProduct(id, data),
    onSuccess: async (data: any) => {
      console.log("data", data);

      // Show success message with payment button
      if (data?.data?.data?.payment_url) {
        Swal.fire({
          title: data?.data?.message,
          text: `Transaction ID: ${data?.data?.data?.transaction_id}`,
          icon: "success",
          confirmButtonText: "Continue to Payment",
          allowOutsideClick: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await queryClient.invalidateQueries({
              queryKey: ["user-products"],
            });
            await queryClient.invalidateQueries({ queryKey: ["product"] });
            // Invalidate credit query to refresh credit status after purchase
            await queryClient.invalidateQueries({ queryKey: ["user-credits"] });
            window.open(data?.data?.data?.payment_url, "_blank"); 
          }
        });
      } else {
        // Fallback success message
        await queryClient.invalidateQueries({ queryKey: ["user-credits"] });
        swal("Success", "Purchase initiated successfully", "success");
      }
    },
    onError: (error: ErrorResponse) => {
      console.log(error);
      const code = error?.response?.data?.code;
      const link = error?.response?.data?.link;

      if (code === "CONNECT_REQUIRED" && typeof link === "string") {
        Swal.fire({
          title: "Complete Stripe Onboarding",
          text: createUserFriendlyError(error),
          icon: "info",
          confirmButtonText: "Complete Stripe Onboarding",
          showCancelButton: true,
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(link, "_blank");
          }
        });
        return;
      }

      // Default error handling
      Swal.fire({
        title: "Error",
        text: createUserFriendlyError(error),
        icon: "error",
      });
    },
  });
}
