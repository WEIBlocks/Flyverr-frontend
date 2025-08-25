"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Search,
  RefreshCw,
  ArrowLeft,
  Package,
  Download,
  Eye,
  Tag,
  Activity,
} from "lucide-react";
import { useEarnings } from "@/features/user/earnings/hooks/useEarnings";
import {
  Earning,
  EarningsResponse,
} from "@/features/user/earnings/earnings.types";
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

export default function UserEarningsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, error, refetch } = useEarnings(
    currentPage,
    itemsPerPage
  );
  const typed = (data as EarningsResponse) || undefined;

  const earnings = typed?.data?.earnings || [];
  const earningsOverview = typed?.data?.summary;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getEarningTypeColor = (type: string) => {
    switch (type) {
      case "royalty":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "resale":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getEarningTypeIcon = (type: string) => {
    switch (type) {
      case "royalty":
        return <DollarSign className="w-4 h-4 text-purple-600" />;
      case "resale":
        return <Tag className="w-4 h-4 text-blue-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  // Filter earnings based on search term
  const filteredEarnings = earnings.filter(
    (earning) =>
      earning.earning_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      earning.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Error loading earnings
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Something went wrong while fetching your earnings.
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
      <div className="flex items-center justify-between mb-8">
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Earnings
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Track your earnings from royalties and resales
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Earnings Overview Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Earnings
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(earningsOverview?.total ?? 0)}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Available
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(earningsOverview?.available ?? 0)}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Withdrawn
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(earningsOverview?.withdrawn ?? 0)}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Reserved
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(earningsOverview?.reserved ?? 0)}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search earnings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="flex items-center space-x-3"></div>
      </div>

      {/* Earnings Table */}
      <AdminTable>
        <AdminTableHeader>
          <tr>
            <AdminTableHeaderCell>Type</AdminTableHeaderCell>
            <AdminTableHeaderCell>Amount</AdminTableHeaderCell>
            <AdminTableHeaderCell>Status</AdminTableHeaderCell>
            <AdminTableHeaderCell>Date</AdminTableHeaderCell>
            <AdminTableHeaderCell>Transaction ID</AdminTableHeaderCell>
            <AdminTableHeaderCell>Payout ID</AdminTableHeaderCell>
          </tr>
        </AdminTableHeader>
        <AdminTableBody>
          {isLoading ? (
            // Loading skeleton
            [...Array(10)].map((_, index) => (
              <AdminTableRow key={index}>
                <AdminTableCell>
                  <div className="animate-pulse flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                  </div>
                </AdminTableCell>
                {[...Array(5)].map((_, i) => (
                  <AdminTableCell key={i}>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                  </AdminTableCell>
                ))}
              </AdminTableRow>
            ))
          ) : filteredEarnings.length === 0 ? (
            <AdminTableRow>
              <AdminTableCell colSpan={6}>
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {searchTerm
                      ? "No matching earnings found"
                      : "No earnings yet"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    {searchTerm
                      ? "Try adjusting your search terms to find what you're looking for."
                      : "Your earnings will appear here once you start making sales."}
                  </p>
                </div>
              </AdminTableCell>
            </AdminTableRow>
          ) : (
            filteredEarnings.map((earning: Earning) => (
              <AdminTableRow key={earning.id}>
                {/* Type */}
                <AdminTableCell>
                  <div className="flex items-center space-x-2">
                    {getEarningTypeIcon(earning.earning_type)}
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEarningTypeColor(
                        earning.earning_type
                      )}`}
                    >
                      {earning.earning_type}
                    </span>
                  </div>
                </AdminTableCell>

                {/* Amount */}
                <AdminTableCell>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(earning.amount)}
                  </span>
                </AdminTableCell>

                {/* Status */}
                <AdminTableCell>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      earning.is_withdrawn
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {earning.is_withdrawn ? "Withdrawn" : "Available"}
                  </span>
                </AdminTableCell>

                {/* Date */}
                <AdminTableCell>
                  <span className="text-gray-500 dark:text-gray-400">
                    {formatDate(earning.created_at)}
                  </span>
                </AdminTableCell>

                {/* Transaction ID */}
                <AdminTableCell>
                  <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">
                    {earning.id.slice(0, 8)}...
                  </span>
                </AdminTableCell>

                {/* Payout ID */}
                <AdminTableCell>
                  <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">
                    {earning.payout_id
                      ? `${earning.payout_id.slice(0, 8)}...`
                      : "-"}
                  </span>
                </AdminTableCell>
              </AdminTableRow>
            ))
          )}
        </AdminTableBody>
      </AdminTable>

      {/* Pagination */}
      {typed?.data?.pagination && (
        <PaginationControls
          currentPage={typed.data.pagination.currentPage}
          totalPages={typed.data.pagination.totalPages}
          totalCount={typed.data.pagination.totalItems}
          pageSize={typed.data.pagination.itemsPerPage}
          onPageChange={(p) => setCurrentPage(p)}
          onPageSizeChange={(s) => {
            setItemsPerPage(s);
            setCurrentPage(1);
          }}
          entityLabel="earnings"
          className="mt-6"
        />
      )}
    </div>
  );
}
