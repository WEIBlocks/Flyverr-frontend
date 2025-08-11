"use client"

import React from "react"
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
import { User, Mail, Calendar, Shield, Crown, Ban, Edit, MoreVertical, Users, Activity, UserCheck, UserX } from "lucide-react"

export default function AdminUsersPage() {
  const users = [
    { 
      id: "u_001", 
      email: "alice@example.com", 
      name: "Alice Doe", 
      role: "creator", 
      status: "active",
      joined: "2025-07-01",
      lastActive: "2 hours ago",
      products: 12,
      revenue: 2847.50
    },
    { 
      id: "u_002", 
      email: "bob@example.com", 
      name: "Bob Smith", 
      role: "buyer", 
      status: "active",
      joined: "2025-06-15",
      lastActive: "1 day ago",
      products: 0,
      revenue: 0
    },
    { 
      id: "u_003", 
      email: "carol@example.com", 
      name: "Carol Johnson", 
      role: "creator", 
      status: "suspended",
      joined: "2025-05-20",
      lastActive: "1 week ago",
      products: 8,
      revenue: 1560.00
    },
    { 
      id: "u_004", 
      email: "dave@example.com", 
      name: "Dave Wilson", 
      role: "buyer", 
      status: "active",
      joined: "2025-06-01",
      lastActive: "3 hours ago",
      products: 0,
      revenue: 0
    }
  ]

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'creator':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">Creator</Badge>
      case 'buyer':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">Buyer</Badge>
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">Admin</Badge>
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

  const handleUserClick = (userId: string) => {
    console.log("User clicked:", userId)
    // Navigate to user detail page or open modal
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Creators</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.filter(u => u.role === 'creator').length}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Suspended</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.filter(u => u.status === 'suspended').length}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <UserX className="w-6 h-6 text-red-600 dark:text-red-400" />
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
              onClick={() => handleUserClick(user.id)}
              hoverable={true}
            >
              <AdminTableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-flyverr-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {user.email}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                      {user.id}
                    </div>
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-2">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-1">
                  <div className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Joined {user.joined}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Last active: {user.lastActive}
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-1">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {user.products} products
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                    ${user.revenue.toLocaleString()}
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell align="center">
                <div className="flex items-center justify-center space-x-2">
                  <Button size="sm" variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                    <UserCheck className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-red-50 dark:hover:bg-red-900/20">
                    <UserX className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </div>
              </AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTableBody>
      </AdminTable>
    </div>
  )
}


