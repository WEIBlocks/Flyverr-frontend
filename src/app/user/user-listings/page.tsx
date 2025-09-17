"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Search,
  RefreshCw,
  Tag,
  Calendar,
  DollarSign,
  ArrowLeft,
  Filter,
} from "lucide-react";
import { useResaleListings } from "@/features/user/dashboard/hooks/useResaleListings";
import { ResaleListing } from "@/features/user/dashboard/dashboard.types";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import PaginationControls from "@/components/ui/PaginationControls";
import { useRouter } from "next/navigation";
import {
  AdminTable,
  AdminTableHeader,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminTableHeaderCell,
} from "@/components/ui/admin-table";

export default function UserListingsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [soldFilter, setSoldFilter] = useState<boolean | undefined>(undefined);
  const limit = 10;

  const { data, isLoading, error, refetch } = useResaleListings(
    currentPage,
    limit,
    soldFilter
  );

  React.useEffect(() => {
    if (!isLoading) {
      setIsRefreshing(false);
    }
  }, [isLoading]);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [soldFilter]);

  const listings = (data as any)?.data?.listings || [];
  const pagination = (data as any)?.data?.pagination;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "seed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "blossom":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "bloom":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter listings based on search term
  const filteredListings = listings.filter((listing: ResaleListing) =>
    listing.product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] ">
        <div className="text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Error loading listings
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Something went wrong while fetching your listings.
          </p>
          <Button
            onClick={() => refetch()}
            className="bg-flyverr-primary hover:bg-flyverr-primary/90"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:mt-12 mb-5">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="border-gray-300 dark:border-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              My Resale Listings
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your resale-eligible licenses and listings
          </p>
        </div>
        <Button
          onClick={async () => {
            if (!isRefreshing && !isLoading) {
              setIsRefreshing(true);
              await refetch();
              setIsRefreshing(false);
            }
          }}
          variant="outline"
          className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10 self-start md:self-auto"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Search and Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300 dark:border-gray-600 w-full"
          />
        </div>
        <div className="flex items-center justify-between sm:justify-end">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total: {pagination?.total || 0} listings
          </span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by status:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* <Button
            variant={soldFilter === undefined ? "default" : "outline"}
            size="sm"
            onClick={() => setSoldFilter(undefined)}
            className={`text-xs ${
              soldFilter === undefined
                ? "bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
                : "hover:bg-flyverr-primary/10"
            }`}
          >
            All
          </Button> */}
          <Button
            variant={soldFilter === false ? "default" : "outline"}
            size="sm"
            onClick={() => setSoldFilter(false)}
            className={`text-xs ${
              soldFilter === false
                ? "bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
                : "hover:bg-flyverr-primary/10"
            }`}
          >
            Available
          </Button>
          <Button
            variant={soldFilter === true ? "default" : "outline"}
            size="sm"
            onClick={() => setSoldFilter(true)}
            className={`text-xs ${
              soldFilter === true
                ? "bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
                : "hover:bg-flyverr-primary/10"
            }`}
          >
            Sold
          </Button>
        </div>
      </div>

      {/* Listings Table */}
      {/* <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="max-h-[60vh] md:max-h-[70vh] lg:max-h-none ">
          <div className="min-w-[720px] sm:min-w-0 px-4 sm:px-0 overflow-y-auto "> */}
      <AdminTable>
        <AdminTableHeader>
          <tr>
            <AdminTableHeaderCell>Product</AdminTableHeaderCell>
            <AdminTableHeaderCell>Price</AdminTableHeaderCell>
            <AdminTableHeaderCell>Stage</AdminTableHeaderCell>
            <AdminTableHeaderCell>Status</AdminTableHeaderCell>
            <AdminTableHeaderCell>Round</AdminTableHeaderCell>
            {/* <AdminTableHeaderCell>Acquired Date</AdminTableHeaderCell> */}
          </tr>
        </AdminTableHeader>
        <AdminTableBody>
          {isLoading ? (
            // Loading skeleton
            [...Array(10)].map((_, index) => (
              <AdminTableRow key={index}>
                <AdminTableCell>
                  <div className="animate-pulse flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1 w-40"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                    </div>
                  </div>
                </AdminTableCell>
                {[...Array(5)].map((_, i) => (
                  <AdminTableCell key={i}>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                  </AdminTableCell>
                ))}
              </AdminTableRow>
            ))
          ) : filteredListings.length === 0 ? (
            <AdminTableRow>
              <AdminTableCell colSpan={6}>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {searchTerm
                      ? "No matching listings found"
                      : "No listings yet"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    {searchTerm
                      ? "Try adjusting your search terms to find what you're looking for."
                      : "Your resale-eligible licenses will appear here once you have some."}
                  </p>
                </div>
              </AdminTableCell>
            </AdminTableRow>
          ) : (
            filteredListings.map((listing: ResaleListing) => (
              <AdminTableRow key={listing.license_id}>
                {/* Product */}
                <AdminTableCell>
                  <div className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={listing.product.thumbnail_url}
                      alt={listing.product.title}
                      className="w-12 h-12 object-cover rounded-lg"
                      width={48}
                      height={48}
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white line-clamp-2 max-w-[220px] sm:max-w-none">
                        {listing.product.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {listing.license_id.slice(0, 8)}...
                      </div>
                    </div>
                  </div>
                </AdminTableCell>

                {/* Price */}
                <AdminTableCell>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatPrice(listing.product.original_price)}
                  </span>
                </AdminTableCell>

                {/* Stage */}
                <AdminTableCell>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(
                      listing.product.current_stage
                    )}`}
                  >
                    {listing.product.current_stage}
                  </span>
                </AdminTableCell>

                {/* Status */}
                <AdminTableCell>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        listing.is_listed_for_resale
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <span className="text-sm">
                      {listing.is_listed_for_resale ? "Listed" : "Available"}
                    </span>
                    {listing.resale_eligible && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full ml-2">
                        Eligible
                      </span>
                    )}
                  </div>
                </AdminTableCell>

                {/* Round */}
                <AdminTableCell>
                  <span className="text-gray-900 dark:text-white">
                    {listing.product.current_round}
                  </span>
                </AdminTableCell>

                {/* Acquired Date */}
                {/* <AdminTableCell>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">
                      {formatDate(listing.acquired_at)}
                    </span>
                  </div>
                </AdminTableCell> */}
              </AdminTableRow>
            ))
          )}
        </AdminTableBody>
      </AdminTable>
      {/* </div>
        </div>
      </div> */}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <PaginationControls
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            totalCount={pagination.total}
            pageSize={limit}
            onPageChange={setCurrentPage}
            entityLabel="listings"
          />
        </div>
      )}
    </div>
  );
}
