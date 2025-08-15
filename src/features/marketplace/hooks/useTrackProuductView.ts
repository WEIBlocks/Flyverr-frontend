import { useMutation } from "@tanstack/react-query";
import { trackProductView } from "../services/api";




export function useTrackProductView() {
  return useMutation({
    mutationFn: async (id: string) => await trackProductView(id),
    onSuccess: () => {},
    onError: (error: any) => {
      console.error("Failed to track product view", error)
  },
  });
}
