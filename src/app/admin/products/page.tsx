"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  MoreVertical,
  Star,
  ShoppingCart,
  BarChart3,
  Activity,
  Target,
  TrendingDown,
  Search,
  Filter,
  Calendar,
  FileText,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useGetAllProducts } from "@/features/admin/product/hooks/useGetAllProducts";
import { AdminProduct } from "@/features/admin/product/product.types";
import AdminProductsSkeleton from "@/components/AdminProductsSkeleton";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import PaginationControls from "@/components/ui/PaginationControls";

export default function AdminAllProductsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when search changes
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error, isFetching } = useGetAllProducts(
    page,
    limit,
    status,
    debouncedSearch
  );

  const products = data?.data?.products || [];
  const pagination = data?.data?.pagination;

  const getStageBadge = (stage: string) => {
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
      case "evergreen":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">
            Evergreen
          </Badge>
        );
      case "exit":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800">
            Exit
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
            {stage}
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-green-200 dark:border-green-800">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
            Rejected
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800">
            Paused
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
            {status}
          </Badge>
        );
    }
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

  const formatDealType = (t: string) =>
    t
      .split("_")
      .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
      .join(" ");

  const getDealBadgeClasses = (t: string) => {
    switch (t) {
      case "hot_deals":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800";
      case "sponsored":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/admin/products/${productId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusFilter = (newStatus: string) => {
    setStatus(newStatus === status ? "" : newStatus);
    setPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Products
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Failed to load products. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and monitor all platform products
          </p>
        </div>
        {/* <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div> */}
      </div>

      {/* Search and Filters - Always visible */}
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products by title or description..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-flyverr-primary dark:focus:border-flyverr-secondary"
            />
            {/* Search indicator */}
            {search && search !== debouncedSearch && !isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Searching...</span>
                </div>
              </div>
            )}
            {/* Search count indicator */}
            {debouncedSearch && !isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {pagination?.total || 0} results
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusFilter("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              status === ""
                ? "bg-flyverr-primary text-white border-flyverr-primary shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-flyverr-primary hover:text-flyverr-primary dark:hover:border-flyverr-secondary dark:hover:text-flyverr-secondary"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => handleStatusFilter("approved")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              status === "approved"
                ? "bg-green-600 text-white border-green-600 shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-green-500 hover:text-green-600 dark:hover:border-green-400 dark:hover:text-green-400"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  status === "approved" ? "bg-white" : "bg-green-500"
                }`}
              ></div>
              <span>Approved</span>
            </div>
          </button>
          <button
            onClick={() => handleStatusFilter("pending")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              status === "pending"
                ? "bg-yellow-500 text-white border-yellow-500 shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-yellow-400 hover:text-yellow-600 dark:hover:border-yellow-300 dark:hover:text-yellow-400"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  status === "pending" ? "bg-white" : "bg-yellow-500"
                }`}
              ></div>
              <span>Pending</span>
            </div>
          </button>
          <button
            onClick={() => handleStatusFilter("rejected")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              status === "rejected"
                ? "bg-red-600 text-white border-red-600 shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-red-500 hover:text-red-600 dark:hover:border-red-400 dark:hover:text-red-400"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  status === "rejected" ? "bg-white" : "bg-red-500"
                }`}
              ></div>
              <span>Rejected</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content Area - Show skeleton or actual content */}
      {isLoading ? (
        <AdminProductsSkeleton />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Products
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {pagination?.total || 0}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Approved
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {products.filter((p) => p.status === "approved").length}
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Pending
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {products.filter((p) => p.status === "pending").length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-xl">
                  <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Licenses
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {products.reduce((sum, p) => sum + p.total_licenses, 0)}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <AdminTable>
            <AdminTableHeader>
              <tr>
                <AdminTableHeaderCell>Product</AdminTableHeaderCell>
                <AdminTableHeaderCell>Creator & Stage</AdminTableHeaderCell>
                <AdminTableHeaderCell>Price & Status</AdminTableHeaderCell>
                <AdminTableHeaderCell>Submission</AdminTableHeaderCell>
                <AdminTableHeaderCell align="center">
                  Actions
                </AdminTableHeaderCell>
              </tr>
            </AdminTableHeader>
            <AdminTableBody>
              {products.length === 0 ? (
                <AdminTableRow>
                  <td colSpan={5} className="text-center py-8">
                    <div className="text-gray-500 dark:text-gray-400">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No products found</p>
                    </div>
                  </td>
                </AdminTableRow>
              ) : (
                products.map((product) => (
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
                            {product.creator.first_name}{" "}
                            {product.creator.last_name}
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
                        {getStatusBadge(product.status)}
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {product.remaining_licenses}/{product.total_licenses}{" "}
                          licenses
                        </div>
                        {Array.isArray(product.dealTypes) && product.dealTypes.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {product.dealTypes.map((dt: string) => (
                              <Badge key={dt} className={getDealBadgeClasses(dt)}>
                                {formatDealType(dt)}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </AdminTableCell>

                    {/* Submission Cell */}
                    <AdminTableCell>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 dark:text-white flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                          {formatDate(product.created_at)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {product.approved_at
                            ? `Approved: ${formatDate(product.approved_at)}`
                            : "Not approved yet"}
                        </div>
                      </div>
                    </AdminTableCell>

                    {/* Actions Cell */}
                    <AdminTableCell align="center">
                      <div className="flex items-center justify-center space-x-2">
                        {/* <Button 
                          size="sm" 
                          variant="outline" 
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleProductClick(product.id)
                          }}
                        >
                          <Eye className="w-3 h-3" />
                        </Button> */}
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product.id);
                          }}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        {/* <Button 
                          size="sm" 
                          variant="outline" 
                          className="hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleProductClick(product.id)
                          }}
                        >
                          <BarChart3 className="w-3 h-3" />
                        </Button> */}
                      </div>
                    </AdminTableCell>
                  </AdminTableRow>
                ))
              )}
            </AdminTableBody>
          </AdminTable>

          {/* Pagination */}
          {pagination && (
            <PaginationControls
              currentPage={page}
              totalPages={pagination.totalPages}
              totalCount={pagination.total}
              pageSize={limit}
              onPageChange={handlePageChange}
              onPageSizeChange={handleLimitChange}
              disabled={isFetching}
              entityLabel="records"
              className="mt-4"
            />
          )}
        </>
      )}
    </div>
  );
}
