import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2">
            {/* Image Gallery Skeleton */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-8">
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse">
                
               
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8">
              {/* Title and Actions */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-2 w-3/4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-1/2"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mr-1"></div>
                    ))}
                  </div>
                  <div className="w-24 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>

              {/* Special Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>

              {/* Resale Stage Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="w-28 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
                <div className="flex justify-between items-center">
                  <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex space-x-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px] space-y-6">
                <div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3 w-48"></div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3 w-32"></div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 animate-pulse"></div>
                          <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3 w-28"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                          <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Options */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardContent className="p-6">
                  {/* Price */}
                  <div className="w-24 h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>

                  {/* License Info */}
                  <div className="bg-flyverr-primary/10 dark:bg-flyverr-primary/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-28 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  </div>

                  {/* Purchase Buttons */}
                  <div className="space-y-4 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-full h-14 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    ))}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between">
                        <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>

                  {/* Guarantee */}
                  <div className="p-4 bg-flyverr-secondary/10 dark:bg-flyverr-secondary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-48 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
