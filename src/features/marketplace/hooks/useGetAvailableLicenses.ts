import { useQuery } from '@tanstack/react-query';
import { getAvailableLicenses } from '../services/api';
import type { AvailableLicensesResponse } from '../marketplace.types';

export function useGetAvailableLicenses(productId: string) {
  return useQuery({
    queryKey: ['available-licenses', productId],
    queryFn: async () => {
      return await getAvailableLicenses(productId);
    },
    enabled: !!productId,
    
  });
}
