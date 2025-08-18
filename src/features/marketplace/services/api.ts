import api from "@/lib/api";
import type {
  AvailableLicensesResponse,
  MarketplaceFilters,
  MarketplaceResponse,
  ProductDetailResponse,
} from "../marketplace.types";

export function getMarketplaceProducts(filters: MarketplaceFilters = {}) {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.stage) params.append("stage", filters.stage);
  if (filters.featured !== undefined)
    params.append("featured", filters.featured.toString());
  // Do not send frontend-only toggles to backend products endpoint
  // (trending, recommended, hotDeals are handled via /marketplace/categories or client-only)
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

export function trackProductView(id: string) {
  return api.post(`/marketplace/products/${id}/view`);
}

export function getCategoryProducts(args: {
  type: "all" | "trending" | "featured" | "sponsored" | "hot_deals";
  limit?: number;
  page?: number;
  offset?: number;
}) {
  const params = new URLSearchParams();
  params.append("type", args.type);
  if (args.limit) params.append("limit", String(args.limit));
  if (args.page) params.append("page", String(args.page));
  if (args.offset) params.append("offset", String(args.offset));
  return api
    .get(`/marketplace/categories?${params.toString()}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
