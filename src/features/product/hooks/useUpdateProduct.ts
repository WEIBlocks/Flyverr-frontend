import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../services/api";
import { Product } from "../product.types";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: Product }) =>
      updateProduct(id, product),
    onSuccess: () => {
      // Invalidate and refetch user products
      queryClient.invalidateQueries({ queryKey: ["user-products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
