import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../services/api";

export function useGetMyReviews() {
  return useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => await getMyReviews(),
  });
}