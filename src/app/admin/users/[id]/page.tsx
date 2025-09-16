"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Shield,
  Crown,
  Activity,
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  Edit,
  Save,
} from "lucide-react";
import { useGetUserById } from "@/features/admin/user/hooks/useGetUserById";
import { useUpdateUserStatus } from "@/features/admin/user/hooks/useUpdateUserStatus";
import { useUpdateUserRole } from "@/features/admin/user/hooks/useUpdateUserRole";
import { useAssignBadge } from "@/features/admin/badge/hooks/useAssignBadge";
import { useGetUserBadgeStatus } from "@/features/admin/badge/hooks/useGetUserBadgeStatus";
import AdminUserDetailSkeleton from "@/components/ui/AdminUserDetailSkeleton";
import StatusUpdateModal from "@/components/ui/StatusUpdateModal";
import BadgeAssignmentModal from "@/components/ui/BadgeAssignmentModal";
import {
  AdminUser,
  UserStatistics,
  RecentActivity,
  UserDetailResponse,
  RecentProduct,
} from "@/features/admin/user/user.types";
import { swal } from "@/lib/utils";
import { createUserFriendlyError } from "@/lib/errorUtils";

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const [editData, setEditData] = useState({
    role: "",
    status: "",
    reason: "",
  });
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  const { data, isLoading, error } = useGetUserById(userId);
  const { data: badgeData, isLoading: badgeLoading } =
    useGetUserBadgeStatus(userId);
  const updateStatusMutation = useUpdateUserStatus();
  const updateRoleMutation = useUpdateUserRole();
  const assignBadgeMutation = useAssignBadge();

  // Initialize editData when user data loads
  React.useEffect(() => {
    if (data?.data?.user) {
      setEditData({
        role: data.data.user.role,
        status: data.data.user.status,
        reason: "",
      });
    }
  }, [data]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">
            Admin
          </Badge>
        );
      case "user":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            User
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
            {role}
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
            Suspended
          </Badge>
        );
      case "banned":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
            Banned
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleUpdate = () => {
    if (!editData.reason.trim()) {
      alert("Please provide a reason for the role change");
      return;
    }

    updateRoleMutation.mutate(
      {
        userId,
        data: {
          role: editData.role as "user" | "admin",
          reason: editData.reason,
        },
      },
      {
        onSuccess: () => {
          // Show success message or toast
          console.log("Role updated successfully");
          // Clear the reason field after successful update
          setEditData((prev) => ({ ...prev, reason: "" }));
        },
        onError: (error) => {
          // Show error message or toast
          swal("Error", createUserFriendlyError(error), "error");
        },
      }
    );
  };

  const handleStatusUpdate = (statusData: {
    status: "active" | "suspended" | "banned";
    reason?: string;
    adminNotes?: string;
    suspensionDuration?: number;
  }) => {
    updateStatusMutation.mutate(
      { userId, data: statusData },
      {
        onSuccess: () => {
          setIsStatusModalOpen(false);
          // Show success message or toast
        },
        onError: (error) => {
          // Show error message or toast
          swal("Error", createUserFriendlyError(error), "error");
        },
      }
    );
  };

  const handleBadgeAssignment = () => {
    assignBadgeMutation.mutate(
      {
        userId,
        badgeType: "reseller",
      },
      {
        onSuccess: () => {
          setIsBadgeModalOpen(false);
        },
      }
    );
  };

  if (isLoading) {
    return <AdminUserDetailSkeleton />;
  }

  if (!data?.data?.user) {
    return (
      <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            User Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The user you are looking for does not exist.
          </p>
          <Button
            onClick={() => router.push("/admin/users")}
            className="bg-flyverr-primary hover:bg-flyverr-primary/90"
          >
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  const user = data.data.user;
  const statistics = data.data.statistics;
  const recentActivity = data.data.recentActivity;

  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 sm:mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-flyverr-primary text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-flyverr-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg sm:text-2xl">
                  {user.first_name.charAt(0)}
                  {user.last_name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  {user.first_name} {user.last_name}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                  @{user.username} • {user.email}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                  {user.email_verified && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - User Details Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-flyverr-primary/10 rounded-lg">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-flyverr-primary" />
                  </div>
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name
                    </Label>
                    <Input
                      value={user.first_name}
                      disabled
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name
                    </Label>
                    <Input
                      value={user.last_name}
                      disabled
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </Label>
                  <Input
                    value={user.username}
                    disabled
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <Input
                    value={user.email}
                    disabled
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </Label>
                  <Textarea
                    value={user.bio || "No bio provided"}
                    disabled
                    rows={2}
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm sm:text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Role Update Section */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-flyverr-primary/10 rounded-lg">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-flyverr-primary" />
                  </div>
                  Role Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      User Role
                    </Label>
                    <select
                      value={editData.role || user.role}
                      onChange={(e) =>
                        setEditData({ ...editData, role: e.target.value })
                      }
                      className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-flyverr-primary/20 focus:border-flyverr-primary"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      Reason for Role Change{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      value={editData.reason}
                      onChange={(e) =>
                        setEditData({ ...editData, reason: e.target.value })
                      }
                      placeholder="Provide a reason for changing the user's role"
                      rows={2}
                      maxLength={500}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-flyverr-primary/20 focus:border-flyverr-primary text-sm sm:text-base"
                      required
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                      {editData.reason.length}/500
                    </div>
                  </div>

                  {/* Update Role Button */}
                  <div className="flex justify-end pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-600">
                    <Button
                      onClick={handleUpdate}
                      disabled={
                        updateRoleMutation.isPending || !editData.reason.trim()
                      }
                      className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      {updateRoleMutation.isPending
                        ? "Updating..."
                        : "Update Role"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Update Section */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-flyverr-primary/10 rounded-lg">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-flyverr-primary" />
                  </div>
                  Status Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Status
                    </Label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      {getStatusBadge(user.status)}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsStatusModalOpen(true)}
                        className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10 text-sm sm:text-base px-3 sm:px-4 py-2"
                      >
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Update Status
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Click the button above to change user status with detailed
                    options including reason, admin notes, and suspension
                    duration.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badge Management */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-flyverr-primary/10 rounded-lg">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-flyverr-primary" />
                  </div>
                  Badge Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      Verified Reseller Badge
                    </Label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                        Verified Reseller
                      </Badge>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsBadgeModalOpen(true)}
                        className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10 text-sm sm:text-base px-3 sm:px-4 py-2"
                      >
                        <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Make User Verified Reseller
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Assign the verified reseller badge to allow this user to
                    create and list products for sale. This badge is required
                    for product creation.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Badge Status */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-flyverr-primary/10 rounded-lg">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-flyverr-primary" />
                  </div>
                  User Badge Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {badgeLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 animate-spin rounded-full border-2 border-flyverr-primary border-t-transparent" />
                  </div>
                ) : badgeData?.data ? (
                  <div className="space-y-4">
                    {/* Badge Count and Status */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Total Badges Earned
                        </p>
                        <p className="text-2xl font-bold text-flyverr-primary">
                          {badgeData.data.badgeCount}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Can Create Products
                        </p>
                        <Badge
                          className={
                            badgeData.data.canCreateProducts
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
                          }
                        >
                          {badgeData.data.canCreateProducts ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>

                    {/* User's Badges */}
                    {badgeData.data.badges.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                          Earned Badges:
                        </h4>
                        <div className="space-y-2">
                          {badgeData.data.badges.map((userBadge) => (
                            <div
                              key={userBadge.id}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-2"
                                  style={{
                                    backgroundColor:
                                      userBadge.badge.color + "15",
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
                                <div>
                                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                                    {userBadge.badge.display_name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Earned:{" "}
                                    {new Date(
                                      userBadge.earned_at
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-xs">
                                  {userBadge.badge.tier}
                                </Badge>
                                {userBadge.current_amount > 0 && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    ${userBadge.current_amount}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Crown className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No badges earned yet
                        </p>
                      </div>
                    )}

                    {/* Highest Badges */}
                    {(badgeData.data.highestBadges.creator ||
                      badgeData.data.highestBadges.reseller) && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                          Highest Achievements:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {badgeData.data.highestBadges.creator && (
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                  Creator:{" "}
                                  {
                                    badgeData.data.highestBadges.creator
                                      .display_name
                                  }
                                </span>
                              </div>
                            </div>
                          )}
                          {badgeData.data.highestBadges.reseller && (
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                  Reseller:{" "}
                                  {
                                    badgeData.data.highestBadges.reseller
                                      .display_name
                                  }
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Unable to load badge information
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Statistics */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-flyverr-primary/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-flyverr-primary" />
                  </div>
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Products
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    {statistics.totalProducts}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Licenses
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    {statistics.totalLicenses}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Purchases
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    {statistics.totalPurchases}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Sales
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    {statistics.totalSales}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Spent
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    ${statistics.totalSpent}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Earned
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    ${statistics.totalEarned}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-flyverr-primary/10 rounded-lg">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-flyverr-primary" />
                  </div>
                  Recent Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.products.length > 0 ? (
                  <div className="space-y-2 sm:space-y-3">
                    {recentActivity.products
                      .slice(0, 3)
                      .map((product: RecentProduct) => (
                        <div
                          key={product.id}
                          className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                {product.title}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                {getStatusBadge(product.status)}
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-xs">
                                  {product.current_stage}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(product.created_at)}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {product.remaining_licenses}/
                                {product.total_licenses} licenses
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No products yet
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Timestamps */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-flyverr-primary/10 rounded-lg">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-flyverr-primary" />
                  </div>
                  Timestamps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Joined
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(user.created_at)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Updated
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(user.updated_at)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      <StatusUpdateModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        currentStatus={user.status}
        onUpdate={handleStatusUpdate}
        isLoading={updateStatusMutation.isPending}
      />

      {/* Badge Assignment Modal */}
      <BadgeAssignmentModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        onConfirm={handleBadgeAssignment}
        isLoading={assignBadgeMutation.isPending}
        userName={`${user.first_name} ${user.last_name}`}
        badgeType="reseller"
      />
    </div>
  );
}
