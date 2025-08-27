"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetExpiredInsurance } from "@/features/admin/insurance-track/hooks/useGetExpiredInsurance";
import type { InsuranceStatusFilter } from "@/features/admin/insurance-track/insurance.types";
import {
  AlertTriangle,
  Clock,
  DollarSign,
  User,
  Package,
  RefreshCw,
  TrendingUp,
  Shield,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import PendingProductsSkeleton from "@/components/ui/PendingProductsSkeleton";
import InsuranceRecordDetailModal from "@/features/admin/insurance-track/components/InsuranceRecordDetailModal";
import PaginationControls from "@/components/ui/PaginationControls";

export default function StaleResalesPage() {
  const [status, setStatus] = useState<InsuranceStatusFilter>("expired");
  const [includeResold, setIncludeResold] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const {
    data: insuranceData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetExpiredInsurance({ status, includeResold, page, limit });
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handlePageChange = (nextPage: number) => {
    setPage(() =>
      Math.max(
        1,
        Math.min(nextPage, insuranceData?.data?.pagination.totalPages || 1)
      )
    );
  };

  const handleLimitChange = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  const handleTriggerInsuranceResale = (recordId: string) => {
    console.log("Triggering insurance resale for:", recordId);
    // TODO: Implement insurance resale logic
  };

  const handleNotifyOwner = (recordId: string) => {
    console.log("Notifying owner for:", recordId);
    // TODO: Implement notification logic
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const isInitialLoading = isLoading && !insuranceData;

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Insurance Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage expired insurance and overdue resales
            </p>
          </div>
          <Button
            onClick={() => refetch()}
            className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-4" />
                <p className="text-red-500">Failed to load insurance records</p>
                <p className="text-gray-500 text-sm mt-2 dark:text-gray-400">
                  Please try again later
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const records = insuranceData?.data?.records || [];
  const summary = insuranceData?.data?.summary;
  const pagination = insuranceData?.data?.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Insurance Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage expired insurance and overdue resales
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
          />
          {isFetching ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Status:
            </span>
            <div className="flex rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
              {(["all", "active", "expired"] as InsuranceStatusFilter[]).map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setPage(1);
                      setStatus(s);
                    }}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      status === s
                        ? "bg-flyverr-primary text-white"
                        : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={includeResold}
              onChange={(e) => {
                setPage(1);
                setIncludeResold(e.target.checked);
              }}
              className="h-4 w-4 rounded border-gray-300 text-flyverr-primary focus:ring-flyverr-primary"
            />
            Include resold
          </label>
        </div>
      </div>

      {/* Summary Cards */}
      {isInitialLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                    <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                  </div>
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Records
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {summary.total}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Expired
                    </p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {summary.expired}
                    </p>
                  </div>
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Overdue
                    </p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {summary.overdue}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Fees
                    </p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(summary.totalInsuranceFees)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      )}

      {/* Records Table */}
      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-amber-500" />
            <span>Insurance Records</span>
            {summary && (
              <Badge variant="outline" className="ml-2">
                {summary.overdue} overdue
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isInitialLoading ? (
            <div className="p-6">
              <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-4" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2"
                />
              ))}
            </div>
          ) : records.length === 0 ? (
            <div className="p-6 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No insurance records found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Insurance Fee</th>
                    <th className="px-4 py-3">Deadline</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Days Overdue</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer"
                      onClick={() => {
                        setSelectedRecord(record.id);
                        setIsDetailOpen(true);
                      }}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {record.product.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {record.product.currentStage} • Round{" "}
                            {record.product.currentRound}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {record.user.firstName} {record.user.lastName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {record.user.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {formatCurrency(record.insuranceFee)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-gray-900 dark:text-white">
                            {formatDate(record.insuranceDeadline)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(record.purchaseDate)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              record.isOverdue ? "destructive" : "secondary"
                            }
                            className="text-xs"
                          >
                            {record.insuranceStatus}
                          </Badge>
                          {record.isOverdue && (
                            <Badge variant="destructive" className="text-xs">
                              {record.daysOverdue}d overdue
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          {record.isOverdue ? (
                            <>
                              <Clock className="h-4 w-4 text-red-500" />
                              <span className="text-red-600 font-medium">
                                {record.daysOverdue} days
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400">
                              -
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <InsuranceRecordDetailModal
        record={records.find((r) => r.id === selectedRecord) || null}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      {/* Pagination Controls - Reusable */}
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

      {pagination && (
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Showing {(page - 1) * limit + 1} to{" "}
          {Math.min(page * limit, pagination.total)} of {pagination.total}{" "}
          records
        </div>
      )}
    </div>
  );
}
