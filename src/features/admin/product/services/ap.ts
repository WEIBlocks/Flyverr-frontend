import api from "@/lib/api";
import type { ProductApprovalRequest, ProductApprovalResponse } from "../product.types";


export function getPendingProducts(page: number = 1, limit: number = 20) {
  return api
    .get(`admin/products/pending?page=${page}&limit=${limit}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function approveProduct(productId: string, approvalData: ProductApprovalRequest) {
  return api
    .post(`admin/products/${productId}/approve`, approvalData)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getAllProducts(page: number = 1, limit: number = 20, status?: string, search?: string) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  
  if (status) {
    params.append('status', status);
  }
  
  if (search) {
    params.append('search', search);
  }

  return api
    .get(`admin/products?${params.toString()}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getProductById(id: string) {
  return api
    .get(`admin/products/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

