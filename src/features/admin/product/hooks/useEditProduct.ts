import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../services/api";
import { Product } from "@/features/user/product/product.types";
import { createUserFriendlyError } from "@/lib/errorUtils";
import Swal from "sweetalert2";
import { ErrorResponse } from "@/lib/types";
interface EditProductParams {
  productId: string;
  product: Partial<Product>;
}

// Wrapper function to convert axios response to standard promise
const editProductWrapper = async (
  productId: string,
  product: Partial<Product>
) => {
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
      Swal.fire({
        title: "Product updated",
        icon: "success",
        text: "Product updated successfully",
      }).then(async () => {
        await queryClient.invalidateQueries({
          queryKey: ["admin-product", variables.productId],
        });
        await queryClient.invalidateQueries({
          queryKey: ["admin-products"],
        });
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
}
