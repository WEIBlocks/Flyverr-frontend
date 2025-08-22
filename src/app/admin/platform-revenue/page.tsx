"use client";

import React, { useState, useEffect } from "react";
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Calendar,
  User,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  BarChart3,
  Filter,
  Search,
  RefreshCw,
  Shield,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useGetRevenue } from "@/features/admin/revenue/hooks/useGetRevenue";
import { useGetTransactions } from "@/features/admin/revenue/hooks/useGetTransactions";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import PaginationControls from "@/components/ui/PaginationControls";

export default function AdminPlatformRevenuePage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [status, setStatus] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: revenueData,
    isLoading: isRevenueLoading,
    error: revenueError,
  } = useGetRevenue();

  const {
    data: transactionsData,
    isLoading: isTransactionsLoading,
    error: transactionsError,
    isFetching,
  } = useGetTransactions(
    page,
    limit,
    status,
    transactionType,
    debouncedSearch,
    undefined,
    undefined,
    sortBy,
    sortOrder
  );

  const revenue = revenueData?.data;
  const transactions = transactionsData?.data?.transactions || [];
  const pagination = transactionsData?.data?.pagination;
  const summary = transactionsData?.data?.summary;

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
      case "refunded":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800">
            <RefreshCw className="w-3 h-3 mr-1" />
            Refunded
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

  const getTransactionTypeBadge = (type: string) => {
    switch (type) {
      case "purchase":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            <Package className="w-3 h-3 mr-1" />
            Purchase
          </Badge>
        );
      case "resale":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">
            <TrendingUp className="w-3 h-3 mr-1" />
            Resale
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
            {type}
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

  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numAmount);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusFilter = (newStatus: string) => {
    setStatus(newStatus === status ? "" : newStatus);
    setPage(1);
  };

  const handleTypeFilter = (newType: string) => {
    setTransactionType(newType === transactionType ? "" : newType);
    setPage(1);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return <ArrowUpDown className="w-3 h-3" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="w-3 h-3" />
    ) : (
      <ArrowDown className="w-3 h-3" />
    );
  };

  if (revenueError || transactionsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Revenue Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Failed to load platform revenue. Please try again.
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
            Platform Revenue
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor platform earnings and transaction analytics
          </p>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      {isRevenueLoading ? (
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
      ) : (
        revenue && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(revenue.totalRevenue)}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Platform + Insurance Fees
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Platform Fees
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(revenue.totalPlatformFees)}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Commission earnings
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Insurance Fees
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(revenue.totalInsuranceFees)}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    Protection revenue
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Avg Per Transaction
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(revenue.avgRevenuePerTransaction)}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    {revenue.totalTransactions} transactions
                  </p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* Revenue Breakdown */}
      {revenue && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Revenue by Transaction Type
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Purchases
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {revenue.revenueByType.purchase.count} transactions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(revenue.revenueByType.purchase.revenue)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Resales
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {revenue.revenueByType.resale.count} transactions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(revenue.revenueByType.resale.revenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Transaction Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Transaction Amount
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(revenue.totalTransactionAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Platform Revenue
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(revenue.totalRevenue)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Revenue Rate
                </span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {(
                    (parseFloat(revenue.totalRevenue) /
                      parseFloat(revenue.totalTransactionAmount)) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by buyer/seller email or product title..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-flyverr-primary dark:focus:border-flyverr-secondary"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusFilter("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              status === ""
                ? "bg-flyverr-primary text-white border-flyverr-primary shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-flyverr-primary hover:text-flyverr-primary"
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => handleStatusFilter("completed")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              status === "completed"
                ? "bg-green-600 text-white border-green-600 shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-green-500 hover:text-green-600"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => handleStatusFilter("pending")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              status === "pending"
                ? "bg-yellow-500 text-white border-yellow-500 shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-yellow-400 hover:text-yellow-600"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleTypeFilter("purchase")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              transactionType === "purchase"
                ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600"
            }`}
          >
            Purchases
          </button>
          <button
            onClick={() => handleTypeFilter("resale")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              transactionType === "resale"
                ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-purple-500 hover:text-purple-600"
            }`}
          >
            Resales
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      {isTransactionsLoading ? (
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
      ) : (
        <>
          {/* Transaction Summary */}
          {summary && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Amount
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(summary.totalAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Platform Fees
                  </p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(summary.totalPlatformFees)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Insurance Fees
                  </p>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(summary.totalInsuranceFees)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Revenue
                  </p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(summary.totalRevenue)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Transactions
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {summary.transactionCount}
                  </p>
                </div>
              </div>
            </div>
          )}

          <AdminTable>
            <AdminTableHeader>
              <tr>
                <AdminTableHeaderCell>Product</AdminTableHeaderCell>
                <AdminTableHeaderCell>
                  <button
                    onClick={() => handleSort("transaction_type")}
                    className="flex items-center space-x-1 hover:text-flyverr-primary"
                  >
                    <span>Type & Status</span>
                    {getSortIcon("transaction_type")}
                  </button>
                </AdminTableHeaderCell>
                <AdminTableHeaderCell>Participants</AdminTableHeaderCell>
                <AdminTableHeaderCell>
                  <button
                    onClick={() => handleSort("amount")}
                    className="flex items-center space-x-1 hover:text-flyverr-primary"
                  >
                    <span>Financial Details</span>
                    {getSortIcon("amount")}
                  </button>
                </AdminTableHeaderCell>
                <AdminTableHeaderCell>
                  <button
                    onClick={() => handleSort("created_at")}
                    className="flex items-center space-x-1 hover:text-flyverr-primary"
                  >
                    <span>Timeline</span>
                    {getSortIcon("created_at")}
                  </button>
                </AdminTableHeaderCell>
              </tr>
            </AdminTableHeader>
            <AdminTableBody>
              {transactions.length === 0 ? (
                <AdminTableRow>
                  <td colSpan={5} className="text-center py-8">
                    <div className="text-gray-500 dark:text-gray-400">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No transactions found</p>
                    </div>
                  </td>
                </AdminTableRow>
              ) : (
                transactions.map((transaction) => (
                  <AdminTableRow key={transaction.id} hoverable={true}>
                    {/* Product Cell */}
                    <AdminTableCell>
                      <div className="flex items-center space-x-3">
                        <ImageWithFallback
                          src={transaction.product.thumbnail_url}
                          alt={transaction.product.title}
                          width={48}
                          height={48}
                          className="flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm">
                            {transaction.product.title}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStageBadge(transaction.product.current_stage)}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Round {transaction.product.current_round}
                            </span>
                          </div>
                        </div>
                      </div>
                    </AdminTableCell>

                    {/* Type & Status Cell */}
                    <AdminTableCell>
                      <div className="space-y-2">
                        {getTransactionTypeBadge(transaction.transaction_type)}
                        {getStatusBadge(transaction.status)}
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {transaction.purchase_type === "resell"
                            ? "For Resale"
                            : "For Use"}
                        </div>
                      </div>
                    </AdminTableCell>

                    {/* Participants Cell */}
                    <AdminTableCell>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                            <User className="w-3 h-3" />
                            <span className="font-medium">
                              {transaction.buyer.first_name}{" "}
                              {transaction.buyer.last_name}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Buyer: @{transaction.buyer.username}
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                            <User className="w-3 h-3" />
                            <span className="font-medium">
                              {transaction.seller.first_name}{" "}
                              {transaction.seller.last_name}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Seller: @{transaction.seller.username}
                          </div>
                        </div>
                      </div>
                    </AdminTableCell>

                    {/* Financial Details Cell */}
                    <AdminTableCell>
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Platform Fee:</span>
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                              {formatCurrency(transaction.platform_fee)}
                            </span>
                          </div>
                          {transaction.has_insurance && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Insurance:</span>
                              <span className="text-purple-600 dark:text-purple-400 font-medium">
                                {formatCurrency(transaction.insurance_fee)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-500">
                              Creator Royalty:
                            </span>
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              {formatCurrency(transaction.creator_royalty)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mt-2">
                          <CreditCard className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {transaction.payment_method}
                          </span>
                          {transaction.has_insurance && (
                            <Shield className="w-3 h-3 text-purple-500" />
                          )}
                        </div>
                      </div>
                    </AdminTableCell>

                    {/* Timeline Cell */}
                    <AdminTableCell>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 dark:text-white flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                          {formatDate(transaction.created_at)}
                        </div>
                        {transaction.completed_at && (
                          <div className="text-xs text-green-600 dark:text-green-400">
                            Completed: {formatDate(transaction.completed_at)}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {transaction.id.slice(0, 8)}...
                        </div>
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
              entityLabel="transactions"
              className="mt-4"
            />
          )}
        </>
      )}
    </div>
  );
}
