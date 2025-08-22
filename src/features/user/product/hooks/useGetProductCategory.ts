import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "../services/api";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

interface CategoriesResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}

export const useGetProductCategory = () => {
  return useQuery<CategoriesResponse>({
    queryKey: ["product-categories"],
    queryFn: async () => {
      return await getProductCategories();
    },
  });
};
