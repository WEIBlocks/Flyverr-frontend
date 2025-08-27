import React from "react"

export default function AdminProductsSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 sm:gap-0">
        <div className="space-y-2">
          <div className="w-36 sm:w-48 h-7 sm:h-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-64 sm:w-80 h-4 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-20 sm:w-24 h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-28 sm:w-32 h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="h-3 sm:h-4 w-2/3 sm:w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-1.5 sm:mb-2 animate-pulse"></div>
                <div className="h-6 sm:h-8 w-1/3 sm:w-2/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="p-2 sm:p-3 bg-gray-200 dark:bg-gray-700 rounded-xl flex-shrink-0 ml-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg overflow-hidden">
        {/* Table Header Skeleton */}
        <div className="bg-gray-50 dark:bg-gray-700/50 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 sm:h-5 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Table Body Skeleton */}
        <div className="divide-y divide-gray-200 dark:divide-gray-600">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                {/* Product Cell */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="h-3 sm:h-4 w-28 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-2.5 sm:h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Creator & Stage Cell */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-3 sm:h-4 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 sm:h-5 w-18 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-2.5 sm:h-3 w-14 sm:w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Price & Status Cell */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="h-5 sm:h-6 w-14 sm:w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 sm:h-5 w-18 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-2.5 sm:h-3 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                {/* Submission Cell */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-3 sm:h-4 w-18 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="h-2.5 sm:h-3 w-24 sm:w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                {/* Actions Cell */}
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3].map((btn) => (
                    <div key={btn} className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded border animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 sm:gap-0">
        <div className="h-3 sm:h-4 w-40 sm:w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto sm:mx-0"></div>
        <div className="flex items-center justify-center sm:justify-end space-x-2">
          <div className="h-7 sm:h-8 w-18 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-7 sm:h-8 w-18 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
