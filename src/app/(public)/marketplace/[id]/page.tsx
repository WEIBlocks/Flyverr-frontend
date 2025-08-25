"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Shield,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Eye,
  ShoppingCart,
  Crown,
  Flame,
  Zap,
  Gift,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMarketplaceProductDetail } from "@/features/marketplace/hooks/useGetMarketplaceProductDetail";
import { useGetAvailableLicenses } from "@/features/marketplace/hooks/useGetAvailableLicenses";
import type {
  AvailableLicensesResponse,
  ProductDetail,
} from "@/features/marketplace/marketplace.types";
import { useTrackProductView } from "@/features/marketplace/hooks/useTrackProuductView";
import { useCategoryPreferences } from "@/features/marketplace/hooks/useCategoryPreferences";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import StripeOnboardingModal from "@/components/ui/StripeOnboardingModal";
import { canPurchaseProducts } from "@/lib/stripeHelpers";
import { usePurchaseProduct } from "@/features/user/product/hooks/usePurchaseProduct";
import Modal from "@/components/Modal";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useAuth } from "@/contexts/AuthContext";
import { swal } from "@/lib/utils";
import BuyToUseButton from "@/features/user/product/components/BuyToUseButton";
import BuyToResellButton from "@/features/user/product/components/BuyToResellButton";
import { useGetMyLicenses } from "@/features/user/licenses/hooks/useGetMyLicenses";
import AddReview from "@/features/user/reviews/components/AddReview";
import { useGetProductReviews } from "@/features/user/reviews/hooks/useGetProductReviews";
import type {
  ProductReview,
  ReviewSummary,
} from "@/features/user/reviews/review.types";

// Resale Stage Configuration
const resaleStages = {
  newboom: {
    name: "Newboom",
    color: "bg-green-500",
    description: "Never resold - Original licenses only",
    earningPotential: "High",
  },
  blossom: {
    name: "Blossom",
    color: "bg-blue-500",
    description: "1st resale cycle - Growing demand",
    earningPotential: "Very High",
  },
  evergreen: {
    name: "Evergreen",
    color: "bg-purple-500",
    description: "2nd resale cycle - Stable value",
    earningPotential: "Medium",
  },
  exit: {
    name: "Exit",
    color: "bg-orange-500",
    description: "3rd resale cycle - Final opportunity",
    earningPotential: "Low",
  },
};

