"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  User,
  Mail,
  Calendar,
  Shield,
  Crown,
  Ban,
  Edit,
  MoreVertical,
  Search,
  Users,
  Activity,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useGetUsers } from "@/features/admin/user/hooks";
import { useSearchUsers } from "@/features/admin/user/hooks";
import { AdminUser, UsersListResponse } from "@/features/admin/user/user.types";
import Link from "next/link";
import PaginationControls from "@/components/ui/PaginationControls";

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(20);

  // Search filters
  const [emailQuery, setEmailQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // Debounce email input to reduce requests
  const [debouncedEmail, setDebouncedEmail] = useState("");

  useEffect(() => {
    // Only trigger debounce if email query has content
    if (!emailQuery) {
      setDebouncedEmail("");
      return;
    }

    const id = setTimeout(() => {
      // Trim and validate email before setting
      const trimmedEmail = emailQuery.trim();
      setDebouncedEmail(trimmedEmail);
    }, 500); // Increased debounce time for better performance

    return () => clearTimeout(id);
  }, [emailQuery]);

  const isValidEmail = (value: string) => {
    if (!value) return false;
    // RFC5322 compliant email regex
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
  };

  const validEmail = useMemo(
    () => (isValidEmail(debouncedEmail) ? debouncedEmail : undefined),
    [debouncedEmail]
  );

  const isSearching = useMemo(() => {
    // Only search by email if it's a valid email, otherwise rely on status/role
    return (
      Boolean(validEmail) || statusFilter !== "all" || roleFilter !== "all"
    );
  }, [validEmail, statusFilter, roleFilter]);

  const { data, isLoading, error, isFetching } = useGetUsers(
    currentPage,
    currentLimit
  );
  const { data: searchData, isFetching: isSearchingFetching } = useSearchUsers({
    email: validEmail ? validEmail : "", // Always pass a string
    status: statusFilter !== "all" ? statusFilter : undefined,
    role: roleFilter !== "all" ? roleFilter : undefined,
    page: currentPage,
    limit: currentLimit,
  });

  const effectiveData = (isSearching ? searchData : data) as
    | UsersListResponse
    | undefined;
  const users: AdminUser[] = effectiveData?.data?.users || [];
  const pagination = effectiveData?.data?.pagination;

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
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
            Suspended
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
            Pending
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
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [validEmail, statusFilter, roleFilter]);

  if (isLoading && !isSearching) {
    // Only show full-page loader for initial load
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              User Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage platform users and their permissions
            </p>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* // add the search bar   */}

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse">
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

        {/* Pagination Controls - Always Visible (Even During Loading) */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Show:
            </span>
            <select
              value={currentLimit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              of {pagination?.total || 0} users
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400 px-3">
              Page {currentPage} of {pagination?.totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage >= (pagination?.totalPages || 1) || isLoading
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination?.totalPages || 1)}
              disabled={
                currentPage >= (pagination?.totalPages || 1) || isLoading
              }
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bottom Info Skeleton */}
        <div className="text-center">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              User Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage platform users and their permissions
            </p>
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <div className="flex items-center">
            <UserX className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <span className="text-red-800 dark:text-red-200">
              Error loading users. Please try again later.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
            User Management
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Manage platform users and their permissions
          </p>
        </div>
        {/* <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white">
          <User className="w-4 h-4 mr-2" />
          Add User
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {pagination?.total || 0}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Users
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {users.filter((u: AdminUser) => u.status === "active").length}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg">
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Admins
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {users.filter((u: AdminUser) => u.role === "admin").length}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Creators
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {
                  users.filter((u: AdminUser) => (u.stats?.products ?? 0) > 0)
                    .length
                }
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-orange-500/10 rounded-lg">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users by email..."
              value={emailQuery}
              onChange={(e) => setEmailQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-flyverr-primary dark:focus:border-flyverr-secondary text-sm sm:text-base py-2 sm:py-2.5"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Role:
            </span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="overflow-x-auto">
        <AdminTable>
          <AdminTableHeader>
            <tr>
              <AdminTableHeaderCell className="min-w-[200px] sm:min-w-[250px] lg:min-w-[300px]">
                User
              </AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[120px] sm:min-w-[150px] lg:min-w-[180px]">
                Role & Status
              </AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[120px] sm:min-w-[150px] lg:min-w-[180px]">
                Activity
              </AdminTableHeaderCell>
              <AdminTableHeaderCell className="min-w-[120px] sm:min-w-[150px] lg:min-w-[180px]">
                Performance
              </AdminTableHeaderCell>
              <AdminTableHeaderCell
                align="center"
                className="min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]"
              >
                Actions
              </AdminTableHeaderCell>
            </tr>
          </AdminTableHeader>
          <AdminTableBody>
            {(isSearching && isSearchingFetching) ||
            (emailQuery && emailQuery !== debouncedEmail) ? ( // Show loader while typing
              Array.from({ length: 5 }).map((_, i) => (
                <AdminTableRow key={i}>
                  <AdminTableCell colSpan={5} align="center">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full mx-auto" />
                  </AdminTableCell>
                </AdminTableRow>
              ))
            ) : users.length === 0 && validEmail && !isSearchingFetching ? (
              <AdminTableRow>
                <AdminTableCell colSpan={5} align="center">
                  <span className="text-red-500 text-sm">
                    This email does not exist.
                  </span>
                </AdminTableCell>
              </AdminTableRow>
            ) : (
              users.map((user: AdminUser) => (
                <AdminTableRow key={user.id} hoverable={true}>
                  <AdminTableCell>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-flyverr-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs sm:text-sm">
                          {user.first_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">{user.email}</span>
                          <span className="sm:hidden">
                            {user.email.length > 20
                              ? user.email.substring(0, 20) + "..."
                              : user.email}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          @{user.username}
                        </div>
                      </div>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell>
                    <div className="space-y-1 sm:space-y-2">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                      {user.email_verified && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </AdminTableCell>
                  <AdminTableCell>
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm text-gray-900 dark:text-white flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">
                          Joined {formatDate(user.created_at)}
                        </span>
                        <span className="sm:hidden">
                          Joined {formatDate(user.created_at)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="hidden sm:inline">
                          Updated {formatDate(user.updated_at)}
                        </span>
                        <span className="sm:hidden">
                          Updated {formatDate(user.updated_at)}
                        </span>
                      </div>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell>
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm text-gray-900 dark:text-white">
                        {user.stats?.products ?? 0} products
                      </div>
                      <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                        {user.stats?.licenses ?? 0} licenses
                      </div>
                      <div className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                        {user.stats?.transactions ?? 0} transactions
                      </div>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell align="center">
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                      <Link href={`/admin/users/${user.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 sm:p-2"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </Link>
                    </div>
                  </AdminTableCell>
                </AdminTableRow>
              ))
            )}
          </AdminTableBody>
        </AdminTable>
      </div>

      {/* Pagination Controls - Always Visible */}
      {pagination && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          totalCount={pagination.total}
          pageSize={currentLimit}
          onPageChange={handlePageChange}
          onPageSizeChange={handleLimitChange}
          disabled={isFetching || isSearchingFetching}
          entityLabel="records"
          className="mt-4 sm:mt-6"
        />
      )}
    </div>
  );
}
