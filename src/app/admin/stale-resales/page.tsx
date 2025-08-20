"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGetExpiredInsurance } from "@/features/admin/insurance-track/hooks/useGetExpiredInsurance"
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  User, 
  Package, 
  RefreshCw,
  TrendingUp,
  Shield
} from "lucide-react"

export default function StaleResalesPage() {
  const { data: insuranceData, isLoading, error, refetch } = useGetExpiredInsurance()
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)

  const handleTriggerInsuranceResale = (recordId: string) => {
    console.log("Triggering insurance resale for:", recordId)
    // TODO: Implement insurance resale logic
  }

  const handleNotifyOwner = (recordId: string) => {
    console.log("Notifying owner for:", recordId)
    // TODO: Implement notification logic
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Insurance Records - Expired & Overdue</h2>
          <Button disabled>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Loading...
          </Button>
        </div>
        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Loading insurance records...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Insurance Records - Expired & Overdue</h2>
          <Button onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-4" />
                <p className="text-red-500">Failed to load insurance records</p>
                <p className="text-gray-500 text-sm mt-2">Please try again later</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const records = insuranceData?.data?.records || []
  const summary = insuranceData?.data?.summary

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Insurance Records - Expired & Overdue</h2>
        <Button onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Records</p>
                  <p className="text-2xl font-bold text-blue-600">{summary.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expired</p>
                  <p className="text-2xl font-bold text-red-600">{summary.expired}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Overdue</p>
                  <p className="text-2xl font-bold text-orange-600">{summary.overdue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Fees</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalInsuranceFees)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Records Table */}
      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-amber-500" />
            <span>Insurance Records</span>
            {summary && (
              <Badge variant="outline" className="ml-2">
                {summary.overdue} overdue
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {records.length === 0 ? (
            <div className="p-6 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No insurance records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Insurance Fee</th>
                    <th className="px-4 py-3">Deadline</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Days Overdue</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr 
                      key={record.id} 
                      className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {record.product.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {record.product.currentStage} • Round {record.product.currentRound}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {record.user.firstName} {record.user.lastName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {record.user.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-green-600">
                          {formatCurrency(record.insuranceFee)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-gray-900 dark:text-white">
                            {formatDate(record.insuranceDeadline)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(record.purchaseDate)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={record.isOverdue ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {record.insuranceStatus}
                          </Badge>
                          {record.isOverdue && (
                            <Badge variant="destructive" className="text-xs">
                              {record.daysOverdue}d overdue
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          {record.isOverdue ? (
                            <>
                              <Clock className="h-4 w-4 text-red-500" />
                              <span className="text-red-600 font-medium">
                                {record.daysOverdue} days
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleTriggerInsuranceResale(record.id)}
                            disabled={record.isResold}
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {record.isResold ? 'Already Resold' : 'Trigger Resale'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleNotifyOwner(record.id)}
                          >
                            <User className="h-3 w-3 mr-1" />
                            Notify Owner
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


