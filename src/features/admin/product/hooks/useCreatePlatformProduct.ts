import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlatformProduct } from "../services/api";


export function useCreatePlatformProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => await createPlatformProduct(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["platform-products"] });
    },
  });
}
