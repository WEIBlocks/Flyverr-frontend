"use client";

import React, { useState, useEffect } from "react";
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
import {
  Package,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle,
  TrendingUp,
  FileText,
  Calendar,
  Zap,
  Filter,
  Loader2,
  XCircle as XCircleIcon,
} from "lucide-react";
import { useGetPendingProducts } from "@/features/admin/product/hooks/useGetPendingProducts";
import { PendingProduct } from "@/features/admin/product/product.types";
import ProductApprovalModal from "@/features/admin/product/components/ProductApprovalModal";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import PendingProductsSkeleton from "@/components/ui/PendingProductsSkeleton";

export default function AdminPendingProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit] = useState(20);
  const [selectedProduct, setSelectedProduct] = useState<PendingProduct | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useGetPendingProducts({
    page: currentPage,
    limit: currentLimit,
  });

  const pendingProducts = data?.data?.products || [];
  const pagination = data?.data?.pagination;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
            Pending Review
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:border-gray-800">
            {status}
          </Badge>
        );
    }
  };

  const getStageBadge = (stage: string) => {
    const stageColors = {
      newboom:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
      blossom:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      evergreen:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      exit: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    };

    return (
      <Badge
        className={
          stageColors[stage as keyof typeof stageColors] ||
          "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800"
        }
      >
        {stage}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleProductClick = (product: PendingProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Loading state
  if (isLoading) {
    return <PendingProductsSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Error Loading Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error instanceof Error
                ? error.message
                : "Failed to load pending products"}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-flyverr-primary hover:bg-flyverr-primary/90"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Pending Products
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
            Review and approve new product submissions
          </p>
        </div>
        {/* <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Review Queue
          </Button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Review
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {pagination?.total || 0}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-yellow-500/10 rounded-xl">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Today's Submissions
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {
                  pendingProducts.filter((p) => {
                    const today = new Date().toDateString();
                    return new Date(p.created_at).toDateString() === today;
                  }).length
                }
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-500/10 rounded-xl">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Categories
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {
                  new Set(
                    pendingProducts.map(
                      (p) => p.category?.name || "Uncategorized"
                    )
                  ).size
                }
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-500/10 rounded-xl">
              <Filter className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Licenses
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {pendingProducts.reduce((sum, p) => sum + p.total_licenses, 0)}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-green-500/10 rounded-xl">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="overflow-x-auto">
        <AdminTable>
          <AdminTableHeader>
            <tr>
              <AdminTableHeaderCell className="min-w-[200px] sm:min-w-[250px]">Product</AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[120px] sm:min-w-[150px]">Price & Status</AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[120px] sm:min-w-[140px]">Submission</AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[80px] sm:min-w-[100px]">Licenses</AdminTableHeaderCell>
              <AdminTableHeaderCell align="center" className="min-w-[80px]">Actions</AdminTableHeaderCell>
            </tr>
          </AdminTableHeader>
          <AdminTableBody>
            {pendingProducts.length === 0 ? (
              <AdminTableRow>
                <td colSpan={5} className="text-center py-8">
                  <div className="text-gray-500 dark:text-gray-400">
                    <Package className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm sm:text-base">No pending products found</p>
                  </div>
                </td>
              </AdminTableRow>
            ) : (
              pendingProducts.map((product) => (
                <AdminTableRow
                  key={product.id}
                  hoverable={true}
                >
                  {/* Product Cell - Thumbnail + Title */}
                  <AdminTableCell>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <ImageWithFallback
                        src={product.thumbnail_url}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-xs sm:text-sm">
                          {product.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          by {product.creator.first_name}{" "}
                          {product.creator.last_name}
                        </div>
                      </div>
                    </div>
                  </AdminTableCell>

                  {/* Price & Status Cell */}
                  <AdminTableCell>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-base sm:text-lg font-bold text-flyverr-primary dark:text-flyverr-secondary">
                        ${product.original_price}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {getStatusBadge(product.status)}
                        {getStageBadge(product.current_stage)}
                      </div>
                    </div>
                  </AdminTableCell>

                  {/* Submission Cell */}
                  <AdminTableCell>
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm text-gray-900 dark:text-white flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-gray-500" />
                        {formatDate(product.created_at)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {product.category?.name || "Uncategorized"}
                      </div>
                    </div>
                  </AdminTableCell>

                  {/* Licenses Cell */}
                  <AdminTableCell>
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {product.remaining_licenses}/{product.total_licenses}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Available
                      </div>
                    </div>
                  </AdminTableCell>

                  {/* Actions Cell */}
                  <AdminTableCell align="center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 p-1 sm:p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product);
                        }}
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </AdminTableCell>
                </AdminTableRow>
              ))
            )}
          </AdminTableBody>
        </AdminTable>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </div>
          <div className="flex items-center justify-center sm:justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
            >
              Previous
            </Button>
            <span className="flex items-center px-2 sm:px-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))
              }
              disabled={currentPage === pagination.totalPages}
              className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductApprovalModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
