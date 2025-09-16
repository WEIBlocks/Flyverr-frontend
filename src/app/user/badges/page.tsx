"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Shield,
  Star,
  Trophy,
  Users,
  DollarSign,
  Award,
} from "lucide-react";
import { useGetUserBadges } from "@/features/user/badge/hooks/useGetUserBadges";
import BadgeProgressBar from "@/components/ui/BadgeProgressBar";
import type { UserBadge } from "@/features/user/badge/badge.types";

export default function UserBadgesPage() {
  const { data, isLoading, error } = useGetUserBadges();

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Error loading badges
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Failed to fetch your badge information. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              No badge data found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Unable to load your badge information at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { badges, progress, allBadges } = data.data;

  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            My Badges
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            Track your achievements and progress towards new badges
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                  <Award className="w-5 h-5 text-flyverr-primary" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Badges
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {badges.length}
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
                    {
                      badges.filter((b) => b.badge.badge_type === "creator")
                        .length
                    }
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
                    {
                      badges.filter((b) => b.badge.badge_type === "reseller")
                        .length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Creator Progress */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                </div>
                Creator Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BadgeProgressBar
                progress={progress.creator}
                badgeType="creator"
              />
            </CardContent>
          </Card>

          {/* Reseller Progress */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                </div>
                Reseller Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BadgeProgressBar
                progress={progress.reseller}
                badgeType="reseller"
              />
            </CardContent>
          </Card>
        </div>

        {/* Earned Badges */}
        {badges.length > 0 && (
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm mt-6 sm:mt-8">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 sm:p-2 bg-flyverr-primary/10 rounded-lg">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-flyverr-primary" />
                </div>
                Earned Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((userBadge: UserBadge) => (
                  <div
                    key={userBadge.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-2"
                        style={{
                          backgroundColor: userBadge.badge.color + "15",
                          borderColor: userBadge.badge.color + "40",
                        }}
                      >
                        <img
                          src={userBadge.badge.icon_url}
                          alt={userBadge.badge.display_name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {userBadge.badge.display_name}
                          </h3>
                          <Badge className={getTierColor(userBadge.badge.tier)}>
                            {getTierIcon(userBadge.badge.tier)}
                            <span className="ml-1 capitalize text-xs">
                              {userBadge.badge.tier}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {userBadge.badge.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                          <span>Earned: {formatDate(userBadge.earned_at)}</span>
                          {userBadge.current_amount > 0 && (
                            <span>${userBadge.current_amount}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Available Badges */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm mt-6 sm:mt-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              </div>
              All Available Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allBadges.map((badge) => {
                const isEarned = badges.some((ub) => ub.badge.id === badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isEarned
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-2 ${
                          isEarned ? "opacity-100" : "opacity-60"
                        }`}
                        style={{
                          backgroundColor: badge.color + "15",
                          borderColor: badge.color + "40",
                        }}
                      >
                        <img
                          src={badge.icon_url}
                          alt={badge.display_name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {badge.display_name}
                          </h3>
                          <Badge className={getTierColor(badge.tier)}>
                            {getTierIcon(badge.tier)}
                            <span className="ml-1 capitalize text-xs">
                              {badge.tier}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {badge.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-500">
                            <DollarSign className="w-3 h-3 inline mr-1" />$
                            {badge.min_amount.toLocaleString()}
                            {badge.max_amount &&
                              ` - $${badge.max_amount.toLocaleString()}`}
                          </span>
                          {isEarned && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs">
                              Earned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
