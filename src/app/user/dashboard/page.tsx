"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Key,
  DollarSign,
  Eye,
  Activity,
  Tag,
  Download,
} from "lucide-react";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useDashboardStats } from "@/features/user/dashboard/hooks/useDashboardStats";
import { useResaleListings } from "@/features/user/dashboard/hooks/useResaleListings";
import { ResaleListing } from "@/features/user/dashboard/dashboard.types";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useRouter } from "next/navigation";
import { useEarnings } from "@/features/user/earnings/hooks/useEarnings";
import { Earning } from "@/features/user/earnings/earnings.types";

export default function DashboardPage() {
  const router = useRouter();
  const { data: user } = useGetCurrentUser();
  const { data: statsData, isLoading: isStatsLoading } = useDashboardStats();
  const { data: resaleData, isLoading: isResaleLoading } = useResaleListings(
    1,
    5
  );
  const { data: earningsData, isLoading: isEarningsLoading } = useEarnings();

  const stats = (statsData as any)?.data || null;
  const resaleListings = (resaleData as any)?.data?.listings || [];
  const earnings = (earningsData as any)?.data?.earnings || [];
  const earningsOverview = (earningsData as any)?.data?.summary || null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const dashboardStats = [
    {
      title: "Total Revenue",
      value: stats ? formatCurrency(stats.total_revenue) : "$0",
      change: "+0%",
      changeType: "neutral",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Products",
      value: stats ? stats.active_products.toString() : "0",
      change: "+0",
      changeType: "neutral",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Licenses",
      value: stats ? stats.total_licenses.toString() : "0",
      change: "+0",
      changeType: "neutral",
      icon: Key,
      color: "text-purple-600",
    },
    {
      title: "Sold Licenses",
      value: stats ? stats.sold_licenses.toString() : "0",
      change: "+0",
      changeType: "neutral",
      icon: Eye,
      color: "text-orange-600",
    },
  ];

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

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome back, {user?.first_name}! Here&apos;s what&apos;s happening
          with your digital products.
        </p>
      </div>

      {/* Section 1: Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Statistics Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isStatsLoading
            ? // Loading skeleton
              [...Array(4)].map((_, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                        </div>
                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : dashboardStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                          <p
                            className={`text-sm font-medium ${
                              stat.changeType === "positive"
                                ? "text-green-600 dark:text-green-400"
                                : stat.changeType === "negative"
                                ? "text-red-600 dark:text-red-400"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {stat.change}
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-full ${stat.color} dark:bg-opacity-20 bg-opacity-10`}
                        >
                          <Icon
                            className={`w-6 h-6 ${stat.color} dark:text-opacity-80`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
        </div>
      </div>

      {/* Section 2: Resale Listings */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Resale Listings
          </h2>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => router.push("/user/user-listings")}
          >
            <Tag className="w-4 h-4" />
            <span>View All</span>
          </Button>
        </div>
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Stage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Round
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Acquired Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {isResaleLoading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="animate-pulse">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                              <div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1 w-32"></div>
                                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        {[...Array(5)].map((_, i) => (
                          <td key={i} className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : resaleListings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>No resale listings found</p>
                          <p className="text-sm mt-1">
                            Your resale-eligible licenses will appear here
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    resaleListings.map((listing: ResaleListing) => (
                      <tr
                        key={listing.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <ImageWithFallback
                              src={listing.product.thumbnail_url}
                              alt={listing.product.title}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {listing.product.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {listing.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                          {formatCurrency(listing.product.original_price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(
                              listing.product.current_stage
                            )}`}
                          >
                            {listing.product.current_stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                listing.is_listed_for_resale
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                            ></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {listing.is_listed_for_resale
                                ? "Listed"
                                : "Available"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {listing.product.current_round}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(listing.acquired_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Earnings */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Earnings
          </h2>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => router.push("/user/user-earnings")}
          >
            <DollarSign className="w-4 h-4" />
            <span>View All</span>
          </Button>
        </div>

        {/* Earnings Overview Cards */}
        {isEarningsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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

        {/* Earnings Table */}
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {isEarningsLoading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="animate-pulse flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                          </div>
                        </td>
                        {[...Array(4)].map((_, i) => (
                          <td key={i} className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : earnings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>No earnings found</p>
                          <p className="text-sm mt-1">
                            Your earnings will appear here once you start making
                            sales
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    earnings.slice(0, 5).map((earning: Earning) => (
                      <tr
                        key={earning.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {formatCurrency(earning.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              earning.is_withdrawn
                                ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            }`}
                          >
                            {earning.is_withdrawn ? "Withdrawn" : "Available"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(earning.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {earning.id.slice(0, 8)}...
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
