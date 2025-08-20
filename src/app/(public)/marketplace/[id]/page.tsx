"use client";
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

// Types
interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

// Mock reviews (you can replace this with real API data later)
const mockReviews: Review[] = [
  {
    id: "1",
    user: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    date: "2024-01-10",
    comment:
      "Amazing course! The instructor explains complex concepts in a very clear way. I went from knowing nothing about web development to building my first full-stack application.",
    helpful: 24,
  },
  {
    id: "2",
    user: "Mike Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    date: "2024-01-08",
    comment:
      "Great content and well-structured. The practical projects really help reinforce the learning. Would recommend to anyone starting their web development journey.",
    helpful: 18,
  },
  {
    id: "3",
    user: "Emily Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    date: "2024-01-05",
    comment:
      "Excellent course! The instructor is very knowledgeable and the community support is fantastic. Already started working on my portfolio.",
    helpful: 31,
  },
];
    
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
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
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

  // Get product ID from params

  // Fetch product data using the hook
  const {
    data: product,
    isLoading,
    error,
  } = useGetMarketplaceProductDetail(productId);
  const { data: licenseData } = useGetAvailableLicenses(productId) as {
    data: AvailableLicensesResponse;
  };
  const { mutate: trackProductView } = useTrackProductView();
  const { recordView } = useCategoryPreferences();
  const { mutate: purchaseProduct, isPending: isPurchasing } =
    usePurchaseProduct();
  const { data: currentUser } = useGetCurrentUser();

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
  if (error || !product) {
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
    

  const handleBuyToUse = () => {
    if (!canPurchaseProducts(currentUser)) {
      setIsStripeOnboardingModalOpen(true);
      return;
    }
    // Handle buy to use logic
    console.log("Buy to Use clicked for product:", product.id);
    setIsBuyingToUse(true);

    purchaseProduct(
      {
        id: productId,
        data: {
          purchaseType: "use",
          hasInsurance: false,
          paymentMethod: "stripe",
        },
      },
      {
        onSuccess: () => {
          setIsBuyingToUse(false);
        },
        onError: () => {
          setIsBuyingToUse(false);
        },
      }
    );

    // Reset loading state after a delay (you can also handle this in onSuccess/onError)
  };

  const handleBuyToResell = () => {
    if (!canPurchaseProducts(currentUser)) {
      setIsStripeOnboardingModalOpen(true);
      return;
    }
    // Show insurance modal for resell
    setSelectedPurchaseType("resell");
    setIsInsuranceModalOpen(true);
  };

  const handleInsuranceChoice = (hasInsurance: boolean) => {
    if (!selectedPurchaseType) return;

    // Calculate insurance fee if applicable
    // const basePrice = product.current_price;
    // const insuranceFee = hasInsurance ? basePrice * 0.05 : 0;
    // const totalPrice = basePrice + insuranceFee;

    // console.log(`${selectedPurchaseType === 'resell' ? 'Buy to Resell' : 'Buy to Use'} clicked for product:`, product.id)
    // console.log(`Insurance: ${hasInsurance ? 'Yes' : 'No'}, Fee: $${insuranceFee.toFixed(2)}, Total: $${totalPrice.toFixed(2)}`)

    // Set loading state for resell
    if (selectedPurchaseType === "resell") {
      setIsBuyingToResell(true);
    }

    // Call purchase with insurance choice
    purchaseProduct(
      {
        id: productId,
        data: {
          purchaseType: selectedPurchaseType,
          hasInsurance,
          paymentMethod: "stripe",
        },
      },
      {
        onSuccess: () => {
          setIsBuyingToResell(false);
        },
        onError: () => {
          setIsBuyingToResell(false);
        },
      }
    );

    // Close modal and reset
    setIsInsuranceModalOpen(false);
    setSelectedPurchaseType(null);

    // Reset loading state after a delay
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
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 // You can replace this with actual rating when available
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-flyverr-text dark:text-white font-medium">
                    4.0 (0 reviews)
                  </span>
                </div>
                <Badge className="bg-flyverr-secondary/20 dark:bg-flyverr-secondary/30 text-flyverr-secondary dark:text-flyverr-secondary">
                  Digital Product
                </Badge>
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
                      {licenseData?.data?.product?.remaining_licenses ??
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
                          ((licenseData?.data?.product?.remaining_licenses ??
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
                    { id: "reviews", label: "Reviews (0)" },
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
                    {mockReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                      >
                      <div
                        key={review.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                      >
                        <div className="flex items-start gap-4">
                          <Image
                            src={review.avatar}
                            alt={review.user}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-flyverr-text dark:text-white">
                                {review.user}
                              </h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {review.date}
                              </span>
                              <h4 className="font-semibold text-flyverr-text dark:text-white">
                                {review.user}
                              </h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {review.date}
                              </span>
                            </div>
                            <div className="flex items-center mb-2">
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
                            <p className="text-gray-600 dark:text-gray-300">
                              {review.comment}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              {review.comment}
                            </p>
                            <div className="mt-3">
                          
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 dark:text-gray-400"
                              >
                                Helpful ({review.helpful})
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    ))}
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
                        <h3 className="text-xl font-semibold text-flyverr-text dark:text-white">
                          Creator ID: {product.creator_id}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-gray-600 dark:text-gray-400">
                            Digital Creator
                          </span>
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
                      <h4 className="font-semibold text-flyverr-text dark:text-white mb-2">
                        About the creator
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        This creator has developed digital products available on
                        our marketplace. Their products go through our approval
                        process to ensure quality and compliance.
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
                        {licenseData?.data?.product?.remaining_licenses ??
                          product.remaining_licenses}{" "}
                        of {product.total_licenses}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-flyverr-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((licenseData?.data?.product?.remaining_licenses ??
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
                    <Button
                      className="w-full bg-flyverr-primary hover:bg-flyverr-primary/90 text-white py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      onClick={handleBuyToUse}
                      disabled={isBuyingToUse}
                    >
                      {isBuyingToUse ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Buying...
                        </div>
                      ) : (
                        <>
                      <Download className="h-6 w-6 mr-3" />
                      Buy to Use
                        </>
                      )}
                    </Button>

                    {/* Secondary Action - Buy to Resell */}
                    <Button
                      variant="outline"
                      className="w-full bg-transparent dark:bg-transparent border-2 border-flyverr-secondary text-flyverr-secondary dark:text-flyverr-secondary hover:bg-flyverr-secondary hover:text-white dark:hover:bg-flyverr-secondary dark:hover:text-white py-4 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 "
                      onClick={handleBuyToResell}
                      disabled={isBuyingToResell}
                    >
                      {isBuyingToResell ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-flyverr-secondary mr-2"></div>
                          Buying...
                        </div>
                      ) : (
                        <>
                      <TrendingUp className="h-6 w-6 mr-3" />
                      Buy to Resell
                        </>
                      )}
                    </Button>

                    {/* Tertiary Action - Buy with Insurance */}
                    {/* <Button 
                      variant="outline"
                      className="w-full bg-transparent dark:bg-transparent border-2 border-flyverr-accent text-flyverr-accent dark:text-flyverr-accent hover:bg-flyverr-accent hover:text-white dark:hover:bg-flyverr-accent  py-4 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-white"
                      onClick={handleBuyWithInsurance}
                    >
                      <Shield className="h-6 w-6 mr-3" />
                      Buy with Insurance
                    </Button> */}
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
      {/* Stripe Onboarding Modal */}
      <StripeOnboardingModal
        isOpen={isStripeOnboardingModalOpen}
        onClose={() => setIsStripeOnboardingModalOpen(false)}
      />

      {/* Insurance Choice Modal */}
      {isInsuranceModalOpen && (
        <Modal size="sm">
          <div className="p-6">
            <div className="text-center mb-6">
              <Shield className="h-16 w-16 text-flyverr-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-flyverr-text dark:text-white mb-2">
                Resell Protection Insurance
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Protect your investment with our resell insurance. If the
                product doesn't sell, we'll refund your fee.
              </p>
            </div>

            <div className="bg-flyverr-accent/10 dark:bg-flyverr-accent/20 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-flyverr-text dark:text-white">
                  Base Price:
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ${product.current_price}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-flyverr-text dark:text-white">
                  Insurance Fee (5%):
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ${(product.current_price * 0.05).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-2">
                <span className="text-sm font-bold text-flyverr-text dark:text-white">
                  Total Price:
                </span>
                <span className="text-sm font-bold text-flyverr-accent">
                  ${(product.current_price * 1.05).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-flyverr-accent hover:bg-flyverr-accent/90 text-white py-3 font-semibold"
                onClick={() => handleInsuranceChoice(true)}
              >
                <Shield className="h-5 w-5 mr-2" />
                Yes, Add Insurance (+5%)
              </Button>

              <Button
                variant="outline"
                className="w-full text-flyverr-secondary hover:bg-flyverr-secondary hover:text-white py-3 font-semibold border border-flyverr-secondary dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-white"
                onClick={() => handleInsuranceChoice(false)}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                No Insurance, Proceed
              </Button>

              <Button
                variant="ghost"
                className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => {
                  setIsInsuranceModalOpen(false);
                  setSelectedPurchaseType(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
} 
