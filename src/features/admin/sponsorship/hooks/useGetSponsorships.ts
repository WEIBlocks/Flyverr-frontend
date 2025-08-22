import { useQuery } from "@tanstack/react-query";
import { getSponsorships } from "../services/api";
import { SponsorshipResponse } from "../sponsorship.types";

export function useGetSponsorships(page: number = 1, limit: number = 10) {
  return useQuery<SponsorshipResponse>({
    queryKey: ["admin-sponsorships", page, limit],
    queryFn: async () => {
      const response = await getSponsorships(page, limit);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
