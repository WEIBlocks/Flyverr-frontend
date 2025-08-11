"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Package, 
  Key, 
  DollarSign, 
  Users, 
  Eye, 
  ArrowRight,
  BarChart3,
  ShoppingCart,
  Star,
  Activity,
  Calendar,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Upload
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import DashboardLayout from '@/components/DashboardLayout'

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Products",
      value: "8",
      change: "+2",
      changeType: "positive", 
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Total Licenses",
      value: "156",
      change: "+23",
      changeType: "positive",
      icon: Key,
      color: "text-purple-600"
    },
    {
      title: "Total Views",
      value: "2,847",
      change: "+8.2%",
      changeType: "positive",
      icon: Eye,
      color: "text-orange-600"
    }
  ]

  const resaleListings = [
    {
      id: "RS001",
      productName: "Complete Web Development Masterclass",
      originalPrice: "$299",
      resalePrice: "$199",
      status: "Active",
      views: 45,
      sales: 12,
      listedDate: "2024-01-15",
      lastActivity: "2 hours ago"
    },
    {
      id: "RS002", 
      productName: "Premium UI/UX Design System",
      originalPrice: "$149",
      resalePrice: "$99",
      status: "Active",
      views: 32,
      sales: 8,
      listedDate: "2024-01-10",
      lastActivity: "1 day ago"
    },
    {
      id: "RS003",
      productName: "Digital Marketing Strategy Guide",
      originalPrice: "$199",
      resalePrice: "$149",
      status: "Pending",
      views: 18,
      sales: 0,
      listedDate: "2024-01-20",
      lastActivity: "3 days ago"
    },
    {
      id: "RS004",
      productName: "Advanced JavaScript Patterns",
      originalPrice: "$89",
      resalePrice: "$69",
      status: "Sold",
      views: 67,
      sales: 15,
      listedDate: "2024-01-05",
      lastActivity: "1 week ago"
    }
  ]

  const transactions = [
    {
      id: "TXN001",
      type: "Sale",
      product: "Complete Web Development Masterclass",
      amount: "$299",
      status: "Completed",
      date: "2024-01-25",
      time: "14:30",
      buyer: "john.doe@email.com"
    },
    {
      id: "TXN002",
      type: "Resale",
      product: "Premium UI/UX Design System",
      amount: "$99",
      status: "Completed",
      date: "2024-01-24",
      time: "09:15",
      buyer: "sarah.smith@email.com"
    },
    {
      id: "TXN003",
      type: "Withdrawal",
      product: "Bank Transfer",
      amount: "-$500",
      status: "Processing",
      date: "2024-01-23",
      time: "16:45",
      buyer: "Your Bank Account"
    },
    {
      id: "TXN004",
      type: "Royalty",
      product: "Resale Commission",
      amount: "$15",
      status: "Completed",
      date: "2024-01-22",
      time: "11:20",
      buyer: "Platform Commission"
    },
    {
      id: "TXN005",
      type: "Sale",
      product: "Digital Marketing Strategy Guide",
      amount: "$199",
      status: "Completed",
      date: "2024-01-21",
      time: "13:10",
      buyer: "mike.wilson@email.com"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Sold':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Sale':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />
      case 'Resale':
        return <Tag className="w-4 h-4 text-blue-600" />
      case 'Withdrawal':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />
      case 'Royalty':
        return <DollarSign className="w-4 h-4 text-purple-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  return (

        <div >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back, {user?.profile?.first_name}! Here's what's happening with your digital products.
            </p>
          </div>

          {/* Section 1: Stats */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Statistics Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                          <p className={`text-sm font-medium ${
                            stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Section 2: Resale Listings */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Resale Listings
              </h2>
              <Button variant="outline" className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>View All</span>
              </Button>
            </div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Original Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Resale Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Sales
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Listed Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Last Activity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {resaleListings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {listing.productName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {listing.id}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {listing.originalPrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {listing.resalePrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {listing.views}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {listing.sales}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {listing.listedDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {listing.lastActivity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 3: Transaction History */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Transaction History
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Withdraw</span>
                </Button>
              </div>
            </div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Product/Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Buyer/Recipient
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(transaction.type)}
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {transaction.type}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {transaction.product}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {transaction.id}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${
                              transaction.amount.startsWith('-') 
                                ? 'text-red-600' 
                                : 'text-green-600'
                            }`}>
                              {transaction.amount}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm text-gray-900 dark:text-white">
                                {transaction.date}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {transaction.time}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {transaction.buyer}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  
  )
} 