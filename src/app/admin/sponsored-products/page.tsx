"use client";

import React, { useState } from "react";
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
  DollarSign,
  CreditCard,
  Calendar,
  User,
  Package,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  BarChart3,
  Filter,
} from "lucide-react";
import { useGetSponsorships } from "@/features/admin/sponsorship/hooks/useGetSponsorships";
import { Sponsorship } from "@/features/admin/sponsorship/sponsorship.types";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import PaginationControls from "@/components/ui/PaginationControls";

export default function AdminSponsoredProductsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error, isFetching } = useGetSponsorships(
    page,
    limit
  );

  const sponsorships = data?.data?.sponsorships || [];
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
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
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

  const getPaymentMethodBadge = (method: string) => {
    switch (method.toLowerCase()) {
      case "stripe":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">
            <CreditCard className="w-3 h-3 mr-1" />
            Stripe
          </Badge>
        );
      case "paypal":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            <CreditCard className="w-3 h-3 mr-1" />
            PayPal
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
            <CreditCard className="w-3 h-3 mr-1" />
            {method}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
  };

  const totalRevenue = sponsorships
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => sum + s.amount, 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sponsored Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Monitor and manage product sponsorships
            </p>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-xl">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg animate-pulse">
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Sponsorships
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Failed to load sponsored products. Please try again.
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
            Sponsored Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor and manage product sponsorships
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Sponsorships
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
                Completed
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {sponsorships.filter((s) => s.status === "completed").length}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
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
                {sponsorships.filter((s) => s.status === "pending").length}
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
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <AdminTable>
        <AdminTableHeader>
          <tr>
            <AdminTableHeaderCell>Product</AdminTableHeaderCell>
            <AdminTableHeaderCell>Creator</AdminTableHeaderCell>
            <AdminTableHeaderCell>Sponsorship Details</AdminTableHeaderCell>
            <AdminTableHeaderCell>Payment & Status</AdminTableHeaderCell>
            <AdminTableHeaderCell>Timeline</AdminTableHeaderCell>
            <AdminTableHeaderCell align="center">Actions</AdminTableHeaderCell>
          </tr>
        </AdminTableHeader>
        <AdminTableBody>
          {sponsorships.length === 0 ? (
            <AdminTableRow>
              <td colSpan={6} className="text-center py-8">
                <div className="text-gray-500 dark:text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No sponsored products found</p>
                </div>
              </td>
            </AdminTableRow>
          ) : (
            sponsorships.map((sponsorship) => (
              <AdminTableRow key={sponsorship.id} hoverable={true}>
                {/* Product Cell */}
                <AdminTableCell>
                  <div className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={sponsorship.product.thumbnail_url}
                      alt={sponsorship.product.title}
                      width={48}
                      height={48}
                      className="flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm">
                        {sponsorship.product.title}
                      </div>
                      <div className="mt-1">
                        {getStageBadge(sponsorship.product.current_stage)}
                      </div>
                    </div>
                  </div>
                </AdminTableCell>

                {/* Creator Cell */}
                <AdminTableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {sponsorship.creator.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      @{sponsorship.creator.username}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {sponsorship.creator.email}
                    </div>
                  </div>
                </AdminTableCell>

                {/* Sponsorship Details Cell */}
                <AdminTableCell>
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-flyverr-primary dark:text-flyverr-secondary">
                      {formatCurrency(sponsorship.amount)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Sponsorship ID: {sponsorship.id.slice(0, 8)}...
                    </div>
                  </div>
                </AdminTableCell>

                {/* Payment & Status Cell */}
                <AdminTableCell>
                  <div className="space-y-2">
                    {getPaymentMethodBadge(sponsorship.payment_method)}
                    {getStatusBadge(sponsorship.status)}
                  </div>
                </AdminTableCell>

                {/* Timeline Cell */}
                <AdminTableCell>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900 dark:text-white flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                      {formatDate(sponsorship.created_at)}
                    </div>
                    {sponsorship.completed_at && (
                      <div className="text-xs text-green-600 dark:text-green-400">
                        Completed: {formatDate(sponsorship.completed_at)}
                      </div>
                    )}
                    {!sponsorship.completed_at &&
                      sponsorship.status === "pending" && (
                        <div className="text-xs text-yellow-600 dark:text-yellow-400">
                          Processing...
                        </div>
                      )}
                  </div>
                </AdminTableCell>

                {/* Actions Cell */}
                <AdminTableCell align="center">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400"
                    >
                      <BarChart3 className="w-3 h-3" />
                    </Button>
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
          totalPages={Math.ceil(pagination.total / parseInt(pagination.limit))}
          totalCount={pagination.total}
          pageSize={limit}
          onPageChange={handlePageChange}
          onPageSizeChange={handleLimitChange}
          disabled={isFetching}
          entityLabel="sponsorships"
          className="mt-4"
        />
      )}
    </div>
  );
}
