import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '../services/api';
import type { ProductDetail } from '../marketplace.types';

export function useGetMarketplaceProductDetail(productId: string) {
  return useQuery<ProductDetail, Error>({
    queryKey: ['marketplace-product', productId],
    queryFn: async () => {
      const result = await getProductDetail(productId);
      return result;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
