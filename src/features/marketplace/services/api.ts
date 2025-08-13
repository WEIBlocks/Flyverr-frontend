import api from "@/lib/api";
import type { AvailableLicensesResponse, MarketplaceFilters, MarketplaceResponse, ProductDetailResponse } from "../marketplace.types";

export function getMarketplaceProducts(filters: MarketplaceFilters = {}) {
  const params = new URLSearchParams();
  
  if (filters.category) params.append("category", filters.category);
  if (filters.stage) params.append("stage", filters.stage);
  if (filters.featured !== undefined) params.append("featured", filters.featured.toString());
  if (filters.trending !== undefined) params.append("trending", filters.trending.toString());
  if (filters.recommended !== undefined) params.append("recommended", filters.recommended.toString());
  if (filters.hotDeals !== undefined) params.append("hotDeals", filters.hotDeals.toString());
  if (filters.search) params.append("search", filters.search);
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.offset) params.append("offset", filters.offset.toString());
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
  if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());

  return api
    .get(`/marketplace/products?${params.toString()}`)
    .then((res) => res.data as MarketplaceResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function getProductDetail(id: string) {
  return api
    .get(`/marketplace/products/${id}`)
    .then((res) => res.data as ProductDetailResponse)
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function getAvailableLicenses(id: string) {
  return api
    .get(`/marketplace/products/${id}/available-licenses`)
    .then((res) => res.data as AvailableLicensesResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}