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
import { Package, User, Clock, CheckCircle, XCircle, Eye, AlertCircle, TrendingUp, FileText, Calendar, Zap, Filter } from "lucide-react"

export default function PendingProductsPage() {
  const pendingProducts = [
    { 
      id: "p_101", 
      title: "Complete Web Development Masterclass", 
      creator: "CodeMaster Pro", 
      submittedAt: "2025-08-01", 
      status: "pending",
      category: "Courses",
      price: 299.99,
      description: "Learn full-stack web development from scratch. Includes React, Node.js, and database design.",
      estimatedReviewTime: "24-48 hours"
    },
    { 
      id: "p_102", 
      title: "Premium UI/UX Design System", 
      creator: "DesignStudio", 
      submittedAt: "2025-08-02", 
      status: "pending",
      category: "Templates",
      price: 149.99,
      description: "Complete design system with 200+ components, icons, and templates for modern applications.",
      estimatedReviewTime: "24-48 hours"
    },
    { 
      id: "p_103", 
      title: "Digital Marketing Strategy Guide", 
      creator: "MarketingGuru", 
      submittedAt: "2025-08-03", 
      status: "pending",
      category: "eBooks",
      price: 199.99,
      description: "Comprehensive digital marketing playbook with proven strategies and case studies.",
      estimatedReviewTime: "24-48 hours"
    },
    { 
      id: "p_104", 
      title: "Advanced JavaScript Patterns", 
      creator: "CodeMaster Pro", 
      submittedAt: "2025-08-04", 
      status: "pending",
      category: "Courses",
      price: 89.99,
      description: "Master advanced JavaScript patterns and techniques for professional development.",
      estimatedReviewTime: "24-48 hours"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">Pending Review</Badge>
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">Approved</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">Rejected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">{status}</Badge>
    }
  }

  const handleProductClick = (productId: string) => {
    console.log("Product clicked:", productId)
    // Navigate to product detail page or open modal
  }

  const handleApprove = (productId: string) => {
    console.log("Approve product:", productId)
    // Handle approval logic
  }

  const handleReject = (productId: string) => {
    console.log("Reject product:", productId)
    // Handle rejection logic
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Pending Products</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Review and approve new product submissions</p>
        </div>
        <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white">
          <TrendingUp className="w-4 h-4 mr-2" />
          Review Queue
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingProducts.length}</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Submissions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingProducts.filter(p => p.submittedAt === "2025-08-04").length}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Review Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24-48h</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{new Set(pendingProducts.map(p => p.category)).size}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Filter className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <AdminTable>
        <AdminTableHeader>
          <tr>
            <AdminTableHeaderCell>Product Details</AdminTableHeaderCell>
            <AdminTableHeaderCell>Creator & Category</AdminTableHeaderCell>
            <AdminTableHeaderCell>Submission Info</AdminTableHeaderCell>
            <AdminTableHeaderCell>Review Status</AdminTableHeaderCell>
            <AdminTableHeaderCell align="center">Actions</AdminTableHeaderCell>
          </tr>
        </AdminTableHeader>
        <AdminTableBody>
          {pendingProducts.map((product) => (
            <AdminTableRow 
              key={product.id} 
              onClick={() => handleProductClick(product.id)}
              hoverable={true}
            >
              <AdminTableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white line-clamp-2 max-w-xs">{product.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 max-w-xs">{product.description}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">{product.id}</div>
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">{product.creator}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{product.category}</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">${product.price}</div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-1">
                  <div className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {product.submittedAt}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Est. review: {product.estimatedReviewTime}
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-2">
                  {getStatusBadge(product.status)}
                  <div className="flex items-center text-xs text-yellow-600 dark:text-yellow-400">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Awaiting Review
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell align="center">
                <div className="flex items-center justify-center space-x-2">
                  <Button size="sm" variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleApprove(product.id)
                    }}
                  >
                    <CheckCircle className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReject(product.id)
                    }}
                  >
                    <XCircle className="w-3 h-3" />
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