export default function ProductDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "description" | "reviews" | "creator"
  >("description");
  const [isStripeOnboardingModalOpen, setIsStripeOnboardingModalOpen] =
    useState(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [selectedPurchaseType, setSelectedPurchaseType] = useState<
    "use" | "resell" | null
  >(null);
  const [isBuyingToUse, setIsBuyingToUse] = useState(false);
  const [isBuyingToResell, setIsBuyingToResell] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const productId = params.id as string;

  // Fetch product data using the hook
  const {
    data: product,
    isLoading,
    error,
  } = useGetMarketplaceProductDetail(productId);
  const {
    data: licenseData,
    isLoading: isLoadingLicense,
    error: licenseError,
  } = useGetAvailableLicenses(productId);
  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useGetProductReviews(productId);
  const { mutate: trackProductView } = useTrackProductView();
  const { recordView } = useCategoryPreferences();
  const {
    data: myLicenses,
    isLoading: isLoadingMyLicenses,
    error: myLicensesError,
  } = useGetMyLicenses(1, 100);

  const { data: currentUser } = useGetCurrentUser();

  // Extract reviews and summary data
  const reviews = (reviewsData as any)?.data?.reviews || [];
  const summary = (reviewsData as any)?.data?.summary;
  const totalReviews = summary?.total_reviews || 0;
  const averageRating = summary?.average_rating || 0;

  // Extract license data
  const availableLicenses =
    (licenseData as any)?.data?.available_licenses || [];
  const licenseProduct = (licenseData as any)?.data?.product;
  const totalAvailable = (licenseData as any)?.data?.total_available || 0;

  // Enhanced license availability logic
  const currentRound = product?.current_round || 0;
  const currentStage = product?.current_stage || "newboom";

  // Check if this is resale-only mode (when all available licenses are resale licenses)
  const isResaleOnly =
    availableLicenses.length > 0 &&
    availableLicenses.every(
      (license: any) => license.purchase_details?.purchase_type === "resell"
    );

  // Check if user can purchase new licenses (only in round 0, not resale-only mode)
  const canPurchaseNew =
    currentRound === 0 &&
    !isResaleOnly &&
    (licenseProduct?.remaining_licenses || product?.remaining_licenses || 0) >
      0;

  // Track product view when product is loaded
  useEffect(() => {
    if (productId && product && !isLoading) {
      trackProductView(productId);
      recordView(product.category_id);
    }
  }, [productId, product, isLoading, trackProductView, recordView]);

  // Show loading state
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  // Show error state
  if (error || !product || licenseError || reviewsError || myLicensesError) {
    return (
      <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error instanceof Error
              ? error.message
              : "The product you are looking for does not exist."}
          </p>
          <Button
            onClick={() => router.push("/marketplace")}
            className="bg-flyverr-primary hover:bg-flyverr-primary/90"
          >
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const stage = resaleStages[product.current_stage];
  const images =
    product.images_urls && product.images_urls.length > 0
      ? product.images_urls
      : [product.thumbnail_url];
  const ownsLicense = !!(myLicenses as any)?.data?.licenses?.some(
    (group: any) =>
      group?.product?.id === productId &&
      Array.isArray(group.licenses) &&
      group.licenses.length > 0
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper function to render star rating
  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-flyverr-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Left Column - Images and Info */}
          <div className="xl:col-span-3 lg:col-span-2 md:col-span-1">
            {/* Image Gallery */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden mb-4 sm:mb-6 md:mb-8">
              <div className="relative aspect-video sm:aspect-video">
                <ImageWithFallback
                  src={images[currentImageIndex]}
                  alt={product.title}
                  fill
                  className="w-full h-full"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>

                    {/* Image Dots */}
                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                            index === currentImageIndex
                              ? "bg-white shadow-lg"
                              : "bg-white/60 hover:bg-white/80"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-4">
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-flyverr-text dark:text-white mb-2">
                    {product.title}
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300">
                    by {product.creator_id}
                  </p>
                </div>
                <div className="flex gap-2 self-end sm:self-start">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-1.5 sm:p-2 rounded-full ${
                      isWishlisted ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5 sm:p-2 rounded-full text-gray-400"
                  >
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center">
                  {renderStars(averageRating, "md")}
                  <span className="text-sm sm:text-base text-flyverr-text dark:text-white font-medium ml-2">
                    {averageRating.toFixed(1)} ({totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-flyverr-secondary/20 dark:bg-flyverr-secondary/30 text-flyverr-secondary dark:text-flyverr-secondary text-xs sm:text-sm">
                    Digital Product
                  </Badge>
                  {ownsLicense && (
                    <AddReview
                      productId={productId}
                      buttonVariant="outline"
                      buttonClassName="border-2 border-flyverr-primary dark:border-flyverr-primary text-flyverr-primary dark:text-white hover:bg-flyverr-primary hover:text-white dark:hover:bg-flyverr-primary dark:hover:text-white px-3 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg"
                      onSuccess={() => setSelectedTab("reviews")}
                    />
                  )}
                </div>
              </div>

              {/* Special Badges */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {product.featured && (
                  <Badge className="bg-flyverr-accent text-white text-xs sm:text-sm">
                    <Crown className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {product.status === "approved" && (
                  <Badge className="bg-green-500 text-white text-xs sm:text-sm">
                    <Shield className="h-3 w-3 mr-1" />
                    Approved
                  </Badge>
                )}
              </div>

              {/* Resale Stage Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
                  <Badge
                    className={`${stage.color} text-white text-xs sm:text-sm`}
                  >
                    Stage{" "}
                    {Object.keys(resaleStages).indexOf(product.current_stage) +
                      1}
                    : {stage.name}
                  </Badge>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Earning Potential: {stage.earningPotential}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {stage.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Remaining:{" "}
                      {licenseProduct?.remaining_licenses ??
                        product.remaining_licenses}{" "}
                      of {product.total_licenses} licenses
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          currentRound === 0
                            ? "border-green-500 text-green-600"
                            : "border-orange-500 text-orange-600"
                        }`}
                      >
                        Round {currentRound}
                      </Badge>
                      {currentRound === 0 && licenseData && (
                        <Badge
                          variant="outline"
                          className="text-xs text-green-600 border-green-600"
                        >
                          Live
                        </Badge>
                      )}
                      {currentRound > 0 && (
                        <Badge
                          variant="outline"
                          className="text-xs text-orange-600 border-orange-600"
                        >
                          Resale Only
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="w-full sm:w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-flyverr-primary h-2 rounded-full"
                      style={{
                        width: `${
                          ((licenseProduct?.remaining_licenses ??
                            product.remaining_licenses) /
                            product.total_licenses) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
                <div className="flex space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto">
                  {[
                    { id: "description", label: "Description" },
                    { id: "reviews", label: `Reviews (${totalReviews})` },
                    { id: "creator", label: "Creator" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`pb-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                        selectedTab === tab.id
                          ? "border-flyverr-primary text-flyverr-primary dark:text-flyverr-primary"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px] sm:min-h-[400px]">
                {selectedTab === "description" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-flyverr-text dark:text-white mb-2 sm:mb-3">
                        About this product
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h4 className="font-semibold text-flyverr-text dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">
                          Product Details
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                          <li className="flex items-center text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-flyverr-secondary rounded-full mr-3"></div>
                            File Type: {product.file_type.toUpperCase()}
                          </li>
                          <li className="flex items-center text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-flyverr-secondary rounded-full mr-3"></div>
                            File Size: {product.file_size_formatted}
                          </li>
                          <li className="flex items-center text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-flyverr-secondary rounded-full mr-3"></div>
                            Status: {product.status}
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-flyverr-text dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">
                          Stage Pricing
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                          {Object.entries(product.stage_pricing).map(
                            ([stage, price]) => (
                              <li
                                key={stage}
                                className="flex items-center justify-between text-gray-600 dark:text-gray-300"
                              >
                                <span className="capitalize">{stage}:</span>
                                <span className="font-medium">${price}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm"
                      >
                        {product.current_stage}
                      </Badge>

                      <Badge
                        variant="outline"
                        className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm"
                      >
                        Round {product.current_round}
                      </Badge>

                      <Badge
                        variant="outline"
                        className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm"
                      >
                        {product.availability_percentage}% Available
                      </Badge>
                    </div>
                  </div>
                )}

                {selectedTab === "reviews" && (
                  <div className="space-y-4 sm:space-y-6">
                    {/* Reviews List */}
                    {reviews.length === 0 ? (
                      <div className="text-center py-8 sm:py-12">
                        <div className="text-gray-400 dark:text-gray-600 mb-4">
                          <Star className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No reviews yet
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Be the first to review this product!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 sm:space-y-6">
                        {reviews.map((review: any) => (
                          <div
                            key={review.id}
                            className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6 last:border-b-0"
                          >
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                                {review.user.avatar_url ? (
                                  <Image
                                    src={review.user.avatar_url}
                                    alt={review.user.username}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                                    <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-flyverr-text dark:text-white text-sm sm:text-base">
                                      {review.user.username}
                                    </h4>
                                    {review.is_verified && (
                                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200 text-xs">
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(
                                      review.created_at
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center mb-2">
                                  {renderStars(review.rating, "sm")}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {review.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === "creator" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-flyverr-primary/20 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 sm:h-10 sm:w-10 text-flyverr-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-flyverr-text dark:text-white">
                          Creator ID: {product.creator_id}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Digital Creator
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <h4 className="font-semibold text-flyverr-text dark:text-white mb-2 text-sm sm:text-base">
                        About the creator
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        This creator has developed digital products available on
                        our marketplace. Their products go through our approval
                        process to ensure quality and compliance.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Options */}
          <div className="xl:col-span-1 lg:col-span-1 md:col-span-1">
            <div className="sticky top-4 sm:top-6 md:top-8">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-flyverr-text dark:text-white mb-4 sm:mb-6">
                    ${product.current_price}
                  </div>

                  {/* License Info */}
                  <div className="bg-flyverr-primary/10 dark:bg-flyverr-primary/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-flyverr-text dark:text-white">
                        Available Licenses
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {licenseProduct?.remaining_licenses ??
                          product.remaining_licenses}{" "}
                        of {product.total_licenses}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-flyverr-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((licenseProduct?.remaining_licenses ??
                              product.remaining_licenses) /
                              product.total_licenses) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* License Status and Purchase Options */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    {/* Show different states based on availability */}
                    {isResaleOnly ? (
                      // Resale-Only Mode: Disable new license purchases
                      <div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="text-blue-500 dark:text-blue-400 mb-2">
                          <svg
                            className="h-6 w-6 sm:h-8 sm:w-8 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-200 mb-1 font-medium">
                          Resale-Only Mode
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          Check resale licenses below.
                        </p>
                      </div>
                    ) : canPurchaseNew ? (
                      // Normal Mode: Show purchase buttons
                      <>
                        <BuyToUseButton />
                        <BuyToResellButton product={product} />
                      </>
                    ) : (
                      // No Licenses Available or Wrong Round
                      <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-gray-400 dark:text-gray-500 mb-2">
                          <svg
                            className="h-6 w-6 sm:h-8 sm:w-8 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                          {currentRound === 0
                            ? "No Licenses Available"
                            : "Licenses Not Available in This Round"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {currentRound === 0
                            ? "This product has no available licenses for purchase."
                            : `Licenses can only be purchased in Round 0. Current round: ${currentRound}`}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>File Size:</span>
                      <span className="font-medium text-flyverr-text dark:text-white">
                        {product.file_size_formatted}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="font-medium text-flyverr-text dark:text-white">
                        {new Date(product.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-medium text-flyverr-text dark:text-white">
                        {product.category_id || "Digital Product"}
                      </span>
                    </div>
                  </div>

                  {/* Guarantee */}
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-flyverr-secondary/10 dark:bg-flyverr-secondary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-flyverr-secondary dark:text-flyverr-secondary" />
                      <span className="text-xs sm:text-sm font-semibold text-flyverr-secondary dark:text-flyverr-secondary">
                        30-Day Money Back Guarantee
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-flyverr-secondary/80 dark:text-flyverr-secondary/80">
                      Not satisfied? Get a full refund within 30 days of
                      purchase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Available Licenses Section */}
      {availableLicenses.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-8 sm:pb-12 md:pb-16">
          <div className="mb-4 sm:mb-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-flyverr-text dark:text-white mb-2">
                Available Licenses for Resale
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Purchase licenses from current owners
              </p>
            </div>
          </div>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-flyverr-primary/20 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-flyverr-primary" />
                </div>
                Available Licenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {availableLicenses.map((license: any) => (
                  <div
                    key={license.license_id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 hover:border-flyverr-primary/30"
                  >
                    {/* Header Section with Badges */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
                        {license.purchase_details.purchase_type === "resell"
                          ? "🔄 Resale License"
                          : "📱 Use License"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-flyverr-primary text-flyverr-primary px-2 sm:px-3 py-1 text-xs sm:text-sm"
                      >
                        Round {license.purchase_details.current_round}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
                        ✅ Available for Purchase
                      </Badge>
                    </div>

                    {/* Main Content Grid - Responsive Layout */}
                    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      {/* Owner Information */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-flyverr-primary/20 rounded-full flex items-center justify-center">
                            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-flyverr-primary" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Current Owner
                          </span>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1">
                          {license.owner.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-all">
                          {license.owner.email}
                        </p>
                      </div>

                      {/* License Type Information */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-flyverr-secondary/20 rounded-full flex items-center justify-center">
                            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-flyverr-secondary" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                            License Type
                          </span>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 capitalize">
                          {license.purchase_details.purchase_type}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          Round {license.purchase_details.current_round}
                        </p>
                      </div>

                      {/* Price Information */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <span className="text-green-600 dark:text-green-400 font-bold text-xs sm:text-sm">
                              $
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Current Price
                          </span>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1">
                          $ {product.current_price}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {new Date(
                            license.purchase_details.acquired_at
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      {/* License ID Information */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 dark:text-purple-400 font-bold text-xs">
                              ID
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                            License ID
                          </span>
                        </div>
                        <p className="font-mono font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-1 break-all">
                          {license.license_id.slice(0, 12)}...
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Unique identifier
                        </p>
                      </div>
                    </div>

                    {/* Purchase Actions Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                        {/* Purchase Type Explanation */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Info className="h-3 w-3 sm:h-4 sm:w-4 text-flyverr-primary" />
                            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                              Purchase Options
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-flyverr-primary rounded-full"></div>
                              <span>
                                <strong>Use:</strong> Personal use only
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-flyverr-secondary rounded-full"></div>
                              <span>
                                <strong>Resell:</strong> Can be resold later
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Purchase Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 min-w-[240px] sm:min-w-[280px]">
                          <div className="flex-1">
                            <BuyToUseButton licenseId={license.license_id} />
                          </div>
                          <div className="flex-1">
                            <BuyToResellButton
                              product={product}
                              licenseId={license.license_id}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
