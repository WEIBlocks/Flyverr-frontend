"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  AdminTable, 
  AdminTableHeader, 
  AdminTableBody, 
  AdminTableRow, 
  AdminTableCell, 
  AdminTableHeaderCell 
} from "@/components/ui/admin-table"
import { User, Mail, Calendar, Shield, Crown, Ban, Edit, MoreVertical, Users, Activity, UserCheck, UserX, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useGetUsers } from "@/features/admin/user/hooks"
import { AdminUser } from "@/features/admin/user/user.types"
import Link from "next/link"

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(20)

  const { data, isLoading, error } = useGetUsers(currentPage, currentLimit)
  
  const users = data?.data?.users || []
  const pagination = data?.data?.pagination

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">Admin</Badge>
      case 'user':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">User</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">Active</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">Suspended</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleLimitChange = (limit: number) => {
    setCurrentLimit(limit)
    setCurrentPage(1) // Reset to first page when changing limit
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage platform users and their permissions</p>
          </div>
        </div>
        
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse">
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

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse">
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Controls - Always Visible (Even During Loading) */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
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
              disabled={currentPage >= (pagination?.totalPages || 1) || isLoading}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination?.totalPages || 1)}
              disabled={currentPage >= (pagination?.totalPages || 1) || isLoading}
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
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage platform users and their permissions</p>
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <div className="flex items-center">
            <UserX className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <span className="text-red-800 dark:text-red-200">Error loading users. Please try again later.</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage platform users and their permissions</p>
        </div>
        <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white">
          <User className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pagination?.total || 0}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.filter(u => u.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.filter(u => u.role === 'admin').length}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Creators</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.filter(u => u.stats.products > 0).length}</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <AdminTable>
        <AdminTableHeader>
          <tr>
            <AdminTableHeaderCell>User</AdminTableHeaderCell>
            <AdminTableHeaderCell>Role & Status</AdminTableHeaderCell>
            <AdminTableHeaderCell>Activity</AdminTableHeaderCell>
            <AdminTableHeaderCell>Performance</AdminTableHeaderCell>
            <AdminTableHeaderCell align="center">Actions</AdminTableHeaderCell>
                </tr>
        </AdminTableHeader>
        <AdminTableBody>
          {users.map((user) => (
            <AdminTableRow 
              key={user.id} 
              hoverable={true}
            >
              <AdminTableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-flyverr-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.first_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {user.email}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      @{user.username}
                    </div>
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-2">
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
                  <div className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Joined {formatDate(user.created_at)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Updated {formatDate(user.updated_at)}
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-1">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {user.stats.products} products
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    {user.stats.licenses} licenses
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    {user.stats.transactions} transactions
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell align="center">
                <div className="flex items-center justify-center space-x-2">
                  <Link href={`/admin/users/${user.id}`}>
                    <Button size="sm" variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </Link>
                  {/* <Button size="sm" variant="outline" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                    <UserCheck className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-red-50 dark:hover:bg-red-900/20">
                    <UserX className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <MoreVertical className="w-3 h-3" />
                  </Button> */}
                </div>
              </AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTableBody>
      </AdminTable>

      {/* Pagination Controls - Always Visible */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
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
            disabled={currentPage >= (pagination?.totalPages || 1) || isLoading}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination?.totalPages || 1)}
            disabled={currentPage >= (pagination?.totalPages || 1) || isLoading}
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Pagination Info */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Showing {((currentPage - 1) * currentLimit) + 1} to {Math.min(currentPage * currentLimit, pagination?.total || 0)} of {pagination?.total || 0} users
      </div>
    </div>
  )
}


