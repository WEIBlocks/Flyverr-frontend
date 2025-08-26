"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, User, MessageSquare, X, Trash2, List } from "lucide-react";
import { useGetReviews, useApproveReview } from "@/features/admin/reviews/hooks";

import { ReviewActionData } from "@/features/admin/reviews/reviews.types";
import { formatDistanceToNow } from "date-fns";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { swal } from "@/lib/utils";
import ReviewActionModal from "@/features/admin/reviews/components/ReviewActionModal";

export default function AdminReviewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<"pending" | "active" | "rejected" | "deleted" | "all">("pending");
  const [rating, setRating] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    review: any;
    action: "approve" | "reject";
  }>({
    isOpen: false,
    review: null,
    action: "approve",
  });

  const { data, isLoading, error, refetch, isRefetching } = useGetReviews({
    page: currentPage,
    limit: 20,
    status,
    rating,
    search,
  });
  const { mutate: approveReview, isPending: isApproving } = useApproveReview();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const statusTabs = useMemo(
    () => [
      { key: "pending", label: "Pending" },
      { key: "active", label: "Active" },
      { key: "rejected", label: "Rejected" },
      { key: "deleted", label: "Deleted" },
      { key: "all", label: "All" },
    ] as const,
    []
  );

  const applyFilters = () => {
    setSearch(searchInput.trim());
    setCurrentPage(1);
    refetch();
  };

  const clearFilters = () => {
    setStatus("pending");
    setRating(null);
    setSearch("");
    setSearchInput("");
    setCurrentPage(1);
    refetch();
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
      {/* Header Section - Separate */}
      <div className="bg-gradient-to-r from-flyverr-primary/5 to-flyverr-secondary/5 dark:from-flyverr-primary/10 dark:to-flyverr-secondary/10 rounded-2xl p-4 sm:p-6 border border-flyverr-primary/10 dark:border-flyverr-primary/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-flyverr-primary/10 dark:bg-flyverr-primary/20 rounded-xl">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-flyverr-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Reviews
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                Review moderation with filters and search
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold self-start sm:self-center"
          >
            {isLoading ? "Loading..." : `${pagination?.total || 0} total`}
          </Badge>
        </div>
      </div>

      {/* Search and Filters Section - Always visible */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            {/* Section Header */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Search & Filters
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find specific reviews by searching content or applying filters
              </p>
            </div>

        {/* Status Tabs - Enhanced Design */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Review Status
              </label>
          <div className="flex flex-wrap gap-2">
            {statusTabs.map((tab) => {
              const isActive = status === tab.key;
              const getStatusIcon = (key: string) => {
                switch (key) {
                  case 'pending':
                    return <Clock className="w-4 h-4" />;
                  case 'active':
                    return <Star className="w-4 h-4" />;
                  case 'rejected':
                    return <X className="w-4 h-4" />;
                  case 'deleted':
                    return <Trash2 className="w-4 h-4" />;
                  case 'all':
                    return <List className="w-4 h-4" />;
                  default:
                    return null;
                }
              };

              const getStatusColor = (key: string) => {
                switch (key) {
                  case 'pending':
                    return isActive 
                      ? 'bg-yellow-500 text-white border-yellow-500' 
                      : 'text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 dark:text-yellow-400 dark:border-yellow-700 dark:hover:bg-yellow-900/20 dark:hover:border-yellow-600';
                  case 'active':
                    return isActive 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-900/20 dark:hover:border-green-600';
                  case 'rejected':
                    return isActive 
                      ? 'bg-red-500 text-white border-red-500' 
                      : 'text-red-600 border-red-200 hover:bg-red-50 hover:border-yellow-300 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-600';
                  case 'deleted':
                    return isActive 
                      ? 'bg-gray-500 text-white border-gray-500' 
                      : 'text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-900/20 dark:hover:border-gray-600';
                  case 'all':
                    return isActive 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-900/20 dark:hover:border-blue-600';
                  default:
                    return '';
                }
              };

              return (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setStatus(tab.key);
                        setCurrentPage(1);
                      }}
                      disabled={isLoading}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-all duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95
                    ${getStatusColor(tab.key)}
                    ${isActive ? 'shadow-lg ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800' : ''}
                  `}
                >
                  {getStatusIcon(tab.key)}
                  <span className="font-semibold">{tab.label}</span>
                  {isActive && (
                    <div className="ml-1 w-2 h-2 bg-current rounded-full animate-pulse"></div>
                  )}
                    </button>
              );
            })}
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Section */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Reviews
                </label>
                <div className="flex gap-2">
                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                    placeholder="Search by comment, product title, or username..."
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-flyverr-primary focus:border-transparent transition-all duration-200"
                    disabled={isLoading}
                  />
                  <button
                    onClick={applyFilters}
                    disabled={isLoading || !searchInput.trim()}
                    className="px-6 py-2.5 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Rating Filter */}
                <div className="min-w-[140px]">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating Filter
                  </label>
                  <select
                    value={rating ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRating(value ? Number(value) : null);
                      setCurrentPage(1);
                    }}
                    disabled={isLoading}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-flyverr-primary focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">All Ratings</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                    <option value="3">⭐⭐⭐ 3 Stars</option>
                    <option value="2">⭐⭐ 2 Stars</option>
                    <option value="1">⭐ 1 Star</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
                  <button
                    onClick={clearFilters}
                    disabled={isLoading}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset
                  </button>
                  <button
                    onClick={() => refetch()}
                    disabled={isLoading || isRefetching}
                    className="px-4 py-2.5 border border-flyverr-primary/30 text-flyverr-primary text-sm font-medium rounded-lg hover:bg-flyverr-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 justify-center"
                  >
                    {isRefetching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-flyverr-primary border-t-transparent rounded-full animate-spin"></div>
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(status !== "pending" || rating !== null || search) && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Active Filters:</span>
                  {status !== "pending" && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
                      Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  )}
                  {rating !== null && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">
                      Rating: {rating} ⭐
                    </Badge>
                  )}
                  {search && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200">
                      Search: "{search}"
                    </Badge>
                  )}
                  <button
                    onClick={clearFilters}
                    className="ml-2 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

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
          {isLoading ? (
            // Table Loading Skeleton
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
          ) : reviews.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-10 w-10 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No reviews found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting filters or search
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
                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide">Actions</th>
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
                        {status === "pending" ? (
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
                        ) : (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            No actions available
                          </div>
                        )}
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
