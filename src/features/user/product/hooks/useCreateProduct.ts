import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/api";
import { Product } from "../product.types";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) => createProduct(product) as any,
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ["marketplace-products"] });
      queryClient.invalidateQueries({ queryKey: ["user-products"] });
    },
  });
};
