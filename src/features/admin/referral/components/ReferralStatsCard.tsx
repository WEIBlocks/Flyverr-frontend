"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  DollarSign,
  Gift,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useGetReferralStats } from "../hooks/useGetReferralStats";
import AdminUserDetailSkeleton from "@/components/ui/AdminUserDetailSkeleton";

export default function ReferralStatsCard() {
  const { data, isLoading, error } = useGetReferralStats();

  if (isLoading) {
    return <AdminUserDetailSkeleton />;
  }

  if (error) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            Referral Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
              Error loading referral statistics
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Failed to fetch referral data. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data?.data) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            Referral Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No referral data available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Referral statistics will appear here once users start using the
              system.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = data.data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          Referral Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Referrals */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Total Referrals
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.totalReferrals}
                </p>
              </div>
              <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Admin Code Signups */}
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Admin Code Signups
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.adminCodeSignups}
                </p>
              </div>
              <div className="p-2 bg-green-200 dark:bg-green-800 rounded-lg">
                <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Total Paid Out */}
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Total Paid Out
                </p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {formatCurrency(stats.totalPaidOut)}
                </p>
              </div>
              <div className="p-2 bg-purple-200 dark:bg-purple-800 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Breakdown */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Bonus Breakdown
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Signup Bonuses */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Gift className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Signup Bonuses
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {stats.signupBonusesPaid}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      $1.00 each
                    </p>
                  </div>
                </div>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800">
                  {formatCurrency(stats.signupBonusesPaid * 1.0)}
                </Badge>
              </div>
            </div>

            {/* Purchase Bonuses */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <ShoppingCart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Purchase Bonuses
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {stats.purchaseBonusesPaid}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      $4.00 each
                    </p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                  {formatCurrency(stats.purchaseBonusesPaid * 4.0)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white">
                Referral System Performance
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stats.totalReferrals > 0
                  ? `${Math.round(
                      (stats.totalReferrals /
                        (stats.totalReferrals + stats.adminCodeSignups)) *
                        100
                    )}% of signups came from referrals`
                  : "No referrals yet"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.totalPaidOut)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Incentives Paid
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
