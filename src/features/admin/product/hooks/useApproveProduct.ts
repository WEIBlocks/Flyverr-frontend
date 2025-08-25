import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveProduct } from "../services/api";
import type { ProductApprovalRequest } from "../product.types";
import { ErrorResponse } from "@/lib/types";
import { createUserFriendlyError } from "@/lib/errorUtils";
import { swal } from "@/lib/utils";

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
      swal(
        `Product ${action}`,
        `Product ${action} successfully`,
        "success",
        () => {
          queryClient.invalidateQueries({ queryKey: ["pending-products"] });
        }
      );
    },
    onError: (error: ErrorResponse) => {
      swal("Error", createUserFriendlyError(error), "error");
    },
  });
};
