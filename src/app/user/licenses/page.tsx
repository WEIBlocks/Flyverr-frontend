"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  RefreshCw,
  Eye,
  DollarSign,
  Package,
  AlertCircle,
} from "lucide-react";
import { useGetMyLicenses } from "@/features/user/licenses/hooks/useGetMyLicenses";

export default function MyLicensesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data, isLoading, error } = useGetMyLicenses();

  type GetMyLicensesResponse = {
    success: boolean;
    message: string;
    data: {
      licenses: Array<{
        product: {
          id: string;
          title: string;
          description: string;
          thumbnail_url: string;
          current_stage: string;
          current_round: number;
          original_price: number;
          total_licenses: number;
          remaining_licenses: number;
          creator: {
            id: string;
            name: string;
            username: string;
          };
        };
        licenses: Array<{
          id: string;
          license_token: string;
          purchase_type: string;
          resale_eligible: boolean;
          current_round: number;
          purchased_round: number;
          is_listed_for_resale: boolean;
          is_enabled_by_user_for_resale: boolean;
          created_at: string;
          acquired_at: string;
          purchase_amount: number;
          purchase_date: string;
        }>;
      }>;
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    };
  };

  type FlattenedLicense = {
    id: string;
    productTitle: string;
    productImage: string;
    licenseType: string;
    purchaseDate: string;
    purchaseAmount: number;
    resaleStatus: string;
    productSold: number;
    productTotal: number;
    isCompleted: boolean;
    isListed: boolean;
    isEnabledForResale: boolean;
    resaleEligible: boolean;
  };

  const licenses: FlattenedLicense[] = useMemo(() => {
    const apiData = data as GetMyLicensesResponse | undefined;
    const list = apiData?.data?.licenses || [];
    const flattened: FlattenedLicense[] = [];
    for (const item of list) {
      const product = item.product;
      const productSold = Math.max(
        0,
        (product?.total_licenses || 0) - (product?.remaining_licenses || 0)
      );
      const productTotal = product?.total_licenses || 0;
      for (const lic of item.licenses || []) {
        const isListed = !!lic.is_listed_for_resale;
        const isEnabledForResale = !!lic.is_enabled_by_user_for_resale;
        const resaleEligible = !!lic.resale_eligible;
        let resaleStatus = "inactive";
        if (isListed) resaleStatus = "active";
        else if (!resaleEligible) resaleStatus = "expired";
        const row: FlattenedLicense = {
          id: lic.id,
          productTitle: product?.title || "Untitled",
          productImage: product?.thumbnail_url || "",
          licenseType: lic.purchase_type || "",
          purchaseDate: lic.purchase_date || lic.acquired_at || "",
          purchaseAmount: Number(lic.purchase_amount || 0),
          resaleStatus,
          productSold,
          productTotal,
          isCompleted: false,
          isListed,
          isEnabledForResale,
          resaleEligible,
        };
        flattened.push(row);
      }
    }
    return flattened;
  }, [data]);

  const filteredLicenses = licenses.filter((license) => {
    const matchesSearch =
      license.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.licenseType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || license.resaleStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleResellNow = (licenseId: string) => {
    // Handle resell action
    console.log("Reselling license:", licenseId);
  };

  const handleRenewResale = (licenseId: string) => {
    // Handle resale renewal
    console.log("Renewing resale for license:", licenseId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      case "inactive":
        return "Inactive";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Licenses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your purchased licenses and resale opportunities
          </p>
        </div>
      </div>

      {isLoading && (
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Loading licenses...
            </div>
          </CardContent>
        </Card>
      )}
      {error && (
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center text-red-700 dark:text-red-300 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              Failed to load licenses
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search licenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-700"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-flyverr-primary dark:focus:ring-flyverr-secondary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Licenses Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          My Licenses
        </h2>
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      License Bought
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Resale Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Purchase
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Resale Progress
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredLicenses.map((license) => (
                    <tr
                      key={license.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shadow-sm"
                              src={license.productImage}
                              alt={license.productTitle}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {license.productTitle}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {license.licenseType}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              Purchased:{" "}
                              {license.purchaseDate
                                ? formatDate(license.purchaseDate)
                                : "-"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <Badge
                            className={`${getStatusColor(
                              license.resaleStatus
                            )} font-medium`}
                          >
                            {getStatusText(license.resaleStatus)}
                          </Badge>
                          {license.isCompleted && (
                            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              License Completed
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {license.purchaseDate
                              ? formatDate(license.purchaseDate)
                              : "-"}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            ${license.purchaseAmount}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Resales
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {license.productSold}/{license.productTotal}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-flyverr-primary to-flyverr-secondary h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  license.productTotal
                                    ? (license.productSold /
                                        license.productTotal) *
                                      100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {license.resaleStatus === "active" &&
                            !license.isCompleted && (
                              <Button
                                size="sm"
                                className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                onClick={() => handleResellNow(license.id)}
                              >
                                <DollarSign className="w-4 h-4 mr-1" />
                                Resell Now
                              </Button>
                            )}
                          {license.resaleStatus === "inactive" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                              onClick={() => handleRenewResale(license.id)}
                            >
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Renew Resale
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {filteredLicenses.length === 0 && (
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No licenses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              {searchTerm || selectedStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "You haven't purchased any licenses yet. Start exploring the marketplace!"}
            </p>
            {!searchTerm && selectedStatus === "all" && (
              <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                Browse Marketplace
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
