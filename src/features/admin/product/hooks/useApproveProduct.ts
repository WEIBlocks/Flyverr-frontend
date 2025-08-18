import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveProduct } from "../services/ap";
import type { ProductApprovalRequest } from "../product.types";
import toast from "react-hot-toast";

export const useApproveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, approvalData }: { productId: string; approvalData: ProductApprovalRequest }) => {
      const response = await approveProduct(productId, approvalData);
      return response;
    },
    onSuccess: (data, variables) => {
      const action = variables.approvalData.approved ? "approved" : "rejected";
      toast.success(`Product ${action} successfully!`);
      
      // Invalidate and refetch pending products
      queryClient.invalidateQueries({ queryKey: ["pending-products"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Failed to process product";
      toast.error(errorMessage);
    },
  });
};
