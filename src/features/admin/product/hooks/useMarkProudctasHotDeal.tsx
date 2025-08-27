import { markProductAsHotDeal } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkProductAsHotDeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: any }) => {
      return await markProductAsHotDeal(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-product"] });
      queryClient.invalidateQueries({ queryKey: ["hot-deals"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
