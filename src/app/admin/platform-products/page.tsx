"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  Plus,
  Package,
  User,
  Calendar,
  Star,
  Search,
  Loader2,
  Edit,
} from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import AddProductModal from "@/features/user/product/components/AddProductModal";
import PaginationControls from "@/components/ui/PaginationControls";
import { useGetPlatformProducts } from "@/features/admin/product/hooks/useGetPlateformProducts";
const DUMMY_PRODUCTS: any[] = [];

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

function getStatusBadge(status: string) {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
          Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400">
          Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
          Rejected
        </Badge>
      );
    case "flagged":
      return (
        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
          Hidden
        </Badge>
      );
    case "deleted":
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
          Deleted
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
          {status}
        </Badge>
      );
  }
}

export default function PlatformProductsPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, isFetching } = useGetPlatformProducts(
    page,
    limit,
    status,
    debouncedSearch
  );
  const products = (data as any)?.data?.products || [];
  const pagination = (data as any)?.data?.pagination;
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Platform Products
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            Create and manage Flyverr-owned products
          </p>
        </div>
        <Button
          className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2.5"
          onClick={() => setOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Product
        </Button>
      </div>

      <AddProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        isPlatformProduct
      />

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search platform products..."
            className="w-full pl-10 pr-10 py-2 sm:py-2.5 rounded-md bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-flyverr-primary dark:focus:border-flyverr-secondary text-sm sm:text-base"
          />
          {isFetching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span className="hidden sm:inline">Searching...</span>
            </div>
          )}
        </div>
        {/* <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setStatus("");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              status === ""
                ? "bg-flyverr-primary text-white border-flyverr-primary shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-flyverr-primary hover:text-flyverr-primary dark:hover:border-flyverr-secondary dark:hover:text-flyverr-secondary"
            }`}
          >
            All Products
          </button>
          {[
            { key: "approved", label: "Approved" },
            { key: "pending", label: "Pending" },
            { key: "rejected", label: "Rejected" },
            { key: "flagged", label: "Hidden" },
            { key: "deleted", label: "Deleted" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setStatus(f.key);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                status === f.key
                  ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <AdminTable>
          <AdminTableHeader>
            <tr>
              <AdminTableHeaderCell className="min-w-[200px] sm:min-w-[250px] lg:min-w-[300px]">Product</AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[150px] sm:min-w-[180px] lg:min-w-[200px]">Creator & Stage</AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]">Price</AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]">Status</AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]">Featured</AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[120px] sm:min-w-[150px] lg:min-w-[180px]">Submission</AdminTableHeaderCell>
              <AdminTableHeaderCell align="center" className="min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]">Actions</AdminTableHeaderCell>
            </tr>
          </AdminTableHeader>
          <AdminTableBody>
            {isLoading ? (
              <AdminTableRow>
                <td
                  colSpan={7}
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  {" "}
                  <span className="inline-flex items-center gap-2 text-sm sm:text-base">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                  </span>
                </td>
              </AdminTableRow>
            ) : products.length === 0 ? (
              <AdminTableRow>
                <td
                  colSpan={999}
                  className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base"
                >
                  No platform products found
                </td>
              </AdminTableRow>
            ) : (
              products.map((product: any) => (
                <AdminTableRow key={product.id} hoverable={true}>
                  {/* Product Cell - Thumbnail + Title */}
                  <AdminTableCell>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <ImageWithFallback
                        src={product.thumbnail_url}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-xs sm:text-sm lg:text-base">
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
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs sm:text-sm text-gray-900 dark:text-white">
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

                  {/* Price */}
                  <AdminTableCell>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-sm sm:text-base lg:text-lg font-bold text-flyverr-primary dark:text-flyverr-secondary">
                        ${product.original_price}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {product.remaining_licenses}/{product.total_licenses}{" "}
                        licenses
                      </div>
                    </div>
                  </AdminTableCell>

                  {/* Status */}
                  <AdminTableCell>
                    {getStatusBadge(product.status)}
                  </AdminTableCell>

                  {/* Featured */}
                  <AdminTableCell>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <Star className="w-3 h-3" />
                      <span className="hidden sm:inline">{product.featured ? "Featured" : "Standard"}</span>
                      <span className="sm:hidden">{product.featured ? "★" : "☆"}</span>
                    </div>
                  </AdminTableCell>

                  {/* Submission Cell */}
                  <AdminTableCell>
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm text-gray-900 dark:text-white flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                        {new Date(product.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {product.approved_at
                          ? `Approved: ${new Date(
                              product.approved_at
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}`
                          : "Not approved yet"}
                      </div>
                    </div>
                  </AdminTableCell>

                  {/* Actions */}
                  <AdminTableCell align="center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400 p-1 sm:p-2"
                        onClick={() =>
                          router.push(`/admin/products/${product.id}`)
                        }
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </AdminTableCell>
                </AdminTableRow>
              ))
            )}
          </AdminTableBody>
        </AdminTable>
      </div>

      {pagination && (
        <PaginationControls
          currentPage={page}
          totalPages={pagination.totalPages}
          totalCount={pagination.total}
          pageSize={limit}
          onPageChange={setPage}
          onPageSizeChange={setLimit}
          disabled={isFetching}
          entityLabel="records"
          className="mt-4 sm:mt-6"
        />
      )}
    </div>
  );
}
