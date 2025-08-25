import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flagProduct } from "../services/api";

interface FlagProductRequest {
  action: 'flag' | 'unflag' | 'delete';
  reason: string;
  adminNotes?: string;
  flagType?: 'inappropriate' | 'copyright' | 'spam' | 'quality' | 'other' | '';
}

interface FlagProductParams {
  productId: string;
  flagData: FlagProductRequest;
}

// Wrapper function to convert axios response to standard promise
const flagProductWrapper = async (productId: string, flagData: FlagProductRequest) => {
  const response = await flagProduct(productId, flagData);
  return response.data;
};

export function useFlagProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, flagData }: FlagProductParams) =>
      flagProductWrapper(productId, flagData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch the specific product
      queryClient.invalidateQueries({
        queryKey: ["admin-product", variables.productId],
      });
      
      // Also invalidate the products list to refresh the overview
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      });
    },
    onError: (error) => {
      console.error("Error flagging product:", error);
    },
  });
}
