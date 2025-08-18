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
import AdminUserDetailSkeleton from "@/components/ui/AdminUserDetailSkeleton";
import StatusUpdateModal from "@/components/ui/StatusUpdateModal";
import { AdminUser, UserStatistics, RecentActivity, UserDetailResponse, RecentProduct } from "@/features/admin/user/user.types";

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

  const { data, isLoading, error } = useGetUserById(userId);
  const updateStatusMutation = useUpdateUserStatus();
  const updateRoleMutation = useUpdateUserRole();

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
          reason: editData.reason 
        } 
      },
      {
        onSuccess: () => {
          // Show success message or toast
          console.log("Role updated successfully");
          // Clear the reason field after successful update
          setEditData(prev => ({ ...prev, reason: "" }));
        },
        onError: (error) => {
          // Show error message or toast
          console.error('Failed to update user role:', error);
        }
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
          console.error('Failed to update user status:', error);
        }
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
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-flyverr-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-flyverr-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-2xl">
                  {user.first_name.charAt(0)}
                  {user.last_name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user.first_name} {user.last_name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  @{user.username} • {user.email}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                  {user.email_verified && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Details Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                    <User className="w-5 h-5 text-flyverr-primary" />
                  </div>
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name
                    </Label>
                    <Input
                      value={user.first_name}
                      disabled
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name
                    </Label>
                    <Input
                      value={user.last_name}
                      disabled
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </Label>
                  <Input
                    value={user.username}
                    disabled
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <Input
                    value={user.email}
                    disabled
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </Label>
                  <Textarea
                    value={user.bio || "No bio provided"}
                    disabled
                    rows={3}
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  />
                </div>
              </CardContent>
            </Card>

                         {/* Role Update Section */}
             <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
               <CardHeader className="pb-4">
                 <CardTitle className="flex items-center gap-2 text-lg">
                   <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                     <Crown className="w-5 h-5 text-flyverr-primary" />
                   </div>
                   Role Management
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                       User Role
                     </Label>
                     <select
                       value={editData.role || user.role}
                       onChange={(e) =>
                         setEditData({ ...editData, role: e.target.value })
                       }
                       className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-flyverr-primary/20 focus:border-flyverr-primary"
                     >
                       <option value="user">User</option>
                       <option value="admin">Admin</option>
                     </select>
                   </div>

                   <div className="space-y-2">
                     <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                       Reason for Role Change <span className="text-red-500">*</span>
                     </Label>
                     <Textarea
                       value={editData.reason}
                       onChange={(e) =>
                         setEditData({ ...editData, reason: e.target.value })
                       }
                       placeholder="Provide a reason for changing the user's role"
                       rows={3}
                       maxLength={500}
                       className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-flyverr-primary/20 focus:border-flyverr-primary"
                       required
                     />
                     <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                       {editData.reason.length}/500
                     </div>
                   </div>

                   {/* Update Role Button */}
                   <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
                     <Button
                       onClick={handleUpdate}
                       disabled={updateRoleMutation.isPending || !editData.reason.trim()}
                       className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
                     >
                       <Save className="w-4 h-4 mr-2" />
                       {updateRoleMutation.isPending ? 'Updating...' : 'Update Role'}
                     </Button>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* Status Update Section */}
             <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
               <CardHeader className="pb-4">
                 <CardTitle className="flex items-center gap-2 text-lg">
                   <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                     <Shield className="w-5 h-5 text-flyverr-primary" />
                   </div>
                   Status Management
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                       Current Status
                     </Label>
                     <div className="flex items-center gap-3">
                       {getStatusBadge(user.status)}
                       <Button
                         type="button"
                         variant="outline"
                         size="sm"
                         onClick={() => setIsStatusModalOpen(true)}
                         className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10"
                       >
                         <Shield className="w-4 h-4 mr-2" />
                         Update Status
                       </Button>
                     </div>
                   </div>
                   
                   <div className="text-sm text-gray-600 dark:text-gray-400">
                     Click the button above to change user status with detailed options including reason, admin notes, and suspension duration.
                   </div>
                 </div>
               </CardContent>
             </Card>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Statistics */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-flyverr-primary" />
                  </div>
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Products
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {statistics.totalProducts}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Licenses
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {statistics.totalLicenses}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Purchases
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {statistics.totalPurchases}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Sales
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {statistics.totalSales}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Spent
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${statistics.totalSpent}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Earned
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${statistics.totalEarned}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                    <Activity className="w-5 h-5 text-flyverr-primary" />
                  </div>
                  Recent Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.products.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.products.slice(0, 3).map((product: RecentProduct) => (
                      <div
                        key={product.id}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
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
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No products yet
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Timestamps */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                    <Clock className="w-5 h-5 text-flyverr-primary" />
                  </div>
                  Timestamps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Joined
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(user.created_at)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Updated
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
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
     </div>
   );
 }
