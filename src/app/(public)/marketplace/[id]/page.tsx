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
    data: licenseData ,
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
  const availableLicenses = (licenseData as any)?.data?.available_licenses || [];
  const licenseProduct = (licenseData as any)?.data?.product;
  const totalAvailable = (licenseData as any)?.data?.total_available || 0;

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-8">
              <div className="relative aspect-video">
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
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full w-10 h-10 p-0"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full w-10 h-10 p-0"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>

                    {/* Image Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-flyverr-text dark:text-white mb-2">
                    {product.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    by {product.creator_id}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full ${
                      isWishlisted ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full text-gray-400"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {renderStars(averageRating, "lg")}
                  <span className="text-flyverr-text dark:text-white font-medium ml-2">
                    {averageRating.toFixed(1)} ({totalReviews} reviews)
                  </span>
                </div>
                <Badge className="bg-flyverr-secondary/20 dark:bg-flyverr-secondary/30 text-flyverr-secondary dark:text-flyverr-secondary">
                  Digital Product
                </Badge>
                {ownsLicense && (
                  <AddReview
                    productId={productId}
                    buttonVariant="outline"
                    buttonClassName="border-2 border-flyverr-primary dark:border-flyverr-primary text-flyverr-primary dark:text-white hover:bg-flyverr-primary hover:text-white dark:hover:bg-flyverr-primary dark:hover:text-white px-6 py-2.5 font-semibold shadow-md hover:shadow-lg"
                    onSuccess={() => setSelectedTab("reviews")}
                  />
                )}
              </div>

              {/* Special Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.featured && (
                  <Badge className="bg-flyverr-accent text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {product.status === "approved" && (
                  <Badge className="bg-green-500 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Approved
                  </Badge>
                )}
              </div>

              {/* Resale Stage Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${stage.color} text-white text-sm`}>
                    Stage{" "}
                    {Object.keys(resaleStages).indexOf(product.current_stage) +
                      1}
                    : {stage.name}
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Earning Potential: {stage.earningPotential}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {stage.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Remaining:{" "}
                      {licenseProduct?.remaining_licenses ??
                        product.remaining_licenses}{" "}
                      of {product.total_licenses} licenses
                    </span>
                    {licenseData && (
                      <Badge
                        variant="outline"
                        className="text-xs text-green-600 border-green-600"
                      >
                        Live
                      </Badge>
                    )}
                  </div>
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
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
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex space-x-8">
                  {[
                    { id: "description", label: "Description" },
                    { id: "reviews", label: `Reviews (${totalReviews})` },
                    { id: "creator", label: "Creator" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
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
              <div className="min-h-[400px]">
                {selectedTab === "description" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-flyverr-text dark:text-white mb-3">
                        About this product
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-flyverr-text dark:text-white mb-3">
                          Product Details
                        </h4>
                        <ul className="space-y-2">
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
                        <h4 className="font-semibold text-flyverr-text dark:text-white mb-3">
                          Stage Pricing
                        </h4>
                        <ul className="space-y-2">
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
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {product.current_stage}
                      </Badge>

                      <Badge
                        variant="outline"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Round {product.current_round}
                      </Badge>

                      <Badge
                        variant="outline"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {product.availability_percentage}% Available
                      </Badge>
                    </div>
                  </div>
                )}

                {selectedTab === "reviews" && (
                  <div className="space-y-6">
                    {/* Reviews List */}
                    {reviews.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-600 mb-4">
                          <Star className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No reviews yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Be the first to review this product!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {reviews.map((review: any) => (
                          <div
                            key={review.id}
                            className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
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
                                    <Users className="h-6 w-6" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-flyverr-text dark:text-white">
                                      {review.user.username}
                                    </h4>
                                    {review.is_verified && (
                                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200 text-xs">
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(
                                      review.created_at
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center mb-2">
                                  {renderStars(review.rating, "sm")}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
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
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-flyverr-primary/20 rounded-full flex items-center justify-center">
                        <Users className="h-10 w-10 text-flyverr-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-flyverr-text dark:text-white">
                          Creator ID: {product.creator_id}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-gray-600 dark:text-gray-400">
                            Digital Creator
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <h4 className="font-semibold text-flyverr-text dark:text-white mb-2">
                        About the creator
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
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
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-flyverr-text dark:text-white mb-6">
                    ${product.current_price}
                  </div>

                  {/* License Info */}
                  <div className="bg-flyverr-primary/10 dark:bg-flyverr-primary/20 rounded-lg p-4 mb-6">
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

                  {/* Purchase Buttons */}
                  <div className="space-y-4 mb-6">
                    {/* Primary Action - Buy to Use */}
                    <BuyToUseButton />

                    {/* Secondary Action - Buy to Resell */}
                    <BuyToResellButton product={product} />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
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
                  <div className="mt-6 p-4 bg-flyverr-secondary/10 dark:bg-flyverr-secondary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-flyverr-secondary dark:text-flyverr-secondary" />
                      <span className="font-semibold text-flyverr-secondary dark:text-flyverr-secondary">
                        30-Day Money Back Guarantee
                      </span>
                    </div>
                    <p className="text-sm text-flyverr-secondary/80 dark:text-flyverr-secondary/80">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-16">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-flyverr-primary" />
                Available Licenses for Resale ({totalAvailable})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableLicenses.map((license: any) => (
                  <div
                    key={license.license_id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
                            {license.purchase_details.purchase_type === 'resell' ? 'Resale License' : 'Use License'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Round {license.purchase_details.current_round}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Owner:</span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {license.owner.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {license.owner.email}
                            </p>
                          </div>
                          
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Purchase Type:</span>
                            <p className="font-medium text-gray-900 dark:text-white capitalize">
                              {license.purchase_details.purchase_type}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Round {license.purchase_details.current_round}
                            </p>
                          </div>
                          
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              ${license.purchase_details.original_purchase_price}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(license.purchase_details.acquired_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">License ID</p>
                          <p className="text-xs font-mono text-gray-500 dark:text-gray-400">
                            {license.license_id.slice(0, 8)}...
                          </p>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary hover:text-white"
                        >
                          Contact Owner
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-flyverr-primary/5 dark:bg-flyverr-primary/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-flyverr-primary" />
                    <span className="text-sm font-medium text-flyverr-text dark:text-white">
                      Resale Information
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    These licenses are available for purchase from their current owners. 
                    Contact the license owner directly to negotiate pricing and complete the transaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
