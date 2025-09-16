"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Star, Trophy, Users, DollarSign } from "lucide-react";
import { useGetAllBadges } from "@/features/admin/badge/hooks/useGetAllBadges";
import AdminUserDetailSkeleton from "@/components/ui/AdminUserDetailSkeleton";
import ReferralStatsCard from "@/features/admin/referral/components/ReferralStatsCard";

export default function AdminBadgesPage() {
  const { data, isLoading, error } = useGetAllBadges();

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "verified":
        return <Shield className="w-4 h-4" />;
      case "gold":
        return <Star className="w-4 h-4" />;
      case "ultimate":
        return <Trophy className="w-4 h-4" />;
      default:
        return <Crown className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "verified":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "ultimate":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  const formatAmount = (amount: number | null) => {
    if (amount === null) return "No limit";
    return `$${amount.toLocaleString()}`;
  };

  if (isLoading) {
    return <AdminUserDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Error loading badges
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Failed to fetch badge information. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.data?.badges) {
    return (
      <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              No badges found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              No badge information is available at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { badges, total } = data.data;

  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Badge & Referral Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            Manage platform badges and view referral system statistics
          </p>
        </div>

        {/* Referral Statistics */}
        <div className="mb-6 sm:mb-8">
          <ReferralStatsCard />
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                  <Crown className="w-5 h-5 text-flyverr-primary" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Badges
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {total}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Creator Badges
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {badges.creator.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Reseller Badges
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {badges.reseller.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Creator Badges */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                </div>
                Creator Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {badges.creator.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg border-2"
                        style={{
                          backgroundColor: badge.color + "15",
                          borderColor: badge.color + "40",
                        }}
                      >
                        <img
                          src={badge.icon_url}
                          alt={badge.display_name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {badge.display_name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={getTierColor(badge.tier)}>
                      {getTierIcon(badge.tier)}
                      <span className="ml-1 capitalize">{badge.tier}</span>
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      {formatAmount(badge.min_amount)} -{" "}
                      {formatAmount(badge.max_amount)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        badge.is_active
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {badge.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reseller Badges */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                </div>
                Reseller Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {badges.reseller.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg border-2"
                        style={{
                          backgroundColor: badge.color + "15",
                          borderColor: badge.color + "40",
                        }}
                      >
                        <img
                          src={badge.icon_url}
                          alt={badge.display_name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {badge.display_name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={getTierColor(badge.tier)}>
                      {getTierIcon(badge.tier)}
                      <span className="ml-1 capitalize">{badge.tier}</span>
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      {formatAmount(badge.min_amount)} -{" "}
                      {formatAmount(badge.max_amount)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        badge.is_active
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {badge.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
