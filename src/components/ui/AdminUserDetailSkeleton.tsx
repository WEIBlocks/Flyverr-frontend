import React from 'react'

export default function AdminUserDetailSkeleton() {
  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Back Button Skeleton */}
        <div className="mb-4 sm:mb-6">
          <div className="w-24 sm:w-32 h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>

        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="space-y-2 sm:space-y-3 flex-1">
              <div className="w-32 sm:w-48 h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="w-40 sm:w-64 h-4 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="w-24 sm:w-32 h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - User Details Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Basic Information Skeleton */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-28 sm:w-32 h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="w-full h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  {[3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-full h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Role & Status Skeleton */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-28 sm:w-32 h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-full h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-32 sm:w-40 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-full h-16 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="flex justify-end pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="w-24 sm:w-32 h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Management Skeleton */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-28 sm:w-32 h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <div className="w-24 sm:w-28 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="w-20 sm:w-24 h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                      <div className="w-28 sm:w-32 h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-48 sm:w-64 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Statistics Skeleton */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-20 sm:w-24 h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="space-y-2 sm:space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="w-16 sm:w-20 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-12 sm:w-16 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Skeleton */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-28 sm:w-32 h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="space-y-2 sm:space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
                      <div className="w-32 sm:w-40 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 sm:w-20 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                        <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timestamps Skeleton */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-20 sm:w-24 h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="space-y-2 sm:space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="w-12 sm:w-16 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
