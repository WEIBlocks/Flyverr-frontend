import React from "react"

export default function AdminProductsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
  

    

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-xl">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg overflow-hidden">
        {/* Table Header Skeleton */}
        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-5 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Table Body Skeleton */}
        <div className="divide-y divide-gray-200 dark:divide-gray-600">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="grid grid-cols-5 gap-4">
                {/* Product Cell */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Creator & Stage Cell */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Price & Status Cell */}
                <div className="space-y-2">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                {/* Submission Cell */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                {/* Actions Cell */}
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3].map((btn) => (
                    <div key={btn} className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded border animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
