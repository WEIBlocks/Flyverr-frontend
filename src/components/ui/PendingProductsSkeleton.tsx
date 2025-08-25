import React from 'react'
import { Package, Clock, Filter, Calendar, TrendingUp, Loader2 } from 'lucide-react'

// Compilation/Processing Spinner Component
const CompilationSpinner = () => (
  <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
    <div className="flex items-center justify-center space-x-4">
      <div className="relative">
        {/* Main spinning ring */}
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-700 rounded-full animate-pulse"></div>
        {/* Spinning border */}
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-ping"></div>
      </div>
      <div className="text-center">
        <div className="text-lg font-semibold text-blue-900 dark:text-blue-100">
          Compiling & Processing...
        </div>
        <div className="text-sm text-blue-700 dark:text-blue-300">
          Please wait while we prepare your data
        </div>
      </div>
    </div>
  </div>
)

export default function PendingProductsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Compilation Spinner */}
      <CompilationSpinner />
      
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="space-y-2">
          <div className="w-48 h-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-80 h-5 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse flex-shrink-0"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Table Header Skeleton */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {['Product', 'Price & Status', 'Submission', 'Licenses', 'Actions'].map((header, i) => (
              <div key={i} className="w-24 h-5 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Table Body Skeleton */}
        <div className="divide-y divide-gray-200 dark:divide-gray-600">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="px-4 sm:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
                {/* Product Cell */}
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse flex-shrink-0"></div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="w-32 h-4 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                    <div className="w-24 h-3 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                  </div>
                </div>

                {/* Price & Status Cell */}
                <div className="space-y-2">
                  <div className="w-16 h-6 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                  <div className="w-20 h-5 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
                  <div className="w-16 h-5 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
                </div>

                {/* Submission Cell */}
                <div className="space-y-1">
                  <div className="w-20 h-4 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                  <div className="w-24 h-3 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                </div>

                {/* Licenses Cell */}
                <div className="space-y-1">
                  <div className="w-16 h-4 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                  <div className="w-20 h-3 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                </div>

                {/* Actions Cell */}
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        <div className="flex space-x-2">
          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
