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
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-flyverr-primary" />
          <h2 className="text-2xl font-semibold">Pending Reviews</h2>
        </div>
        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-flyverr-primary" />
          <h2 className="text-2xl font-semibold">Pending Reviews</h2>
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200"
          >
            {pagination?.total || 0} pending
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Pending
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pagination?.total || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
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

        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  With Comments
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
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
      </div>

      {/* Reviews Table */}
      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Pending Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {reviews.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-lg font-medium">No pending reviews</p>
              <p className="text-sm">All reviews have been processed</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-4 font-medium">Review</th>
                    <th className="px-6 py-4 font-medium">Product</th>
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Rating</th>
                    <th className="px-6 py-4 font-medium">Comment</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                            <ImageWithFallback
                              src={review.product.thumbnail_url}
                              alt={review.product.title}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              #{review.id.slice(0, 8)}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {review.is_verified ? "Verified" : "Unverified"}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-[200px]">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {review.product.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {review.product.id.slice(0, 8)}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                            {review.user.avatar_url ? (
                              <ImageWithFallback
                                src={review.user.avatar_url}
                                alt={review.user.username}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="h-4 w-4 mx-auto mt-2 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {review.user.username}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {review.user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {review.rating}
                          </span>
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-[300px]">
                          {review.comment ? (
                            <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                              {review.comment}
                            </p>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 italic">
                              No comment
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <p className="font-medium">
                            {formatDistanceToNow(new Date(review.created_at), {
                              addSuffix: true,
                            })}
                          </p>
                          <p>
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
                            className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openModal(review, "reject")}
                            disabled={isApproving}
                            className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
                          >
                            Reject
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

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total} results
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  Previous
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
                      className="w-10 h-10 p-0"
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
                >
                  Next
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
