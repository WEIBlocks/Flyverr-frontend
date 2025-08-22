import api from "@/lib/api";
import type {
  ProductApprovalRequest,
  ProductApprovalResponse,
} from "../product.types";
import { Product } from "@/features/user/product/product.types";

export function getPendingProducts(page: number = 1, limit: number = 20) {
  return api
    .get(`/admin/products/pending?page=${page}&limit=${limit}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function approveProduct(
  productId: string,
  approvalData: ProductApprovalRequest
) {
  return api
    .put(`/admin/products/${productId}/approve`, approvalData)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getAllProducts(
  page: number = 1,
  limit: number = 20,
  status?: string,
  search?: string
) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (status) {
    params.append("status", status);
  }

  if (search) {
    params.append("search", search);
  }

  return api
    .get(`/admin/products?${params.toString()}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getProductById(id: string) {
  return api
    .get(`/admin/products/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

interface FlagProductRequest {
  action: "flag" | "unflag" | "delete";
  reason: string;
  adminNotes?: string;
  flagType?: "inappropriate" | "copyright" | "spam" | "quality" | "other" | "";
}

export function flagProduct(productId: string, flagData: FlagProductRequest) {
  return api.put(`/admin/products/${productId}/flag`, flagData);
}
export function editProduct(productId: string, product: Partial<Product>) {
  return api.put(`/admin/products/${productId}/edit`, product);
}

export function markProductAsHotDeal( data: any) {
  return api.post(`/admin/deals`, data);
}
