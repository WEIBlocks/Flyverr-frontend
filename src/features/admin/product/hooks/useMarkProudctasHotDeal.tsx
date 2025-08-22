import { markProductAsHotDeal } from "../services/ap";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkProductAsHotDeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: any }) => {
      return await markProductAsHotDeal(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hot-deals"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
