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
import { Package, User, DollarSign, TrendingUp, Eye, Edit, MoreVertical, Star, ShoppingCart } from "lucide-react"

export default function AdminAllProductsPage() {
  const products = [
    { 
      id: "p_401", 
      title: "Complete Web Development Masterclass", 
      creator: "CodeMaster Pro", 
      stage: "newboom", 
      price: 299.99,
      status: "active",
      sales: 45,
      revenue: 13497.55,
      rating: 4.8,
      reviews: 127,
      category: "Courses",
      createdAt: "2024-01-15"
    },
    { 
      id: "p_402", 
      title: "Premium UI/UX Design System", 
      creator: "DesignStudio", 
      stage: "blossom", 
      price: 149.99,
      status: "active",
      sales: 32,
      revenue: 4799.68,
      rating: 4.9,
      reviews: 89,
      category: "Templates",
      createdAt: "2024-01-10"
    },
    { 
      id: "p_403", 
      title: "Digital Marketing Strategy Guide", 
      creator: "MarketingGuru", 
      stage: "evergreen", 
      price: 199.99,
      status: "active",
      sales: 78,
      revenue: 15599.22,
      rating: 4.7,
      reviews: 156,
      category: "eBooks",
      createdAt: "2024-01-05"
    },
    { 
      id: "p_404", 
      title: "Advanced JavaScript Patterns", 
      creator: "CodeMaster Pro", 
      stage: "exit", 
      price: 89.99,
      status: "paused",
      sales: 23,
      revenue: 2069.77,
      rating: 4.6,
      reviews: 67,
      category: "Courses",
      createdAt: "2024-01-01"
    }
  ]

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'newboom':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">New Boom</Badge>
      case 'blossom':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">Blossom</Badge>
      case 'evergreen':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">Evergreen</Badge>
      case 'exit':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800">Exit</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">{stage}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">Active</Badge>
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">Paused</Badge>
      case 'disabled':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">Disabled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">{status}</Badge>
    }
  }

  const handleProductClick = (productId: string) => {
    console.log("Product clicked:", productId)
    // Navigate to product detail page or open modal
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">All Products</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and monitor all platform products</p>
        </div>
        <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white">
          <Package className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.filter(p => p.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.reduce((sum, p) => sum + p.sales, 0)}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${products.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <AdminTable>
        <AdminTableHeader>
          <tr>
            <AdminTableHeaderCell>Product</AdminTableHeaderCell>
            <AdminTableHeaderCell>Creator & Stage</AdminTableHeaderCell>
            <AdminTableHeaderCell>Performance</AdminTableHeaderCell>
            <AdminTableHeaderCell>Metrics</AdminTableHeaderCell>
            <AdminTableHeaderCell align="center">Actions</AdminTableHeaderCell>
          </tr>
        </AdminTableHeader>
        <AdminTableBody>
          {products.map((product) => (
            <AdminTableRow 
              key={product.id} 
              onClick={() => handleProductClick(product.id)}
              hoverable={true}
            >
              <AdminTableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-flyverr-primary to-flyverr-secondary rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white line-clamp-2 max-w-xs">{product.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{product.category}</div>
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
                  <div className="space-y-1">
                    {getStageBadge(product.stage)}
                    {getStatusBadge(product.status)}
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">${product.price}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {product.sales} sales
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                    ${product.revenue.toLocaleString()}
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{product.rating}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Created: {product.createdAt}
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell align="center">
                <div className="flex items-center justify-center space-x-2">
                  <Button size="sm" variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
                    <TrendingUp className="w-3 h-3" />
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


