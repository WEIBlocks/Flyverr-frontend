import api from "@/lib/api";
import { Product } from "../product.types";

export function createProduct(product: Product) {
  return api.post("/products", product);
}

export function updateProduct(id: string, product: Product) {
  return api.put(`/products/${id}`, product);
}

export function getMyProducts() {
  return api
    .get("/products/my-products")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getProductById(id: string) {
  return api
    .get(`/products/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function purchaseProduct(
  id: string,
  data: {
    licenseId?: string;
    purchaseType: string;
    hasInsurance: boolean;
    paymentMethod: string;
  }
) {
  return api.post(`marketplace/products/${id}/purchase`, data);
}

export function sponsorProductApi(args: {
  productId: string;
  paymentMethod?: "stripe";
}) {
  const body = {
    productId: args.productId,
    paymentMethod: args.paymentMethod || "stripe",
  };
  return api
    .post(`/marketplace/sponsor-product`, body)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
