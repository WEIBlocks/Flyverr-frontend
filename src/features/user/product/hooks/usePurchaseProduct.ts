import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseProduct } from "../services/api";
import Swal from "sweetalert2";

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
      };
    }) => await purchaseProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error: any) => {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
      });
    },
  });
}
