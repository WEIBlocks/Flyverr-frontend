"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Star,
  TrendingUp,
  Flame,
  Crown,
  Gift,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  Users,
  Zap,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useGetMarketplaceProducts } from "@/features/marketplace/hooks/useGetMarketplaceProducts";
import { useRecommendedProducts } from "@/features/marketplace/hooks/useRecommendedProducts";
import { useGetCategoryProducts } from "@/features/marketplace/hooks";
import {
  resaleStages,
  type MarketplaceFilters,
  type MarketplaceProduct,
} from "@/features/marketplace/marketplace.types";
import Modal from "@/components/Modal";
import {
  formatErrorMessage,
  getValidationErrors,
  isValidationError,
} from "@/lib/errorUtils";

// Types
interface ImageState {
  loading: boolean;
  error: boolean;
  loaded: boolean;
}

// Updated categories based on new requirements (Sponsored removed as a tab)
const categories = [
  { id: "all", name: "All Products", icon: Sparkles },
  { id: "trending", name: "Trending", icon: TrendingUp },
  { id: "featured", name: "Featured", icon: Crown },
  { id: "recommended", name: "We Think You'll Like", icon: Gift },
  { id: "hot-deals", name: "Hot Deals", icon: Flame },
];

// Skeleton Loading Component
const ProductCardSkeleton = () => (
  <Card className="border-0 bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-md">
    <div className="relative bg-gray-200 dark:bg-gray-700 animate-pulse">
      <div className="w-full h-32 sm:h-40 md:h-48 lg:h-52 xl:h-56 bg-gray-300 dark:bg-gray-600"></div>
    </div>
    <CardContent className="p-4">
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
);

