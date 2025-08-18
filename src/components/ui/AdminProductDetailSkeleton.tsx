import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function AdminProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>

        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              <div className="w-64 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Details Form Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Skeleton */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title Skeleton */}
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                {/* Thumbnail Skeleton */}
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                {/* Price and Licenses Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="w-28 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-28 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                </div>

                {/* Featured Status Skeleton */}
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-40 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Round Pricing Skeleton */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                      <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Admin Notes Skeleton */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="w-28 h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Info & Stats Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            {/* Product Status Skeleton */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                      <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Creator Information Skeleton */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-40 h-3 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            {/* File Information Skeleton */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="w-28 h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Statistics Skeleton */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Timestamps Skeleton */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Update Button Section Skeleton */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-40 h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            </div>
            <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
