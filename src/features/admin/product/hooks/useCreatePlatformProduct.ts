import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlatformProduct } from "../services/api";
import toast from "react-hot-toast";

export function useCreatePlatformProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => await createPlatformProduct(payload),
    onSuccess: async () => {
      toast.success("Platform product created successfully");
      await queryClient.invalidateQueries({ queryKey: ["platform-products"] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to create platform product";
      toast.error(message);
    },
  });
}


