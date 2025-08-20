import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveProduct } from "../services/ap";
import type { ProductApprovalRequest } from "../product.types";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ErrorResponse } from "@/lib/types";
import { createUserFriendlyError } from "@/lib/errorUtils";

export const useApproveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      approvalData,
    }: {
      productId: string;
      approvalData: ProductApprovalRequest;
    }) => {
      const response = await approveProduct(productId, approvalData);
      return response;
    },
    onSuccess: (data, variables) => {
      const action = variables.approvalData.approved ? "approved" : "rejected";
      Swal.fire({
        title: `Product ${action}`,
        icon: "success",
        text: `Product ${action} successfully`,
      }).then(async () => {
        // Invalidate and refetch pending products
        queryClient.invalidateQueries({ queryKey: ["pending-products"] });
      });
    },
    onError: (error: ErrorResponse) => {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: createUserFriendlyError(error),
      });
    },
  });
};
