import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../services/ap";
import { Product } from "@/features/user/product/product.types";

interface EditProductParams {
  productId: string;
  product: Partial<Product>;
}

// Wrapper function to convert axios response to standard promise
const editProductWrapper = async (productId: string, product: Partial<Product>) => {
  const response = await editProduct(productId, product);
  return response.data;
};

export function useEditProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, product }: EditProductParams) =>
      editProductWrapper(productId, product),
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
      console.error("Error editing product:", error);
    },
  });
}
