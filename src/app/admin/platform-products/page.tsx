"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AdminTable,
  AdminTableHeader,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminTableHeaderCell,
} from "@/components/ui/admin-table";
import { Plus, Package, User, Calendar, Star } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import AddProductModal from "@/features/user/product/components/AddProductModal";

const DUMMY_PRODUCTS = [
  {
    id: "plat-001",
    title: "Platform Starter Kit",
    thumbnail_url: "/window.svg",
    original_price: 19.99,
    total_licenses: 100,
    remaining_licenses: 100,
    current_stage: "newboom",
    current_round: 0,
    status: "draft",
    featured: true,
    created_at: "2025-08-20T13:43:49.462234+00:00",
    approved_at: null,
    category: { id: "c1", name: "Templates", slug: "templates" },
    creator: { first_name: "Flyverr", last_name: "Team" },
  },
  {
    id: "plat-002",
    title: "Pro UI Icons Pack",
    thumbnail_url: "/file.svg",
    original_price: 29.0,
    total_licenses: 200,
    remaining_licenses: 180,
    current_stage: "blossom",
    current_round: 1,
    status: "active",
    featured: false,
    created_at: "2025-08-21T10:10:11.462234+00:00",
    approved_at: "2025-08-21T12:00:00.000Z",
    category: { id: "c2", name: "Graphics", slug: "graphics" },
    creator: { first_name: "Flyverr", last_name: "Team" },
  },
];

function getStageBadge(stage: string) {
  switch (stage) {
    case "newboom":
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
          New Boom
        </Badge>
      );
    case "blossom":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
          Blossom
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
          {stage}
        </Badge>
      );
  }
}

export default function PlatformProductsPage() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Platform Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create and manage Flyverr-owned products
          </p>
        </div>
        <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Product
        </Button>
      </div>

      <AddProductModal isOpen={open} onClose={() => setOpen(false)} isPlatformProduct />

      {/* Table */}
      <AdminTable>
        <AdminTableHeader>
          <tr>
            <AdminTableHeaderCell>Product</AdminTableHeaderCell>
            <AdminTableHeaderCell>Creator & Stage</AdminTableHeaderCell>
            <AdminTableHeaderCell>Price & Status</AdminTableHeaderCell>
            <AdminTableHeaderCell>Submission</AdminTableHeaderCell>
          </tr>
        </AdminTableHeader>
        <AdminTableBody>
          {DUMMY_PRODUCTS.map((product) => (
            <AdminTableRow key={product.id} hoverable={true}>
              {/* Product Cell - Thumbnail + Title */}
              <AdminTableCell>
                <div className="flex items-center space-x-3">
                  <ImageWithFallback
                    src={product.thumbnail_url}
                    alt={product.title}
                    width={48}
                    height={48}
                    className="flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm">
                      {product.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {product.category?.name || "Uncategorized"}
                    </div>
                  </div>
                </div>
              </AdminTableCell>

              {/* Creator & Stage Cell */}
              <AdminTableCell>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {product.creator.first_name} {product.creator.last_name}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {getStageBadge(product.current_stage)}
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Round {product.current_round}
                    </div>
                  </div>
                </div>
              </AdminTableCell>

              {/* Price & Status Cell */}
              <AdminTableCell>
                <div className="space-y-2">
                  <div className="text-lg font-bold text-flyverr-primary dark:text-flyverr-secondary">
                    ${product.original_price}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Star className="w-3 h-3" />
                    {product.featured ? "Featured" : "Standard"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {product.remaining_licenses}/{product.total_licenses} licenses
                  </div>
                </div>
              </AdminTableCell>

              {/* Submission Cell */}
              <AdminTableCell>
                <div className="space-y-1">
                  <div className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                    {new Date(product.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {product.approved_at
                      ? `Approved: ${new Date(product.approved_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}`
                      : "Not approved yet"}
                  </div>
                </div>
              </AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTableBody>
      </AdminTable>
    </div>
  );
}


