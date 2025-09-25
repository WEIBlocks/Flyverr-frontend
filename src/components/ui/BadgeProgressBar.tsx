"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Star, Trophy, Users, DollarSign } from "lucide-react";
import type {
  BadgeProgress,
  Badge as BadgeType,
} from "@/features/user/badge/badge.types";

interface BadgeProgressBarProps {
  progress: BadgeProgress;
  badgeType: "creator" | "reseller";
  className?: string;
}

export default function BadgeProgressBar({
  progress,
  badgeType,
  className = "",
}: BadgeProgressBarProps) {
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

  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const getProgressColor = () => {
    if (progress.progress >= 100) return "bg-green-500";
    if (progress.progress >= 75) return "bg-yellow-500";
    if (progress.progress >= 50) return "bg-blue-500";
    return "bg-gray-400";
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Badge */}
      {progress.currentBadge && (
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-2"
            style={{
              backgroundColor: progress.currentBadge.color + "15",
              borderColor: progress.currentBadge.color + "40",
            }}
          >
            <img
              src={progress.currentBadge.icon_url}
              alt={progress.currentBadge.display_name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {progress.currentBadge.display_name}
              </h3>
              <Badge className={getTierColor(progress.currentBadge.tier)}>
                {getTierIcon(progress.currentBadge.tier)}
                <span className="ml-1 capitalize">
                  {progress.currentBadge.tier}
                </span>
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {progress.currentBadge.description}
            </p>
          </div>
        </div>
      )}

      {/* Highest Badge Achieved */}
      {progress.currentBadge &&
        !progress.nextBadge &&
        progress.progress === 100 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                🎉 You've achieved the highest {badgeType} badge!
              </h4>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-2"
                  style={{
                    backgroundColor: progress.currentBadge.color + "15",
                    borderColor: progress.currentBadge.color + "40",
                  }}
                >
                  <img
                    src={progress.currentBadge.icon_url}
                    alt={progress.currentBadge.display_name}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {progress.currentBadge.display_name}
                    </h3>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <Trophy className="w-3 h-3 mr-1" />
                      <span className="text-xs">Highest Tier</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {progress.currentBadge.description}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600 dark:text-green-400">
                    <DollarSign className="w-4 h-4" />
                    <span>Total: {formatAmount(progress.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Progress to Next Badge */}
      {progress.nextBadge && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-flyverr-primary/10 rounded-lg">
                {badgeType === "creator" ? (
                  <Users className="w-4 h-4 text-flyverr-primary" />
                ) : (
                  <Shield className="w-4 h-4 text-flyverr-primary" />
                )}
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Progress to {progress.nextBadge.display_name}
              </h4>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {progress.progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${Math.min(progress.progress, 100)}%` }}
            />
          </div>

          {/* Amount Details */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{formatAmount(progress.totalAmount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Goal: {formatAmount(progress.nextBadge.min_amount)}</span>
            </div>
          </div>

          {/* Next Badge Preview */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm border-2 opacity-60"
              style={{
                backgroundColor: progress.nextBadge.color + "15",
                borderColor: progress.nextBadge.color + "40",
              }}
            >
              <img
                src={progress.nextBadge.icon_url}
                alt={progress.nextBadge.display_name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
                {progress.nextBadge.display_name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {progress.nextBadge.description}
              </p>
            </div>
            <Badge
              className={`${getTierColor(progress.nextBadge.tier)} text-xs`}
            >
              {getTierIcon(progress.nextBadge.tier)}
              <span className="ml-1 capitalize">{progress.nextBadge.tier}</span>
            </Badge>
          </div>
        </div>
      )}

      {/* No Progress Available */}
      {!progress.currentBadge && !progress.nextBadge && (
        <div className="text-center py-6">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            {badgeType === "creator" ? (
              <Users className="w-8 h-8 text-gray-400" />
            ) : (
              <Shield className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No {badgeType} progress available yet
          </p>
        </div>
      )}
    </div>
  );
}
