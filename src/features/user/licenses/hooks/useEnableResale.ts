import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableResale } from "../services/apt";

export function useEnableResale() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (licenseId: string) => await enableResale(licenseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-licenses"] });
    },
  });
}
