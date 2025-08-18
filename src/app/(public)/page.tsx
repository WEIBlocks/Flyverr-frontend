"use client";
import { AnimatedHero } from "@/components/AnimatedHero";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  Star,
  Sparkles,
  Download,
  DollarSign,
  Heart,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import AddProductModal, { NewProduct } from "@/components/AddProductModal";

/**
 * Home Page - Protected Route
 * This page is only accessible to authenticated users.
 * Non-authenticated users are redirected to /marketplace
 */
export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Handle reset password redirects from email links
  useEffect(() => {
    // Check if there's an access_token in the URL hash (from email reset link)
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const searchParams = new URLSearchParams(window.location.search);

      // Check for access_token in hash (most common for Supabase)
      if (hash && hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");

        if (accessToken) {
          console.log(
            "Redirecting to reset password page with token from hash"
          );
          router.push(`/reset-password?access_token=${accessToken}`);
          return;
        }
      }

      // Check for access_token in query params (fallback)
      const accessTokenFromQuery = searchParams.get("access_token");
      if (accessTokenFromQuery) {
        console.log("Redirecting to reset password page with token from query");
        router.push(`/reset-password?access_token=${accessTokenFromQuery}`);
        return;
      }

      // Check for type=recovery in hash (Supabase recovery links)
      if (hash && hash.includes("type=recovery")) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");

        if (accessToken) {
          console.log("Redirecting to reset password page with recovery token");
          router.push(`/reset-password?access_token=${accessToken}`);
          return;
        }
      }
    }
  }, [router]);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    toast.success("Welcome to Flyverr! Let's start your digital journey!");
  };

  const handleExploreMarketplace = () => {
    router.push("/marketplace");
  };

  // Add Product Modal state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleAddProduct = (product: NewProduct) => {
    console.log("New product from home page:", product);
    toast.success(
      "Product submitted for review! You'll be notified once it's approved."
    );
    setIsAddProductModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-72 lg:h-72 xl:w-72 xl:h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-96 xl:h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-80 xl:h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 lg:pt-20 xl:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-32 xl:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-12 xl:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-8 xl:space-y-8">
              {/* Badge */}
              <div
                className={`inline-flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 bg-flyverr-primary text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm font-medium rounded-full shadow-lg transform transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4" />
                <span className="text-center">
                  B2C & C2C Digital Resale Marketplace
                </span>
              </div>

              {/* Main Heading */}
              <div
                className={`space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-6 xl:space-y-6 transform transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-flyverr-text leading-tight">
                  Products That
                  <span className="block text-flyverr-primary">
                    Grow in Value
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Creators list limited digital products, buyers use or resell
                  for profit. The only marketplace with a performance-driven
                  resale system in the creator economy.
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-4 transform transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <Button
                  onClick={handleExploreMarketplace}
                  variant="outline"
                  className="px-6 py-3 sm:px-8 sm:py-4 md:px-8 md:py-4 lg:px-8 lg:py-4 xl:px-8 xl:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-flyverr-primary hover:text-flyverr-primary dark:hover:border-flyverr-primary dark:hover:text-flyverr-primary text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Explore Marketplace
                </Button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div
              className={`relative transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative">
                {/* Main Product Showcase */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-8 xl:p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4">
                    {/* Product Card 1 */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 dark:border dark:border-blue-800/50 rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-4 xl:p-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center mb-2 sm:mb-3 md:mb-3 lg:mb-3 xl:mb-3">
                        <span className="text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                          📚
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm mb-1">
                        Digital eBooks
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        Knowledge & Learning
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-1 py-1 sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-2 lg:py-1 xl:px-2 xl:py-1 rounded-full">
                          Limited Supply
                        </span>
                      </div>
                    </div>

                    {/* Product Card 2 */}
                    <div className="bg-purple-50 dark:bg-purple-900/30 dark:border dark:border-purple-800/50 rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-4 xl:p-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center mb-2 sm:mb-3 md:mb-3 lg:mb-3 xl:mb-3">
                        <span className="text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                          🎓
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm mb-1">
                        Online Courses
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        Expert Knowledge
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-1 py-1 sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-2 lg:py-1 xl:px-2 xl:py-1 rounded-full">
                          Premium Content
                        </span>
                      </div>
                    </div>

                    {/* Product Card 3 */}
                    <div className="bg-green-50 dark:bg-green-900/30 dark:border dark:border-green-800/50 rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-4 xl:p-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center mb-2 sm:mb-3 md:mb-3 lg:mb-3 xl:mb-3">
                        <span className="text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                          🎨
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm mb-1">
                        Design Templates
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        Creative Assets
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-1 py-1 sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-2 lg:py-1 xl:px-2 xl:py-1 rounded-full">
                          Professional
                        </span>
                      </div>
                    </div>

                    {/* Product Card 4 */}
                    <div className="bg-orange-50 dark:bg-orange-900/30 dark:border dark:border-orange-800/50 rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-4 xl:p-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8 bg-orange-600 dark:bg-orange-500 rounded-lg flex items-center justify-center mb-2 sm:mb-3 md:mb-3 lg:mb-3 xl:mb-3">
                        <span className="text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                          🎵
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm mb-1">
                        Digital Music
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        Audio Content
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/50 px-1 py-1 sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-2 lg:py-1 xl:px-2 xl:py-1 rounded-full">
                          Exclusive
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 lg:-top-4 lg:-right-4 xl:-top-4 xl:-right-4 bg-green-500 dark:bg-green-600 text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 rounded-full text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm font-semibold shadow-lg">
                  Appreciating Value
                </div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 lg:-bottom-4 lg:-left-4 xl:-bottom-4 xl:-left-4 bg-blue-500 dark:bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 rounded-full text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm font-semibold shadow-lg">
                  Creator Royalties
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Hero Component */}
      <AnimatedHero />

      {/* Value Proposition Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-flyverr-text dark:text-white mb-4">
              Digital Assets That Grow in Value
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Unlike traditional marketplaces, our limited digital products
              increase in value over time. Creators earn royalties on every
              resale, while buyers profit from appreciating assets.
            </p>
          </div>

          {/* Two Column Layout - Creators vs Buyers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* For Creators */}
            <div
              className={`space-y-6 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-flyverr-primary rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  For Creators
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      List Limited Digital Products
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Upload eBooks, courses, templates, and more with
                      controlled scarcity
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Earn Royalties on Resales
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get paid every time your product is resold as its value
                      increases
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Build Your Brand
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Grow your audience and establish yourself as a premium
                      creator
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-8 py-3 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Creating Today
              </Button>
            </div>

            {/* For Buyers/Investors */}
            <div
              className={`space-y-6 transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-flyverr-secondary rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  For Buyers & Investors
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Invest in Appreciating Assets
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Purchase limited digital products that increase in value
                      over time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Profit from Resales
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sell your digital assets when their value appreciates
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Access Premium Content
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get exclusive digital products from top creators
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleExploreMarketplace}
                className="w-full sm:w-auto px-8 py-3 bg-flyverr-secondary hover:bg-flyverr-secondary/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Investing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-flyverr-text dark:text-white mb-4">
              Why Choose Flyverr?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The only digital marketplace where products appreciate in value,
              creators earn ongoing royalties, and buyers profit from limited
              supply scarcity.
            </p>
          </div>

          {/* Two Column Layout - Content and Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Benefits List */}
            <div className="space-y-8">
              {/* Benefit 1 */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Limited Digital Products
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sell limited digital products like ebooks, courses, templates,
                  and software with controlled scarcity that drives value
                  appreciation.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Resale Ecosystem
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Once original licenses sell out, products become eligible for
                  resale at higher prices. Creators earn ongoing royalties from
                  every resale.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Investment Protection
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optional insurance protects your resale investment. Get
                  refunded if you can&apos;t resell within 30 days.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Verified Reviews
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Trust authentic reviews from verified purchasers. 1-5 star
                  rating system with admin moderation ensures quality.
                </p>
              </div>

              {/* Benefit 5 */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Secure Platform
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Stripe-powered payments, instant license delivery, and secure
                  transaction processing for all digital assets.
                </p>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=600&fit=crop"
                  alt="Digital Marketplace"
                  width={500}
                  height={600}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />

                {/* Overlay Card */}
                <div className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg max-w-48">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Digital assets that appreciate in value
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Limited supply model
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Info Below Image */}
              <div className="mt-6 text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Flyverr Platform
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Where digital assets grow in value
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-flyverr-primary/5 dark:bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Digital Journey?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join thousands of creators and investors who are already
                profiting from appreciating digital assets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="group px-6 py-3 sm:px-8 sm:py-4 md:px-8 md:py-4 lg:px-8 lg:py-4 xl:px-8 xl:py-4 bg-flyverr-secondary hover:bg-flyverr-secondary/90 text-white  font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="mr-2 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5" />
                  Add Product
                </Button>
                <Button
                  onClick={handleExploreMarketplace}
                  variant="outline"
                  className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-flyverr-primary hover:text-flyverr-primary dark:hover:border-flyverr-primary dark:hover:text-flyverr-primary font-semibold rounded-xl transition-all duration-300"
                >
                  Explore Marketplace
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-flyverr-text dark:text-white mb-4">
              Featured Digital Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover trending digital assets at different lifecycle stages
            </p>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Product 1 - Newboom Stage */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              {/* Product Image */}
              <div className="relative h-56 bg-blue-500 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
                  alt="Web Development Course"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Stage Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Stage 1: Newboom
                  </span>
                </div>

                {/* Hot Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    HOT
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-gray-100 rounded-full w-10 h-10 p-0"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                    Digital Course
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1 font-medium">
                      4.8
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  Complete Web Development Masterclass
                </h3>

                {/* Creator */}
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                    CP
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    CodeMaster Pro
                  </span>
                </div>

                {/* License Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Licenses Available
                    </span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      50 of 100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    $299
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Product 2 - Blossom Stage */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              {/* Product Image */}
              <div className="relative h-56 bg-pink-500 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
                  alt="UI/UX Design System"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Stage Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Stage 2: Blossom
                  </span>
                </div>

                {/* Sale Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    SALE
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-gray-100 rounded-full w-10 h-10 p-0"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                    Design System
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1 font-medium">
                      4.9
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  Premium UI/UX Design System
                </h3>

                {/* Creator */}
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                    DS
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    DesignStudio
                  </span>
                </div>

                {/* License Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Licenses Available
                    </span>
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      25 of 75
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full"
                      style={{ width: "33%" }}
                    ></div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      $149
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      $199
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Product 3 - Evergreen Stage */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              {/* Product Image */}
              <div className="relative h-56 bg-emerald-500 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
                  alt="Digital Marketing Guide"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Stage Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Stage 3: Evergreen
                  </span>
                </div>

                {/* Trending Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    TRENDING
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-gray-100 rounded-full w-10 h-10 p-0"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                    Digital Guide
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1 font-medium">
                      4.7
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  Digital Marketing Strategy Guide
                </h3>

                {/* Creator */}
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                    MG
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    MarketingGuru
                  </span>
                </div>

                {/* License Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Licenses Available
                    </span>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      15 of 60
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    $199
                  </div>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              onClick={handleExploreMarketplace}
              className="px-8 py-3 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
            >
              Explore All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-flyverr-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold">Flyverr</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The revolutionary digital marketplace where creators thrive and
                investors profit from appreciating digital assets.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marketplace"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ / Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Creators */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">For Creators</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Start Creating
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Creator Guidelines
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Royalty System
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Creator Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Investors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">For Investors</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Investment Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Resale Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Portfolio Tracking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Market Analytics
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                © 2024 Flyverr. All rights reserved. Digital marketplace for
                appreciating assets.
              </div>

              {/* Legal Links */}
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="max-w-md mx-auto text-center">
                <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Get the latest updates on new products, market trends, and
                  investment opportunities.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <Button className="px-6 py-2 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white font-semibold rounded-lg transition-all duration-300">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      
       
      />
    </main>
  );
}