// Filter Modal Component
const FilterModal = ({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  selectedStage,
  onStageChange,
  showFeatured,
  onFeaturedChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onApply,
  onClearAll,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStage: string | undefined;
  onStageChange: (stage: string | undefined) => void;
  showFeatured: boolean | undefined;
  onFeaturedChange: (featured: boolean | undefined) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  sortBy: "created_at" | "price" | "title" | "remaining_licenses";
  onSortByChange: (
    sortBy: "created_at" | "price" | "title" | "remaining_licenses"
  ) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (sortOrder: "asc" | "desc") => void;
  onApply: () => void;
  onClearAll: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <Modal size="lg">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Filters
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Categories */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Categories
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => onCategoryChange(category.id)}
                    className={`justify-start ${
                      selectedCategory === category.id
                        ? "bg-flyverr-primary text-white hover:bg-flyverr-primary/90"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-flyverr-primary/5"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Resale Stages */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Resale Stages
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {resaleStages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <Button
                    key={stage.id}
                    variant={selectedStage === stage.id ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      onStageChange(
                        selectedStage === stage.id ? undefined : stage.id
                      )
                    }
                    className={`justify-start ${
                      selectedStage === stage.id
                        ? "bg-flyverr-primary text-white hover:bg-flyverr-primary/90"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-flyverr-primary/5"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {stage.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Featured Filter */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Featured Products
            </h4>
            <div className="space-y-2">
              {[
                { value: undefined, label: "All Products" },
                { value: true, label: "Featured Only" },
                { value: false, label: "Non-Featured Only" },
              ].map((option) => (
                <Button
                  key={String(option.value)}
                  variant={
                    showFeatured === option.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => onFeaturedChange(option.value)}
                  className={`justify-start w-full ${
                    showFeatured === option.value
                      ? "bg-flyverr-primary text-white hover:bg-flyverr-primary/90"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-flyverr-primary/5"
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Price Range
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Min Price
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={priceRange.min || ""}
                  onChange={(e) =>
                    onPriceRangeChange({
                      ...priceRange,
                      min: Number(e.target.value) || 0,
                    })
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Max Price
                </label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={priceRange.max || ""}
                  onChange={(e) =>
                    onPriceRangeChange({
                      ...priceRange,
                      max: Number(e.target.value) || 0,
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Sort By
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Sort Field
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    onSortByChange(
                      e.target.value as
                        | "created_at"
                        | "price"
                        | "title"
                        | "remaining_licenses"
                    )
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="created_at">Date Created</option>
                  <option value="price">Price</option>
                  <option value="title">Title</option>
                  <option value="remaining_licenses">Available Licenses</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    onSortOrderChange(e.target.value as "asc" | "desc")
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <Button
            variant="outline"
            onClick={onClearAll}
            className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
          >
            Clear All
          </Button>
          <Button
            onClick={onApply}
            className="flex-1 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white font-medium"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default function MarketplacePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // State for filters and pagination
  const [filters, setFilters] = useState<MarketplaceFilters>({
    limit: 20,
    offset: 0,
    sortBy: "created_at",
    sortOrder: "desc",
  });

  // Pending filters state (only applied when Apply button is clicked)
  const [pendingFilters, setPendingFilters] = useState({
    searchTerm: "",
    selectedCategory: "all",
    selectedStage: undefined as string | undefined,
    showFeatured: undefined as boolean | undefined,
    priceRange: { min: 0, max: 0 },
    sortBy: "created_at" as
      | "created_at"
      | "price"
      | "title"
      | "remaining_licenses",
    sortOrder: "desc" as "asc" | "desc",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Filter modal state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Image state management
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>(
    {}
  );
  const [imageStates, setImageStates] = useState<{ [key: string]: ImageState }>(
    {}
  );

  const useRecommended = !!filters.recommended;
  const useTrending = !!filters.trending;
  const useHotDeals = !!filters.hotDeals;
  const useFeatured = !!filters.featured;

  // Fetch products using the hook
  const {
    data: marketplaceData,
    isLoading,
    error,
    refetch,
  } = useGetMarketplaceProducts(filters, {
    enabled: !useTrending && !useFeatured && !useHotDeals && !useRecommended,
  });

  // Recommended products (frontend-only)
  const { data: recommendedProducts = [], isLoading: isLoadingRecommended } =
    useRecommendedProducts(8);

  // Category API datasets
  const { data: trendingData, isLoading: isLoadingTrending } =
    useGetCategoryProducts("trending", {
      limit: 10,
      page: 1,
      enabled: useTrending,
    });
  const { data: featuredData, isLoading: isLoadingFeatured } =
    useGetCategoryProducts("featured", {
      limit: 10,
      page: 1,
      enabled: useFeatured,
    });
  const { data: hotDealsData, isLoading: isLoadingHotDeals } =
    useGetCategoryProducts("hot_deals", {
      limit: filters.limit || 20,
      page: currentPage,
      enabled: useHotDeals,
    });

  // Sponsored merge for All Products
  const isAllCategory =
    !useTrending && !useHotDeals && !useFeatured && !useRecommended;
  const { data: sponsoredData, isLoading: isLoadingSponsored } =
    useGetCategoryProducts("sponsored", {
      limit: filters.limit || 20,
      page: 1,
    });

  const baseProducts = marketplaceData?.data?.products || [];
  const sponsored =
    (sponsoredData?.data?.products as MarketplaceProduct[]) || [];

  const mergedAllProducts: MarketplaceProduct[] = React.useMemo(() => {
    if (!isAllCategory) return baseProducts;
    if (isLoadingSponsored || !sponsored?.length) return baseProducts;
    const seen = new Set<string>();
    const merged: MarketplaceProduct[] = [];
    for (const p of sponsored) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        merged.push(p);
      }
    }
    for (const p of baseProducts) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        merged.push(p);
      }
    }
    return merged.slice(0, baseProducts.length || filters.limit || 20);
  }, [
    isAllCategory,
    isLoadingSponsored,
    sponsored,
    baseProducts,
    filters.limit,
  ]);

  const loading = useRecommended
    ? isLoadingRecommended
    : useTrending
    ? isLoadingTrending
    : useFeatured
    ? isLoadingFeatured
    : useHotDeals
    ? isLoadingHotDeals
    : isLoading || (isAllCategory && isLoadingSponsored);

  const products = useRecommended
    ? recommendedProducts
    : useTrending
    ? (trendingData?.data?.products as MarketplaceProduct[]) || []
    : useFeatured
    ? (featuredData?.data?.products as MarketplaceProduct[]) || []
    : useHotDeals
    ? (hotDealsData?.data?.products as MarketplaceProduct[]) || []
    : mergedAllProducts;

  const basePagination = marketplaceData?.data?.pagination;
  const trendingPagination = trendingData?.data?.pagination;
  const featuredPagination = featuredData?.data?.pagination;
  const hotDealsPagination = hotDealsData?.data?.pagination;

  const totalProducts = useRecommended
    ? products.length
    : useTrending
    ? trendingPagination?.total || 0
    : useFeatured
    ? featuredPagination?.total || 0
    : useHotDeals
    ? hotDealsPagination?.total || 0
    : basePagination?.total || 0;

  const hasMore = useRecommended
    ? false
    : useTrending
    ? !!trendingPagination?.hasMore
    : useFeatured
    ? !!featuredPagination?.hasMore
    : useHotDeals
    ? !!hotDealsPagination?.hasMore
    : !!basePagination?.hasMore;

  // Apply filters function - called when Apply button is clicked
  const applyFilters = () => {
    const newFilters: MarketplaceFilters = {
      limit: 20,
      offset: 0,
      sortBy: pendingFilters.sortBy,
      sortOrder: pendingFilters.sortOrder,
    };

    if (pendingFilters.searchTerm) {
      newFilters.search = pendingFilters.searchTerm;
    }

    if (pendingFilters.selectedCategory !== "all") {
      if (pendingFilters.selectedCategory === "trending") {
        newFilters.trending = true;
      } else if (pendingFilters.selectedCategory === "recommended") {
        newFilters.recommended = true;
      } else if (pendingFilters.selectedCategory === "hot-deals") {
        newFilters.hotDeals = true;
      }
    }

    if (
      pendingFilters.selectedStage &&
      pendingFilters.selectedStage !== "all"
    ) {
      newFilters.stage = pendingFilters.selectedStage as any;
    }

    if (pendingFilters.showFeatured !== undefined) {
      newFilters.featured = pendingFilters.showFeatured;
    }

    if (pendingFilters.priceRange.min > 0) {
      newFilters.minPrice = pendingFilters.priceRange.min;
    }

    if (pendingFilters.priceRange.max > 0) {
      newFilters.maxPrice = pendingFilters.priceRange.max;
    }

    setFilters(newFilters);
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  // Clear all filters function (used by both modal and main clear buttons)
  const clearAllFilters = () => {
    const newFilters: MarketplaceFilters = {
      limit: 20,
      offset: 0,
      sortBy: "created_at",
      sortOrder: "desc",
    };

    setFilters(newFilters);
    setPendingFilters({
      searchTerm: "",
      selectedCategory: "all",
      selectedStage: undefined,
      showFeatured: undefined,
      priceRange: { min: 0, max: 0 },
      sortBy: "created_at",
      sortOrder: "desc",
    });
    setCurrentPage(1);
  };

  // Clear filters and close modal function
  const clearFiltersAndCloseModal = () => {
    clearAllFilters();
    setIsFilterModalOpen(false);
  };

  // Update offset when page changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      offset: (currentPage - 1) * (prev.limit || 20),
    }));
  }, [currentPage]);

  const handleCategoryClick = (categoryId: string) => {
    // Apply category filter immediately
    const newFilters: MarketplaceFilters = {
      limit: 20,
      offset: 0,
      sortBy: filters.sortBy || "created_at",
      sortOrder: filters.sortOrder || "desc",
    };

    if (categoryId !== "all") {
      if (categoryId === "trending") {
        newFilters.trending = true;
      } else if (categoryId === "featured") {
        newFilters.featured = true;
      } else if (categoryId === "recommended") {
        newFilters.recommended = true;
      } else if (categoryId === "hot-deals") {
        newFilters.hotDeals = true;
      }
    }

    setFilters(newFilters);
    setPendingFilters((prev) => ({ ...prev, selectedCategory: categoryId }));
    setCurrentPage(1);
  };

  const handleCardClick = (productId: string) => {
    router.push(`/marketplace/${productId}`);
  };

  const nextImage = (productId: string, totalImages: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (productId: string, totalImages: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [productId]:
        prev[productId] === 0 ? totalImages - 1 : (prev[productId] || 0) - 1,
    }));
  };

  const handleImageLoad = (productId: string) => {
    setImageStates((prev) => ({
      ...prev,
      [productId]: { loading: false, error: false, loaded: true },
    }));
  };

  const handleImageError = (productId: string) => {
    setImageStates((prev) => ({
      ...prev,
      [productId]: { loading: false, error: true, loaded: false },
    }));
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / (filters.limit || 20));

  const handleTryAgain = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-flyverr-text dark:text-white mb-2 sm:mb-3">
            Digital Marketplace
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300">
            Discover limited digital products that appreciate in value
          </p>
        </div>

        {/* Welcome Message for Non-Authenticated Users */}
        {!isAuthenticated && (
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <div className="bg-gradient-to-r from-flyverr-primary/10 to-flyverr-secondary/10 border border-flyverr-primary/20 rounded-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-flyverr-text dark:text-white mb-2">
                    Welcome to Flyverr! 🚀
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                    You're currently browsing our marketplace as a guest. Sign
                    up or sign in to access exclusive features, create your own
                    digital products, and start your resale journey!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => router.push("/signup")}
                      className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Get Started Free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/login")}
                      className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10 px-6 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="w-24 h-24 bg-flyverr-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-flyverr-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                type="text"
                placeholder="Search digital products, creators, or categories..."
                value={pendingFilters.searchTerm}
                onChange={(e) =>
                  setPendingFilters((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                  }))
                }
                className="pl-10 sm:pl-12 h-10 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-flyverr-primary dark:focus:border-flyverr-primary rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Search Button - Only show when there's search text */}
            {pendingFilters.searchTerm && (
              <Button
                onClick={() => {
                  setPendingFilters((prev) => ({
                    ...prev,
                    searchTerm: prev.searchTerm,
                  }));
                  applyFilters();
                }}
                className="h-10 sm:h-12 md:h-14 px-6 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white rounded-lg sm:rounded-xl font-medium"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            )}

            {/* Clear Filters Button - Only show when filters are active */}
            {(filters.search ||
              filters.featured ||
              filters.trending ||
              filters.recommended ||
              filters.hotDeals ||
              filters.stage ||
              filters.minPrice ||
              filters.maxPrice) && (
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="h-10 sm:h-12 md:h-14 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg sm:rounded-xl font-medium transition-all duration-200 hover:shadow-sm"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="hidden sm:inline">Clear All</span>
              </Button>
            )}

            {/* Filter Button */}
            <Button
              variant="outline"
              onClick={() => {
                // Reset pending filters to current applied filters when opening modal
                setPendingFilters({
                  searchTerm: filters.search || "",
                  selectedCategory: filters.trending
                    ? "trending"
                    : filters.featured
                    ? "featured"
                    : filters.recommended
                    ? "recommended"
                    : filters.hotDeals
                    ? "hot-deals"
                    : "all",
                  selectedStage: filters.stage,
                  showFeatured: filters.featured,
                  priceRange: {
                    min: filters.minPrice || 0,
                    max: filters.maxPrice || 0,
                  },
                  sortBy: filters.sortBy || "created_at",
                  sortOrder: filters.sortOrder || "desc",
                });
                setIsFilterModalOpen(true);
              }}
              className="h-10 sm:h-12 md:h-14 px-4 sm:px-6 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-flyverr-primary dark:hover:border-flyverr-primary hover:bg-flyverr-primary/5 rounded-lg sm:rounded-xl"
            >
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    (filters.trending && category.id === "trending") ||
                    (filters.featured && category.id === "featured") ||
                    (filters.recommended && category.id === "recommended") ||
                    (filters.hotDeals && category.id === "hot-deals") ||
                    (!filters.featured &&
                      !filters.trending &&
                      !filters.recommended &&
                      !filters.hotDeals &&
                      category.id === "all")
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-3 sm:px-4 md:px-6 py-1 sm:py-2 text-xs sm:text-sm md:text-base rounded-full flex items-center gap-2 ${
                    (filters.trending && category.id === "trending") ||
                    (filters.featured && category.id === "featured") ||
                    (filters.recommended && category.id === "recommended") ||
                    (filters.hotDeals && category.id === "hot-deals") ||
                    (!filters.featured &&
                      !filters.trending &&
                      !filters.recommended &&
                      !filters.hotDeals &&
                      category.id === "all")
                      ? "bg-flyverr-primary text-white hover:bg-flyverr-primary/90"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-flyverr-primary/5 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-flyverr-primary dark:hover:border-flyverr-primary"
                  }`}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8">
            {products.length > 0
              ? `Showing ${products.length} of ${totalProducts} digital products`
              : "No products found"}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <div className="w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-2">
                  <X className="w-3 h-3 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  {isValidationError(error)
                    ? "Validation Error"
                    : "Error Loading Products"}
                </h3>
              </div>
              <p className="text-red-700 dark:text-red-400 text-sm">
                {formatErrorMessage(error)}
              </p>
              {isValidationError(error) && (
                <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                  <p className="font-medium mb-1">
                    Please check the following:
                  </p>
                  <ul className="text-left list-disc list-inside space-y-1">
                    {getValidationErrors(error).map(
                      (err: string, index: number) => (
                        <li key={index}>{err}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
              <Button
                onClick={handleTryAgain}
                variant="outline"
                size="sm"
                className="mt-3 border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {loading
            ? // Show skeleton loading
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.length > 0
            ? products.map((product: MarketplaceProduct) => {
                const currentImageIndex = imageIndices[product.id] || 0;
                const currentImage = product.thumbnail_url;
                const imageState = imageStates[product.id] || {
                  loading: true,
                  error: false,
                  loaded: false,
                };
                const stage = resaleStages.find(
                  (s) => s.id === product.current_stage
                );

                return (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 overflow-hidden cursor-pointer rounded-lg shadow-md"
                    onClick={() => handleCardClick(product.id)}
                  >
                    <div className="relative bg-gray-100 dark:bg-gray-700">
                      {/* Image Container */}
                      <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-52 xl:h-56 overflow-hidden">
                        {/* Error State */}
                        {imageState.error && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 dark:text-gray-500 mb-2 flex items-center justify-center">
                              <svg
                                className="w-full h-full"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                              </svg>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              Image unavailable
                            </p>
                          </div>
                        )}

                        {/* Next.js Optimized Image */}
                        {!imageState.error && currentImage && (
                          <Image
                            src={currentImage}
                            alt={product.title}
                            fill
                            className="object-cover transition-all duration-300 group-hover:scale-110"
                            onLoad={() => handleImageLoad(product.id)}
                            onError={() => handleImageError(product.id)}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            priority={false}
                          />
                        )}
                      </div>

                      {/* Resale Stage Badge */}
                      {stage && (
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                          <Badge
                            className={`${stage.color} text-white text-xs px-2 py-1`}
                          >
                            Stage{" "}
                            {resaleStages.findIndex(
                              (s) => s.id === product.current_stage
                            ) + 1}
                            : {stage.name}
                          </Badge>
                        </div>
                      )}

                      {/* Special Badges */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1.5">
                        {product.featured && (
                          <Badge className="bg-flyverr-accent text-flyverr-text text-xs px-2 py-1">
                            <Crown className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Featured</span>
                            <span className="sm:hidden">FT</span>
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      {/* Title */}
                      <div className="mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg lg:text-xl mb-1 line-clamp-2 group-hover:text-flyverr-primary transition-colors duration-300">
                          {product.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Remaining Licenses */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                          <span className="text-gray-600 dark:text-gray-400">
                            Remaining:
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {product.remaining_licenses} of{" "}
                            {product.total_licenses}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                          <div
                            className="bg-flyverr-primary h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                (product.remaining_licenses /
                                  product.total_licenses) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Price and Action */}
                      <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white">
                            ${product.current_price}
                          </div>
                          {product.original_price !== product.current_price && (
                            <div className="text-sm text-gray-500 line-through">
                              ${product.original_price}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            : // No products found message
              !loading && (
                <div className="col-span-full text-center py-12">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    {useRecommended ? (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Nothing to show yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Browse a few products so we can personalize this
                          section for you.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          No products found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {filters.search
                            ? `No products match your search "${filters.search}"`
                            : filters.featured ||
                              filters.trending ||
                              filters.recommended ||
                              filters.hotDeals ||
                              filters.stage ||
                              filters.minPrice ||
                              filters.maxPrice
                            ? "No products match your current filters. Try adjusting your search criteria."
                            : "No products are currently available in this category."}
                        </p>
                      </>
                    )}
                    <Button
                      onClick={clearAllFilters}
                      variant="outline"
                      className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
        </div>

        {/* Call-to-Action for Non-Authenticated Users */}
        {!isAuthenticated && (
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <div className="bg-gradient-to-r from-flyverr-primary/5 to-flyverr-secondary/5 border border-flyverr-primary/10 rounded-xl p-6 sm:p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-flyverr-text dark:text-white mb-3">
                  Ready to Start Your Digital Journey?
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
                  Join thousands of creators and buyers who are already
                  profiting from digital product resales. Create your account
                  today and unlock exclusive marketplace features!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => router.push("/signup")}
                    className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Create Free Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/login")}
                    className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10 px-8 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    Sign In to Existing Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!useRecommended && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-flyverr-primary hover:bg-flyverr-primary/5"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-lg ${
                  currentPage === i + 1
                    ? "bg-flyverr-primary hover:bg-flyverr-primary/90"
                    : "hover:border-flyverr-primary hover:bg-flyverr-primary/5"
                }`}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-flyverr-primary hover:bg-flyverr-primary/5"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </Button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedCategory={pendingFilters.selectedCategory}
        onCategoryChange={(category) =>
          setPendingFilters((prev) => ({ ...prev, selectedCategory: category }))
        }
        selectedStage={pendingFilters.selectedStage}
        onStageChange={(stage) =>
          setPendingFilters((prev) => ({ ...prev, selectedStage: stage }))
        }
        showFeatured={pendingFilters.showFeatured}
        onFeaturedChange={(featured) =>
          setPendingFilters((prev) => ({ ...prev, showFeatured: featured }))
        }
        priceRange={pendingFilters.priceRange}
        onPriceRangeChange={(range) =>
          setPendingFilters((prev) => ({ ...prev, priceRange: range }))
        }
        sortBy={pendingFilters.sortBy}
        onSortByChange={(sortBy) =>
          setPendingFilters((prev) => ({ ...prev, sortBy }))
        }
        sortOrder={pendingFilters.sortOrder}
        onSortOrderChange={(sortOrder) =>
          setPendingFilters((prev) => ({ ...prev, sortOrder }))
        }
        onApply={applyFilters}
        onClearAll={clearFiltersAndCloseModal}
      />
    </div>
  );
}
