"use client";
import { AnimatedHero } from "@/components/AnimatedHero";

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
  Check,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";
import Image from "next/image";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import AddProuduct from "@/features/user/product/components/AddProuduct";

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

 

  const handleExploreMarketplace = () => {
    router.push("/marketplace");
  };

  // Add Product Modal state

  return (
    <ProtectedRoute requireAuth={true}>
      <main className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
          {/* Modern Geometric Background Pattern */}
          <div className="absolute inset-0">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:25px_25px] md:bg-[size:30px_30px] lg:bg-[size:35px_35px] xl:bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:bg-[size:20px_20px] dark:sm:bg-[size:25px_25px] dark:md:bg-[size:30px_30px] dark:lg:bg-[size:35px_35px] dark:xl:bg-[size:40px_40px]"></div>

            {/* Modern Floating Elements */}
            <div className="absolute top-8 sm:top-12 md:top-16 lg:top-20 xl:top-24 left-4 sm:left-6 md:left-8 lg:left-10 xl:left-12 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 bg-blue-500 rounded-full opacity-40 animate-pulse shadow-lg shadow-blue-200"></div>
            <div className="absolute top-12 sm:top-16 md:top-20 lg:top-24 xl:top-28 left-8 sm:left-12 md:left-16 lg:left-20 xl:left-24 w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5 bg-indigo-500 rounded-full opacity-50 shadow-lg shadow-indigo-200"></div>
            <div className="absolute top-16 sm:top-20 md:top-24 lg:top-28 xl:top-32 left-6 sm:left-10 md:left-12 lg:left-16 xl:left-20 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 bg-purple-500 rounded-full opacity-45 shadow-lg shadow-purple-200"></div>

            <div className="absolute top-10 sm:top-14 md:top-18 lg:top-22 xl:top-26 right-8 sm:right-12 md:right-16 lg:right-20 xl:right-24 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 bg-emerald-500 rounded-full opacity-40 animate-pulse delay-1000 shadow-lg shadow-emerald-200"></div>
            <div className="absolute top-14 sm:top-18 md:top-22 lg:top-26 xl:top-30 right-12 sm:right-16 md:right-20 lg:right-24 xl:right-28 w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5 bg-teal-500 rounded-full opacity-50 shadow-lg shadow-teal-200"></div>
            <div className="absolute top-18 sm:top-22 md:top-26 lg:top-30 xl:top-34 right-10 sm:right-14 md:right-18 lg:right-22 xl:right-26 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 bg-cyan-500 rounded-full opacity-45 shadow-lg shadow-cyan-200"></div>

            {/* Subtle Accent Lines */}
            <div className="absolute top-1/4 left-0 w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 h-0.5 sm:h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent dark:via-blue-800 shadow-sm shadow-blue-200"></div>
            <div className="absolute top-1/3 right-0 w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-0.5 sm:h-px bg-gradient-to-l from-transparent via-indigo-400 to-transparent dark:via-indigo-800 shadow-sm shadow-indigo-200"></div>

            {/* Modern Card-like Elements */}
            <div className="absolute top-1/2 left-2 sm:left-3 md:left-4 lg:left-6 xl:left-8 w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-32 lg:w-28 lg:h-36 xl:w-32 xl:h-40 bg-white/60 dark:bg-gray-800/40 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/40 dark:border-gray-700/20 shadow-lg shadow-gray-200/50 transform rotate-6 sm:rotate-8 md:rotate-10 lg:rotate-12 xl:rotate-15"></div>
            <div className="absolute bottom-1/3 right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-28 lg:w-24 lg:h-32 xl:w-28 xl:h-36 bg-white/50 dark:bg-gray-800/30 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/40 dark:border-gray-700/20 shadow-lg shadow-gray-200/50 transform -rotate-4 sm:-rotate-5 md:-rotate-6 lg:-rotate-8 xl:-rotate-10"></div>

            {/* Additional Light Mode Background Elements */}
            <div className="absolute top-1/3 left-1/4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-blue-50/30 dark:bg-blue-900/10 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute top-3/4 left-1/3 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 bg-purple-50/30 dark:bg-purple-900/10 rounded-full blur-3xl opacity-60"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28">
            {/* Centered Content Layout */}
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge - Modern and Appealing */}
              <div
                className={`inline-flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-3 md:py-4 lg:py-4 xl:py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-base font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 transform transition-all duration-700 hover:scale-105 hover:shadow-xl ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 bg-flyverr-primary rounded-full animate-pulse"></div>
                <span className="px-1 sm:px-2">
                  B2C & C2C Digital Resale Marketplace
                </span>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 bg-flyverr-primary rounded-full animate-pulse delay-1000"></div>
              </div>

              {/* Main Heading - Clean Typography */}
              <div
                className={`space-y-4 sm:space-y-6 mb-4 sm:mb-6 transform transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Profit From What You{" "}
                  <span className="relative">
                    <span className="relative z-10 text-flyverr-primary dark:text-flyverr-primary">
                      Love
                    </span>
                    <span className="absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 lg:-bottom-2.5 xl:-bottom-3 left-0 right-0 h-2 sm:h-2.5 md:h-3 lg:h-3.5 xl:h-4 bg-yellow-200 dark:bg-yellow-800/30 rounded-full transform -rotate-1"></span>
                  </span>
                </h1>

                {/* Subheadline - Clear and Concise */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto font-normal px-2 sm:px-4">
                  The marketplace for creators and traders building wealth in
                  the digital economy.
                  <span className="block mt-2 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-5 text-flyverr-primary dark:text-flyverr-primary font-semibold">
                    <span className="inline-block overflow-hidden">
                      <span className="typing-animation">
                        Create. Trade. Earn.
                      </span>
                    </span>
                  </span>
                </p>
              </div>

              {/* CTA Buttons - Clean and Contrasting */}
              <div
                className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 transform transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <Link href="/user/products">
                  <Button className="group relative px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-3 sm:py-4 md:py-4 lg:py-5 xl:py-6 bg-flyverr-primary hover:bg-flyverr-primary/90 dark:bg-flyverr-primary dark:hover:bg-flyverr-primary/90 text-white text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-semibold rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <Sparkles className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 mr-1.5 sm:mr-2 md:mr-2.5 lg:mr-3 xl:mr-4" />

                    <span className="relative z-10">Start Creating Today</span>
                  </Button>
                </Link>

                <Button
                  onClick={handleExploreMarketplace}
                  variant="outline"
                  className="group px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-3 sm:py-4 md:py-4 lg:py-5 xl:py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-2 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-flyverr-primary hover:text-flyverr-primary dark:hover:border-flyverr-primary dark:hover:text-flyverr-primary text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:bg-white dark:hover:bg-gray-800"
                >
                  <span className="relative z-10">
                    Find Profitable Products
                  </span>
                  <ArrowRight className="ml-1.5 sm:ml-2 md:ml-2.5 lg:ml-3 xl:ml-4 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Showcase Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <SectionHeader
              title="Buy It. Sell It. Watch It Grow."
              subtitle="Flyverr connects creators and buyers in a system where every trade can mean higher value. Limited supply, built-in royalties, and real opportunities for profit."
            />

            {/* Circular Flow Design */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
              {/* Left Side - Circular Flow Diagram */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]">
                  {/* Main Circle */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full border-2 sm:border-3 md:border-4 lg:border-4 xl:border-4 border-blue-200 dark:border-blue-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-flyverr-primary rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-5">
                        <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                          F
                        </span>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Flyverr
                      </p>
                      <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 dark:text-gray-400">
                        Platform
                      </p>
                    </div>
                  </div>

                  {/* Create Products Circle */}
                  <div className="absolute -top-2 sm:-top-3 md:-top-4 lg:-top-6 xl:-top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-green-100 dark:bg-green-900/20 rounded-full border-2 border-green-300 dark:border-green-700 flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                      📦
                    </span>
                  </div>

                  {/* Buy Licenses Circle */}
                  <div className="absolute top-1/2 -right-2 sm:-right-3 md:-right-4 lg:-right-6 xl:-right-8 transform translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-blue-100 dark:bg-blue-900/20 rounded-full border-2 border-blue-300 dark:border-blue-700 flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                      💰
                    </span>
                  </div>

                  {/* Claim Royalties Circle */}
                  <div className="absolute bottom-1/2 -right-2 sm:-right-3 md:-right-4 lg:-right-6 xl:-right-8 transform -translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-purple-100 dark:bg-purple-900/20 rounded-full border-2 border-purple-300 dark:border-purple-700 flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                      👑
                    </span>
                  </div>

                  {/* Payment Analytics Circle */}
                  <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 lg:-bottom-6 xl:-bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-orange-100 dark:bg-orange-900/20 rounded-full border-2 border-orange-300 dark:border-orange-700 flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                      📊
                    </span>
                  </div>

                  {/* Stripe Payments Circle */}
                  <div className="absolute top-1/2 -left-2 sm:-left-3 md:-left-4 lg:-left-6 xl:-left-8 transform -translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-indigo-100 dark:bg-indigo-900/20 rounded-full border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                      💳
                    </span>
                  </div>

                  {/* Flow Lines */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 320 320"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))" }}
                  >
                    {/* Create to Buy */}
                    <path
                      d="M 160 40 Q 200 60 240 160"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                      opacity="0.7"
                    />
                    {/* Buy to Royalties */}
                    <path
                      d="M 280 160 Q 280 200 280 200"
                      stroke="url(#gradient2)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                      opacity="0.7"
                      style={{ animationDelay: "0.5s" }}
                    />
                    {/* Royalties to Analytics */}
                    <path
                      d="M 240 200 Q 200 240 160 280"
                      stroke="url(#gradient3)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                      opacity="0.7"
                      style={{ animationDelay: "1s" }}
                    />
                    {/* Analytics to Stripe */}
                    <path
                      d="M 120 280 Q 80 240 40 160"
                      stroke="url(#gradient4)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                      opacity="0.7"
                      style={{ animationDelay: "1.5s" }}
                    />
                    {/* Stripe to Create */}
                    <path
                      d="M 40 160 Q 80 120 160 40"
                      stroke="url(#gradient5)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                      opacity="0.7"
                      style={{ animationDelay: "2s" }}
                    />

                    {/* Gradients */}
                    <defs>
                      <linearGradient
                        id="gradient1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                        <stop
                          offset="50%"
                          stopColor="#10B981"
                          stopOpacity="1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#10B981"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradient2"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                        <stop
                          offset="50%"
                          stopColor="#3B82F6"
                          stopOpacity="1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#3B82F6"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradient3"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                        <stop
                          offset="50%"
                          stopColor="#8B5CF6"
                          stopOpacity="1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#8B5CF6"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradient4"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
                        <stop
                          offset="50%"
                          stopColor="#F59E0B"
                          stopOpacity="1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#F59E0B"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradient5"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
                        <stop
                          offset="50%"
                          stopColor="#6366F1"
                          stopOpacity="1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#6366F1"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Right Side - Description */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-8">
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-5">
                    Complete Digital Product Ecosystem
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Flyverr provides a comprehensive platform where creators can
                    build, sell, and earn ongoing royalties from their digital
                    products.
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6">
                  {/* Create Products */}
                  <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-4 xl:space-x-5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        📦
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-4">
                        Create Products
                      </h4>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 dark:text-gray-400">
                        Upload digital products with ease. Set pricing,
                        licensing, and scarcity controls to maximize value.
                      </p>
                    </div>
                  </div>

                  {/* Buy Licenses */}
                  <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-4 xl:space-x-5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        💰
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-4">
                        Buy Licenses
                      </h4>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 dark:text-gray-400">
                        Purchase limited licenses for premium digital products.
                        Invest in appreciating assets with controlled scarcity.
                      </p>
                    </div>
                  </div>

                  {/* Claim Royalties */}
                  <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-4 xl:space-x-5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        👑
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-4">
                        Claim Royalties
                      </h4>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 dark:text-gray-400">
                        Earn ongoing royalties every time your products are
                        resold in the marketplace. Passive income from your
                        creativity.
                      </p>
                    </div>
                  </div>

                  {/* Payment Analytics */}
                  <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-4 xl:space-x-5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        📊
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-4">
                        Track Analytics
                      </h4>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 dark:text-gray-400">
                        Monitor sales, revenue, and royalty earnings with
                        detailed analytics and insights to optimize your
                        strategy.
                      </p>
                    </div>
                  </div>

                  {/* Stripe Payments */}
                  <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-4 xl:space-x-5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        💳
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-4">
                        Secure Payments
                      </h4>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 dark:text-gray-400">
                        Stripe-powered payments with instant payouts and
                        automated royalty distribution for seamless
                        transactions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 md:pt-4 lg:pt-4 xl:pt-5">
                  <Link
                    href="/user/products"
                    className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white font-semibold py-2 sm:py-3 md:py-3 lg:py-4 xl:py-5 px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 rounded-xl transition-colors text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl group relative"
                  >
                    Start Creating Today
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof & Trust Metrics Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gray-50 dark:bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            {/* Section Header */}
            <SectionHeader
              title="Trusted by Thousands of Creators"
              subtitle="Join the community that's already building wealth in the digital economy"
            />

            {/* Cards Grid - Responsive Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
              {/* Left Card - Platform Features */}
              <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  What's in Your Creator Kit?
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      Digital Product Upload
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      Royalty Tracking
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      Resale Analytics
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      Automated Payments
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Middle Card - Trading Volume */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-100 dark:bg-blue-900/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    2,000+
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                    trades completed this month
                  </div>
                </div>
              </div>

              {/* Top Right Card - Urgency */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-orange-100 dark:bg-orange-900/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    ⚡ Selling Out Fast!
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                    New listings sell out in{" "}
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      under 48 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Middle Card - Royalties */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-100 dark:bg-purple-900/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    $500K+
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                    in creator royalties paid
                  </div>
                </div>
              </div>

              {/* Bottom Right Card - Revenue Breakdown */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
                  Revenue Breakdown
                </h4>
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Digital Products
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                      65%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Resale Royalties
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                      35%
                    </span>
                  </div>
                </div>
                {/* Simple Visual Chart */}
                <div className="flex h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: "65%" }}
                  ></div>
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            {/* Section Header */}
            <SectionHeader
              title="Why Choose Flyverr?"
              subtitle="The only digital marketplace where products appreciate in value, creators earn ongoing royalties, and buyers profit from limited supply scarcity."
            />

            {/* Two Column Layout - Content and Image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
              {/* Left Column - Benefits List */}
              <div className="space-y-6 sm:space-y-8">
                {/* Benefit 1 */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Limited Digital Products
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Sell limited digital products like ebooks, courses,
                    templates, and software with controlled scarcity that drives
                    value appreciation.
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Resale Ecosystem
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Once original licenses sell out, products become eligible
                    for resale at higher prices. Creators earn ongoing royalties
                    from every resale.
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Investment Protection
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Optional insurance protects your resale investment. Get
                    refunded if you can&apos;t resell within 30 days.
                  </p>
                </div>

                {/* Benefit 4 */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Verified Reviews
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Trust authentic reviews from verified purchasers. 1-5 star
                    rating system with admin moderation ensures quality.
                  </p>
                </div>

                {/* Benefit 5 */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Secure Platform
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Stripe-powered payments, instant license delivery, and
                    secure transaction processing for all digital assets.
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
                    className="w-full h-auto rounded-xl sm:rounded-2xl shadow-lg"
                  />

                  {/* Overlay Card */}
                  <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg max-w-40 sm:max-w-48">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
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
                <div className="mt-4 sm:mt-6 text-center">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    Flyverr Platform
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Where digital assets grow in value
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
          </div>
        </section>

        {/* Call to Action Section - Big Push */}
        <section className="relative overflow-hidden bg-flyverr-primary dark:bg-flyverr-primary">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.15)_75%)] bg-[length:20px_20px] opacity-30"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-black/20"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-1500"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14 md:py-18 lg:py-20 xl:py-24">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main Headline */}
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                Join hundreds of creators building{" "}
                <span className="relative">
                  <span className="relative z-10">real income</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-yellow-300 dark:bg-yellow-200 rounded-full transform -rotate-1 opacity-100"></span>
                </span>
              </h2>

              {/* Subheadline */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
                Start your journey to financial freedom. Upload your first
                product in minutes and join the digital economy revolution.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
                {/* Primary CTA Button */}
                <Link href="/user/products">
                  <Button className="group relative px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 xl:py-3.5 bg-white hover:bg-gray-50 text-flyverr-primary font-bold text-xs sm:text-sm md:text-base lg:text-lg rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-1.5" />
                      Start Earning Today
                    </span>
                  </Button>
                </Link>

                {/* Secondary CTA Button */}
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 text-white/90 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-200" />
                  <span>No upfront costs</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-200" />
                  <span>Instant payouts</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-200" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Company Info */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-flyverr-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-lg">F</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold">Flyverr</span>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  The revolutionary digital marketplace where creators thrive
                  and investors profit from appreciating digital assets.
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Homepage
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/marketplace"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      FAQ / Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>

              {/* For Creators */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold">For Creators</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Start Creating
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Creator Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Royalty System
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Creator Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Success Stories
                    </Link>
                  </li>
                </ul>
              </div>

              {/* For Investors */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold">For Investors</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Investment Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Resale Insurance
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Portfolio Tracking
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Market Analytics
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 pt-6 sm:pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                {/* Copyright */}
                <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                  © 2024 Flyverr. All rights reserved. Digital marketplace for
                  appreciating assets.
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
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
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
                <div className="max-w-md mx-auto text-center">
                  <h4 className="text-base sm:text-lg font-semibold mb-2">Stay Updated</h4>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4">
                    Get the latest updates on new products, market trends, and
                    investment opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                    />
                    <Button className="px-4 sm:px-6 py-2 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </ProtectedRoute>
  );
}
