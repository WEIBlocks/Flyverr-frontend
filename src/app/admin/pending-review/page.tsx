"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, User, MessageSquare } from "lucide-react";
import {
  useGetPendingReview,
  useApproveReview,
} from "@/features/admin/reviews/hooks";

import { ReviewActionData } from "@/features/admin/reviews/reviews.types";
import { formatDistanceToNow } from "date-fns";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { swal } from "@/lib/utils";
import ReviewActionModal from "@/features/admin/reviews/components/ReviewActionModal";

export default function AdminReviewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    review: any;
    action: "approve" | "reject";
  }>({
    isOpen: false,
    review: null,
    action: "approve",
  });

  const { data, isLoading, error } = useGetPendingReview({
    page: currentPage,
    limit: 20,
  });
  const { mutate: approveReview, isPending: isApproving } = useApproveReview();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (review: any, action: "approve" | "reject") => {
    setModalState({
      isOpen: true,
      review,
      action,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      review: null,
      action: "approve",
    });
  };

  const handleReviewAction = (data: ReviewActionData) => {
    const { review, action } = modalState;

    approveReview(
      {
        reviewId: review.id,
        data,
      },
      {
        onSuccess: () => {
          swal(
            "Success",
            `Review ${
              action === "approve" ? "approved" : "rejected"
            } successfully!`,
            "success"
          );
          closeModal();
        },
        onError: () => {
          swal(
            "Error",
            `Failed to ${action} review. Please try again.`,
            "error"
          );
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {/* Enhanced Header Skeleton - Responsive */}
        <div className="bg-gradient-to-r from-flyverr-primary/5 to-flyverr-secondary/5 dark:from-flyverr-primary/10 dark:to-flyverr-secondary/10 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 border border-flyverr-primary/10 dark:border-flyverr-primary/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-flyverr-primary/10 dark:bg-flyverr-primary/20 rounded-lg sm:rounded-xl">
                <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
              <div className="space-y-2 flex-1">
                <div className="h-6 sm:h-8 w-32 sm:w-48 md:w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="h-3 sm:h-4 w-40 sm:w-64 md:w-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="h-6 sm:h-8 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse self-start sm:self-center"></div>
          </div>
        </div>

        {/* Enhanced Stats Cards Skeleton - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg sm:rounded-xl">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 sm:h-4 w-20 sm:w-24 md:w-28 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-6 sm:h-8 w-12 sm:w-16 md:w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-green-500/20 dark:bg-green-400/20 rounded-lg sm:rounded-xl">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 sm:h-4 w-24 sm:w-28 md:w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-6 sm:h-8 w-12 sm:w-16 md:w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20 shadow-lg sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-purple-500/20 dark:bg-purple-400/20 rounded-lg sm:rounded-xl">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 sm:h-4 w-24 sm:w-28 md:w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-6 sm:h-8 w-12 sm:w-16 md:w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Table Skeleton - Responsive */}
        <Card className="border-0 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-flyverr-primary/10 dark:bg-flyverr-primary/20 rounded-lg">
                <div className="h-5 w-5 sm:h-6 sm:w-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
              <div className="h-5 sm:h-6 w-24 sm:w-32 md:w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg sm:rounded-xl"
                >
                  {/* Review ID and Image - Mobile Stack, Desktop Row */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 sm:min-w-[200px]">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-xl animate-pulse flex-shrink-0"></div>
                    <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                      <div className="h-3 sm:h-4 w-16 sm:w-20 md:w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="h-2 sm:h-3 w-12 sm:w-16 md:w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                  </div>

                  {/* Product Title - Responsive Width */}
                  <div className="flex-1 min-w-0 sm:min-w-[150px] md:min-w-[200px] space-y-1 sm:space-y-2">
                    <div className="h-3 sm:h-4 w-24 sm:w-32 md:w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-2 sm:h-3 w-16 sm:w-24 md:w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>

                  {/* User Info - Responsive Layout */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 sm:min-w-[140px] md:min-w-[180px]">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0"></div>
                    <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                      <div className="h-3 sm:h-4 w-16 sm:w-20 md:w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="h-2 sm:h-3 w-20 sm:w-24 md:w-28 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                  </div>

                  {/* Rating - Responsive Layout */}
                  <div className="min-w-0 sm:min-w-[80px] md:min-w-[100px] space-y-1 sm:space-y-2">
                    <div className="h-3 sm:h-4 w-6 sm:w-8 md:w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="flex gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <div
                          key={starIndex}
                          className="h-3 w-3 sm:h-4 sm:w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Comment - Responsive Width */}
                  <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[250px] space-y-1 sm:space-y-2">
                    <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-2 sm:h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>

                  {/* Date - Responsive Layout */}
                  <div className="min-w-0 sm:min-w-[100px] md:min-w-[120px] space-y-1 sm:space-y-2">
                    <div className="h-3 sm:h-4 w-16 sm:w-20 md:w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-2 sm:h-3 w-12 sm:w-16 md:w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>

                  {/* Actions - Responsive Layout */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-flyverr-primary" />
          <h2 className="text-2xl font-semibold">Pending Reviews</h2>
        </div>
        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              <p>Failed to load pending reviews. Please try again.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const reviews = data?.data?.reviews || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-flyverr-primary/5 to-flyverr-secondary/5 dark:from-flyverr-primary/10 dark:to-flyverr-secondary/10 rounded-2xl p-6 border border-flyverr-primary/10 dark:border-flyverr-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-flyverr-primary/10 dark:bg-flyverr-primary/20 rounded-xl">
              <Clock className="h-8 w-8 text-flyverr-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Pending Reviews
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage and moderate product reviews from users
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 px-4 py-2 text-base font-semibold"
          >
            {pagination?.total || 0} pending
          </Badge>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-500/20 dark:bg-blue-400/20 rounded-xl">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Total Pending
                </p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                  {pagination?.total || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-500/20 dark:bg-green-400/20 rounded-xl">
                <Star className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
                  Average Rating
                </p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                  {reviews.length > 0
                    ? (
                        reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                        ) / reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-500/20 dark:bg-purple-400/20 rounded-xl">
                <MessageSquare className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                  With Comments
                </p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                  {
                    reviews.filter(
                      (review) => review.comment && review.comment.trim()
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Enhanced Reviews Table */}
      <Card className="border-0 bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-flyverr-primary/10 dark:bg-flyverr-primary/20 rounded-lg">
              <MessageSquare className="h-6 w-6 text-flyverr-primary" />
            </div>
            Pending Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {reviews.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-10 w-10 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No pending reviews
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                All reviews have been processed and moderated
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 text-left text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide">
                      Review
                    </th>
                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide">
                      Product
                    </th>
                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide">
                      User
                    </th>
                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide">
                      Rating
                    </th>
                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide">
                      Comment
                    </th>
                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide">
                      Date
                    </th>
                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-sm">
                            <ImageWithFallback
                              src={review.product.thumbnail_url}
                              alt={review.product.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              #{review.id.slice(0, 8)}
                            </p>
                            <Badge
                              variant={
                                review.is_verified ? "default" : "secondary"
                              }
                              className={`text-xs ${
                                review.is_verified
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200"
                              }`}
                            >
                              {review.is_verified ? "✓ Verified" : "Unverified"}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-[200px]">
                          <p className="font-semibold text-gray-900 dark:text-white truncate">
                            {review.product.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            ID: {review.product.id.slice(0, 8)}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-sm">
                            {review.user.avatar_url ? (
                              <ImageWithFallback
                                src={review.user.avatar_url}
                                alt={review.user.username}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="h-5 w-5 mx-auto mt-2.5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {review.user.username}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                              {review.user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 dark:text-white text-lg">
                            {review.rating}
                          </span>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-[300px]">
                          {review.comment ? (
                            <p className="text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
                              {review.comment}
                            </p>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 italic text-sm">
                              No comment provided
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <p className="font-semibold text-gray-700 dark:text-gray-300">
                            {formatDistanceToNow(new Date(review.created_at), {
                              addSuffix: true,
                            })}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => openModal(review, "approve")}
                            disabled={isApproving}
                            className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
                          >
                            ✓ Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openModal(review, "reject")}
                            disabled={isApproving}
                            className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
                          >
                            ✕ Reject
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

      {/* Enhanced Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Card className="border-0 bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} results
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="font-medium"
                >
                  ← Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <Button
                      key={page}
                      variant={page === pagination.page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 p-0 font-medium ${
                        page === pagination.page
                          ? "bg-flyverr-primary hover:bg-flyverr-primary/90"
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  className="font-medium"
                >
                  Next →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Action Modal */}
      <ReviewActionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        review={modalState.review}
        action={modalState.action}
        onSubmit={handleReviewAction}
        isSubmitting={isApproving}
      />
    </div>
  );
}
