"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/contexts/AuthContext";

/**
 * Home Page - Public Route
 * This page is accessible to all users (authenticated and non-authenticated).
 * Shows different content based on authentication status.
 */
export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  // Testimonials data
  const testimonials = [
    {
      text: "Flyverr has completely transformed how I sell my digital products. The built-in royalty system means I continue earning even after the initial sale. It's a game-changer for creators!",
      author: "Sarah",
      role: "Digital Artist",
    },
    {
      text: "The marketplace is intuitive and the community is incredibly supportive. I've connected with so many other creators and buyers. The analytics dashboard helps me understand what works best.",
      author: "Michael",
      role: "Content Creator",
    },
    {
      text: "I like how easy it is to browse through different categories on the site, and the preview feature before buying is really helpful. The checkout process was smooth too. However, the search filter feels a bit limited",
      author: "Ruby",
      role: "organization",
    },
    {
      text: "As a reseller, Flyverr's platform makes it easy to find high-quality products and reach new audiences. The limited supply feature creates real value, and the profit opportunities are genuine.",
      author: "Alex",
      role: "Entrepreneur",
    },
  ];

  // FAQ and Guide data
  const faqData = [
    {
      id: "faq-1",
      question: "Is my information secure",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect your personal and payment information. All data is encrypted in transit and at rest.",
    },
    {
      id: "faq-2",
      question: "Is it free to join Flyverr?",
      answer:
        "Yes, creating an account and browsing our marketplace is completely free. We only charge fees when you make a purchase or sell a product.",
    },
    {
      id: "faq-3",
      question: "Can I cancel an order?",
      answer:
        "You can cancel an order within 24 hours of purchase if the seller hasn't started working on it yet. Contact our support team for assistance.",
    },
    {
      id: "faq-4",
      question: "What if I'm not satisfied with the work?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, contact us within 30 days for a full refund.",
    },
  ];

  const guideData = [
    {
      id: "guide-1",
      question: "How do I create an account",
      answer:
        "Click the 'Sign Up' button in the top right corner, fill in your details, verify your email, and you're ready to start using Flyverr!",
    },
    {
      id: "guide-2",
      question: "How do I hire a seller?",
      answer:
        "Browse our marketplace, find a product you like, read reviews, and click 'Buy Now'. Complete the checkout process and the seller will deliver your product.",
    },
    {
      id: "guide-3",
      question: "How are payments handled?",
      answer:
        "We use secure payment processing through Stripe. Your payment is held in escrow until you confirm receipt of your order, ensuring both buyer and seller protection.",
    },
    {
      id: "guide-4",
      question: "How do I become a seller?",
      answer:
        "Create an account, go to your dashboard, click 'Add Product', upload your digital files, set your price, and start selling to our global community!",
    },
  ];

  // Toggle expand/collapse function
  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Handle reset password redirects from email links
  // useEffect(() => {
  //   // Check if there's an access_token in the URL hash (from email reset link)
  //   if (typeof window !== "undefined") {
  //     const hash = window.location.hash;
  //     const searchParams = new URLSearchParams(window.location.search);

  //     // Check for access_token in hash (most common for Supabase)
  //     if (hash && hash.includes("access_token")) {
  //       const params = new URLSearchParams(hash.substring(1));
  //       const accessToken = params.get("access_token");

  //       if (accessToken) {
  //         console.log(
  //           "Redirecting to reset password page with token from hash"
  //         );
  //         router.push(`/reset-password?access_token=${accessToken}`);
  //         return;
  //       }
  //     }

  //     // Check for access_token in query params (fallback)
  //     const accessTokenFromQuery = searchParams.get("access_token");
  //     if (accessTokenFromQuery) {
  //       console.log("Redirecting to reset password page with token from query");
  //       router.push(`/reset-password?access_token=${accessTokenFromQuery}`);
  //       return;
  //     }

  //     // Check for type=recovery in hash (Supabase recovery links)
  //     if (hash && hash.includes("type=recovery")) {
  //       const params = new URLSearchParams(hash.substring(1));
  //       const accessToken = params.get("access_token");

  //       if (accessToken) {
  //         console.log("Redirecting to reset password page with recovery token");
  //         router.push(`/reset-password?access_token=${accessToken}`);
  //         return;
  //       }
  //     }
  //   }
  // }, [router]);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleExploreMarketplace = () => {
    router.push("/marketplace");
  };

  // Add Product Modal state

  return (
    <main className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1A1A1A] dark:bg-[#1A1A1A] h-[calc(100vh-4rem)] sm:h-[calc(100vh-4.5rem)] lg:h-[calc(70vh)]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-100"
            priority
          />
        </div>

        {/* Main Content Container */}
        <div className="relative h-full flex flex-col">
          {/* Content Area */}
          <div className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 xl:gap-16 items-center">
                {/* Left Side - Text Content */}
                <div className="text-left md:text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 order-2 md:order-1 lg:order-1">
                  {/* Main Heading */}
                  <div
                    className={`transform transition-all duration-1000 delay-200 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-white leading-tight font-normal">
                      <span className="font-bold">Profit</span> From What You
                      <br />
                      <span className="font-bold">Love</span>
                    </h1>
                  </div>

                  {/* Subheading */}
                  <div
                    className={`transform transition-all duration-1000 delay-400 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <p className="text-base sm:text-lg md:text-xl lg:text-xl text-[#CCCCCC] leading-relaxed max-w-xl">
                      The marketplace for creators and traders building wealth
                      in the digital economy.
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div
                    className={`flex flex-col sm:flex-row md:justify-center lg:justify-start gap-4 lg:gap-4 transform transition-all duration-1000 delay-600 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    {isAuthenticated ? (
                      <Link href="/user/products">
                        <Button className="group relative px-8 py-4 bg-white hover:bg-gray-50 text-[#1A1A1A] text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden w-full sm:w-auto">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Get Started
                          </span>
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/signup">
                        <Button className="group relative px-8 py-4 bg-white hover:bg-gray-50 text-[#1A1A1A] text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden w-full sm:w-auto">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Get Started
                          </span>
                        </Button>
                      </Link>
                    )}

                    <Button
                      onClick={handleExploreMarketplace}
                      variant="outline"
                      className="group px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] text-base font-semibold rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Explore products
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Right Side - 3D Illustration */}
                <div className="relative flex justify-center md:justify-center lg:justify-end order-3 md:order-2 lg:order-2 flex-1">
                  <div
                    className={`w-full transform transition-all duration-1000 delay-1000 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <Image
                      src="/Bag.png"
                      alt="3D Briefcase with Shield and Coins"
                      width={1200}
                      height={1200}
                      className="w-full md:max-w-md lg:max-w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tagline - Absolute Bottom Center */}
          <div className="absolute bottom-8 lg:bottom-12 left-0 right-0 flex justify-center">
            <div
              className={`transform transition-all duration-1000 delay-800 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <p className=" text-[#CCCCCC] text-sm sm:text-base md:text-lg text-center">
                <span className="font-bold">Create.</span>
                <span className="mx-4 sm:mx-6 md:mx-8"></span>
                <span className="font-bold">Trade.</span>
                <span className="mx-4 sm:mx-6 md:mx-8"></span>
                <span className="font-bold">Earn.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Thousands of Creators Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
            {/* Left Side - Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Trusted by Thousands of Creators
              </h2>
            </div>

            {/* Right Side - Description */}
            <div>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                We provide a trusted marketplace designed for creators, buyers,
                and resellers. Our platform focuses on quality, fairness, and
                long-term growth for everyone
              </p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 lg:mt-16">
            {/* Card 1 - Trust & Security */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-6">
                <svg
                  width="65"
                  height="58"
                  viewBox="0 0 65 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    opacity="0.1"
                    cx="32.5925"
                    cy="29"
                    rx="32.2346"
                    ry="29"
                    fill="black"
                  />
                  <path
                    d="M31.4813 20.5L39.3547 16.25L47.2281 20.5V37.5L39.3547 41.75L23.6079 33.25V24.75L39.3547 33.25V24.75L31.4813 20.5Z"
                    fill="black"
                  />
                  <path
                    opacity="0.4"
                    d="M31.4812 37.5L23.6078 41.75L15.7344 37.5V20.5L23.6078 16.25L39.3546 24.75V33.25L23.6078 24.75V33.25L31.4812 37.5Z"
                    fill="black"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Trust & Security
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Ensures safe transactions, protecting both creators and buyers
              </p>
            </div>

            {/* Card 2 - Analytics & Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-6">
                <svg
                  width="65"
                  height="58"
                  viewBox="0 0 65 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    opacity="0.1"
                    cx="32.5925"
                    cy="29"
                    rx="32.2346"
                    ry="29"
                    fill="black"
                  />
                  <path
                    d="M31.4813 20.5L39.3547 16.25L47.2281 20.5V37.5L39.3547 41.75L23.6079 33.25V24.75L39.3547 33.25V24.75L31.4813 20.5Z"
                    fill="black"
                  />
                  <path
                    opacity="0.4"
                    d="M31.4812 37.5L23.6078 41.75L15.7344 37.5V20.5L23.6078 16.25L39.3546 24.75V33.25L23.6078 24.75V33.25L31.4812 37.5Z"
                    fill="black"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Analytics & Insights
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Data on sales, trends, and buyer behavior to guide
                decision-making.
              </p>
            </div>

            {/* Card 3 - Community & Networking */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-6">
                <svg
                  width="65"
                  height="58"
                  viewBox="0 0 65 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    opacity="0.1"
                    cx="32.5925"
                    cy="29"
                    rx="32.2346"
                    ry="29"
                    fill="black"
                  />
                  <path
                    d="M31.4813 20.5L39.3547 16.25L47.2281 20.5V37.5L39.3547 41.75L23.6079 33.25V24.75L39.3547 33.25V24.75L31.4813 20.5Z"
                    fill="black"
                  />
                  <path
                    opacity="0.4"
                    d="M31.4812 37.5L23.6078 41.75L15.7344 37.5V20.5L23.6078 16.25L39.3546 24.75V33.25L23.6078 24.75V33.25L31.4812 37.5Z"
                    fill="black"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Community & Networking
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                How creators and buyers engage socially to build loyalty and
                long-term relationships
              </p>
            </div>

            {/* Card 4 - Sustainability */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-6">
                <svg
                  width="65"
                  height="58"
                  viewBox="0 0 65 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    opacity="0.1"
                    cx="32.5925"
                    cy="29"
                    rx="32.2346"
                    ry="29"
                    fill="black"
                  />
                  <path
                    d="M31.4813 20.5L39.3547 16.25L47.2281 20.5V37.5L39.3547 41.75L23.6079 33.25V24.75L39.3547 33.25V24.75L31.4813 20.5Z"
                    fill="black"
                  />
                  <path
                    opacity="0.4"
                    d="M31.4812 37.5L23.6078 41.75L15.7344 37.5V20.5L23.6078 16.25L39.3546 24.75V33.25L23.6078 24.75V33.25L31.4812 37.5Z"
                    fill="black"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Sustainability
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Long-term balance between value creation, fair pay, and
                marketplace health
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flyverr Ecosystem Section */}
      <section className="relative  bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Background World Map - Positioned 70% right, 30% left */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="/world-map-BG.png"
              alt="World Map Background"
              fill
              className="object-cover object-[10%_center]"
            />
          </div>
          {/* Top Section - Title and Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* Left Side - Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Flyverr Ecosystem
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Complete Digital Product Ecosystem
              </p>
            </div>

            {/* Right Side - Description */}
            <div>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Flyverr connects creators and buyers in a system where every
                trade can mean higher value. Limited supply, built-in royalties,
                and real opportunities for profit.
              </p>
            </div>
          </div>

          {/* Bottom Section - Feature Cards and World Image */}
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-start">
            {/* Left Side - Feature Cards */}
            <div className="space-y-4 order-2 lg:order-1">
              {/* Feature Cards List */}
              <div className="space-y-4">
                {/* Creator Card */}
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                    <svg
                      width="57"
                      height="45"
                      viewBox="0 0 57 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="57" height="45" rx="14" fill="#E5E5E5" />
                      <path
                        d="M28.6499 29.85C28.2399 29.85 27.8999 29.51 27.8999 29.1V27C27.8999 26.59 28.2399 26.25 28.6499 26.25C29.0599 26.25 29.3999 26.59 29.3999 27V29.1C29.3999 29.51 29.0599 29.85 28.6499 29.85Z"
                        fill="#292D32"
                      />
                      <path
                        d="M34.3999 33.25H22.8999V31.5C22.8999 29.98 24.1299 28.75 25.6499 28.75H31.6499C33.1699 28.75 34.3999 29.98 34.3999 31.5V33.25ZM24.3999 31.75H32.8999V31.5C32.8999 30.81 32.3399 30.25 31.6499 30.25H25.6499C24.9599 30.25 24.3999 30.81 24.3999 31.5V31.75V31.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M34.6499 33.25H22.6499C22.2399 33.25 21.8999 32.91 21.8999 32.5C21.8999 32.09 22.2399 31.75 22.6499 31.75H34.6499C35.0599 31.75 35.3999 32.09 35.3999 32.5C35.3999 32.91 35.0599 33.25 34.6499 33.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M34.9302 22.9401C34.7202 22.9401 34.5102 22.8501 34.3602 22.6801C34.1702 22.4601 34.1202 22.1501 34.2402 21.8901C34.5802 21.1101 34.7502 20.2801 34.7502 19.4101V16.4101C34.7502 16.0601 34.6902 15.7201 34.5702 15.3601C34.5602 15.3301 34.5502 15.2901 34.5402 15.2501C34.5102 15.1001 34.5002 14.9501 34.5002 14.8101C34.5002 14.4001 34.8402 14.0601 35.2502 14.0601H35.8502C37.6402 14.0601 39.1002 15.5601 39.1002 17.4101C39.1002 18.9401 38.4702 20.4501 37.3802 21.5401C37.3602 21.5601 37.3002 21.6101 37.2902 21.6201C36.7002 22.1101 36.0302 22.6601 35.1302 22.9101C35.0602 22.9301 35.0002 22.9401 34.9302 22.9401ZM36.1802 15.5901C36.2302 15.8601 36.2502 16.1401 36.2502 16.4101V19.4101C36.2502 19.8201 36.2202 20.2101 36.1602 20.6101C36.2202 20.5601 36.2702 20.5201 36.3302 20.4701C37.1302 19.6701 37.6002 18.5501 37.6002 17.4101C37.6002 16.5101 36.9902 15.7501 36.1802 15.5901Z"
                        fill="#292D32"
                      />
                      <path
                        d="M22.0799 22.9001C21.9999 22.9001 21.9299 22.8901 21.8499 22.8601C21.0299 22.6001 20.2599 22.1201 19.6199 21.4801C18.4699 20.2101 17.8999 18.8201 17.8999 17.3501C17.8999 15.5301 19.3299 14.1001 21.1499 14.1001H21.7999C22.0499 14.1001 22.2899 14.2301 22.4299 14.4401C22.5699 14.6501 22.5899 14.9201 22.4899 15.1501C22.3299 15.5101 22.2499 15.9201 22.2499 16.3501V19.3501C22.2499 20.2101 22.4199 21.0501 22.7699 21.8501C22.8899 22.1201 22.8299 22.4301 22.6399 22.6501C22.4899 22.8101 22.2899 22.9001 22.0799 22.9001ZM20.7999 15.6301C19.9899 15.7901 19.3999 16.4901 19.3999 17.3501C19.3999 18.4401 19.8399 19.4901 20.7099 20.4501C20.7499 20.5001 20.7999 20.5401 20.8499 20.5801C20.7799 20.1701 20.7499 19.7601 20.7499 19.3501V16.3501C20.7499 16.1101 20.7699 15.8701 20.7999 15.6301Z"
                        fill="#292D32"
                      />
                      <path
                        d="M28.5 27.25C24.23 27.25 20.75 23.77 20.75 19.5V16.5C20.75 13.88 22.88 11.75 25.5 11.75H31.5C34.12 11.75 36.25 13.88 36.25 16.5V19.5C36.25 23.77 32.77 27.25 28.5 27.25ZM25.5 13.25C23.71 13.25 22.25 14.71 22.25 16.5V19.5C22.25 22.95 25.05 25.75 28.5 25.75C31.95 25.75 34.75 22.95 34.75 19.5V16.5C34.75 14.71 33.29 13.25 31.5 13.25H25.5Z"
                        fill="#292D32"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Creator
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Produce digital assets and earn from sales and royalties.
                    </p>
                  </div>
                </div>

                {/* Buyers Card */}
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                    <svg
                      width="57"
                      height="45"
                      viewBox="0 0 57 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="57" height="45" rx="14" fill="#E5E5E5" />
                      <path
                        d="M29.55 26.75H27.67C26.34 26.75 25.25 25.63 25.25 24.25C25.25 23.84 25.59 23.5 26 23.5C26.41 23.5 26.75 23.84 26.75 24.25C26.75 24.8 27.16 25.25 27.67 25.25H29.55C29.94 25.25 30.25 24.9 30.25 24.47C30.25 23.93 30.1 23.85 29.76 23.73L26.75 22.68C26.11 22.46 25.25 21.99 25.25 20.52C25.25 19.27 26.24 18.24 27.45 18.24H29.33C30.66 18.24 31.75 19.36 31.75 20.74C31.75 21.15 31.41 21.49 31 21.49C30.59 21.49 30.25 21.15 30.25 20.74C30.25 20.19 29.84 19.74 29.33 19.74H27.45C27.06 19.74 26.75 20.09 26.75 20.52C26.75 21.06 26.9 21.14 27.24 21.26L30.25 22.31C30.89 22.53 31.75 23 31.75 24.47C31.75 25.73 30.76 26.75 29.55 26.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M28.5 27.75C28.09 27.75 27.75 27.41 27.75 27V18C27.75 17.59 28.09 17.25 28.5 17.25C28.91 17.25 29.25 17.59 29.25 18V27C29.25 27.41 28.91 27.75 28.5 27.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M28.5 33.25C22.57 33.25 17.75 28.43 17.75 22.5C17.75 16.57 22.57 11.75 28.5 11.75C28.91 11.75 29.25 12.09 29.25 12.5C29.25 12.91 28.91 13.25 28.5 13.25C23.4 13.25 19.25 17.4 19.25 22.5C19.25 27.6 23.4 31.75 28.5 31.75C33.6 31.75 37.75 27.6 37.75 22.5C37.75 22.09 38.09 21.75 38.5 21.75C38.91 21.75 39.25 22.09 39.25 22.5C39.25 28.43 34.43 33.25 28.5 33.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M37.5 18.25H33.5C33.09 18.25 32.75 17.91 32.75 17.5V13.5C32.75 13.09 33.09 12.75 33.5 12.75C33.91 12.75 34.25 13.09 34.25 13.5V16.75H37.5C37.91 16.75 38.25 17.09 38.25 17.5C38.25 17.91 37.91 18.25 37.5 18.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M33.4999 18.2499C33.3099 18.2499 33.1199 18.1799 32.9699 18.0299C32.6799 17.7399 32.6799 17.2599 32.9699 16.9699L37.9699 11.9699C38.2599 11.6799 38.7399 11.6799 39.0299 11.9699C39.3199 12.2599 39.3199 12.7399 39.0299 13.0299L34.0299 18.0299C33.8799 18.1799 33.6899 18.2499 33.4999 18.2499Z"
                        fill="#292D32"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Buyers
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Purchase products for personal or business use, seeking
                      quality and value.
                    </p>
                  </div>
                </div>

                {/* Resellers Card */}
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                    <svg
                      width="57"
                      height="45"
                      viewBox="0 0 57 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="57" height="45" rx="14" fill="#E5E5E5" />
                      <path
                        d="M29.55 26.75H27.67C26.34 26.75 25.25 25.63 25.25 24.25C25.25 23.84 25.59 23.5 26 23.5C26.41 23.5 26.75 23.84 26.75 24.25C26.75 24.8 27.16 25.25 27.67 25.25H29.55C29.94 25.25 30.25 24.9 30.25 24.47C30.25 23.93 30.1 23.85 29.76 23.73L26.75 22.68C26.11 22.45 25.25 21.99 25.25 20.52C25.25 19.27 26.24 18.24 27.45 18.24H29.33C30.66 18.24 31.75 19.36 31.75 20.74C31.75 21.15 31.41 21.49 31 21.49C30.59 21.49 30.25 21.15 30.25 20.74C30.25 20.19 29.84 19.74 29.33 19.74H27.45C27.06 19.74 26.75 20.09 26.75 20.52C26.75 21.06 26.9 21.14 27.24 21.26L30.25 22.31C30.89 22.54 31.75 23 31.75 24.47C31.75 25.73 30.76 26.75 29.55 26.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M28.5 27.75C28.09 27.75 27.75 27.41 27.75 27V18C27.75 17.59 28.09 17.25 28.5 17.25C28.91 17.25 29.25 17.59 29.25 18V27C29.25 27.41 28.91 27.75 28.5 27.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M28.5 33.25C22.57 33.25 17.75 28.43 17.75 22.5C17.75 16.57 22.57 11.75 28.5 11.75C28.91 11.75 29.25 12.09 29.25 12.5C29.25 12.91 28.91 13.25 28.5 13.25C23.4 13.25 19.25 17.4 19.25 22.5C19.25 27.6 23.4 31.75 28.5 31.75C33.6 31.75 37.75 27.6 37.75 22.5C37.75 22.09 38.09 21.75 38.5 21.75C38.91 21.75 39.25 22.09 39.25 22.5C39.25 28.43 34.43 33.25 28.5 33.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M38.5 17.25C38.09 17.25 37.75 16.91 37.75 16.5V13.25H34.5C34.09 13.25 33.75 12.91 33.75 12.5C33.75 12.09 34.09 11.75 34.5 11.75H38.5C38.91 11.75 39.25 12.09 39.25 12.5V16.5C39.25 16.91 38.91 17.25 38.5 17.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M33.4999 18.2499C33.3099 18.2499 33.1199 18.1799 32.9699 18.0299C32.6799 17.7399 32.6799 17.2599 32.9699 16.9699L37.9699 11.9699C38.2599 11.6799 38.7399 11.6799 39.0299 11.9699C39.3199 12.2599 39.3199 12.7399 39.0299 13.0299L34.0299 18.0299C33.8799 18.1799 33.6899 18.2499 33.4999 18.2499Z"
                        fill="#292D32"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Resellers
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Distribute products to wider audiences, generating profit
                      through added reach
                    </p>
                  </div>
                </div>

                {/* Earnings Card */}
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                    <svg
                      width="57"
                      height="45"
                      viewBox="0 0 57 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="57" height="45" rx="14" fill="#E5E5E5" />
                      <path
                        d="M29.9002 27.9201H27.3902C25.7502 27.9201 24.4202 26.5401 24.4202 24.8401C24.4202 24.4301 24.7602 24.0901 25.1702 24.0901C25.5802 24.0901 25.9202 24.4301 25.9202 24.8401C25.9202 25.7101 26.5802 26.4201 27.3902 26.4201H29.9002C30.5502 26.4201 31.0902 25.8401 31.0902 25.1401C31.0902 24.2701 30.7802 24.1001 30.2702 23.9201L26.2402 22.5001C25.4602 22.2301 24.4102 21.6501 24.4102 19.8601C24.4102 18.3201 25.6202 17.0801 27.1002 17.0801H29.6102C31.2502 17.0801 32.5802 18.4601 32.5802 20.1601C32.5802 20.5701 32.2402 20.9101 31.8302 20.9101C31.4202 20.9101 31.0802 20.5701 31.0802 20.1601C31.0802 19.2901 30.4202 18.5801 29.6102 18.5801H27.1002C26.4502 18.5801 25.9102 19.1601 25.9102 19.8601C25.9102 20.7301 26.2202 20.9001 26.7302 21.0801L30.7602 22.5001C31.5402 22.7701 32.5902 23.3501 32.5902 25.1401C32.5802 26.6701 31.3802 27.9201 29.9002 27.9201Z"
                        fill="#292D32"
                      />
                      <path
                        d="M28.5 29.25C28.09 29.25 27.75 28.91 27.75 28.5V16.5C27.75 16.09 28.09 15.75 28.5 15.75C28.91 15.75 29.25 16.09 29.25 16.5V28.5C29.25 28.91 28.91 29.25 28.5 29.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M28.5 33.25C22.57 33.25 17.75 28.43 17.75 22.5C17.75 16.57 22.57 11.75 28.5 11.75C34.43 11.75 39.25 16.57 39.25 22.5C39.25 28.43 34.43 33.25 28.5 33.25ZM28.5 13.25C23.4 13.25 19.25 17.4 19.25 22.5C19.25 27.6 23.4 31.75 28.5 31.75C33.6 31.75 37.75 27.6 37.75 22.5C37.75 17.4 33.6 13.25 28.5 13.25Z"
                        fill="#292D32"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Earnings
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Revenue from direct sales, bundles, or subscriptions.
                    </p>
                  </div>
                </div>

                {/* Royalties Card */}
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                    <svg
                      width="57"
                      height="45"
                      viewBox="0 0 57 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="57" height="45" rx="14" fill="#E5E5E5" />
                      <path
                        d="M33.1999 30.23H23.7999C23.0599 30.23 22.3099 29.7 22.0599 29.01L17.9199 17.42C17.4099 15.96 17.7799 15.29 18.1799 14.99C18.5799 14.69 19.3299 14.51 20.5899 15.41L24.4899 18.2C24.6099 18.27 24.7199 18.3 24.7999 18.28C24.8899 18.25 24.9599 18.17 25.0099 18.03L26.7699 13.34C27.2999 11.94 28.0799 11.73 28.4999 11.73C28.9199 11.73 29.6999 11.94 30.2299 13.34L31.9899 18.03C32.0399 18.16 32.1099 18.25 32.1999 18.28C32.2899 18.31 32.3999 18.28 32.5099 18.19L36.1699 15.58C37.5099 14.62 38.2899 14.81 38.7199 15.12C39.1399 15.44 39.5299 16.15 38.9799 17.7L34.9399 29.01C34.6899 29.7 33.9399 30.23 33.1999 30.23ZM19.1799 16.31C19.1999 16.45 19.2399 16.65 19.3399 16.91L23.4799 28.5C23.5199 28.6 23.6999 28.73 23.7999 28.73H33.1999C33.3099 28.73 33.4899 28.6 33.5199 28.5L37.5599 17.2C37.6999 16.82 37.7399 16.56 37.7499 16.41C37.5999 16.46 37.3699 16.57 37.0399 16.81L33.3799 19.42C32.8799 19.77 32.2899 19.88 31.7599 19.72C31.2299 19.56 30.7999 19.14 30.5799 18.57L28.8199 13.88C28.6899 13.53 28.5699 13.36 28.4999 13.28C28.4299 13.36 28.3099 13.53 28.1799 13.87L26.4199 18.56C26.2099 19.13 25.7799 19.55 25.2399 19.71C24.7099 19.87 24.1099 19.76 23.6199 19.41L19.7199 16.62C19.4899 16.46 19.3099 16.36 19.1799 16.31Z"
                        fill="#292D32"
                      />
                      <path
                        d="M34 33.25H23C22.59 33.25 22.25 32.91 22.25 32.5C22.25 32.09 22.59 31.75 23 31.75H34C34.41 31.75 34.75 32.09 34.75 32.5C34.75 32.91 34.41 33.25 34 33.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M31 25.25H26C25.59 25.25 25.25 24.91 25.25 24.5C25.25 24.09 25.59 23.75 26 23.75H31C31.41 23.75 31.75 24.09 31.75 24.5C31.75 24.91 31.41 25.25 31 25.25Z"
                        fill="#292D32"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Royalties
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ongoing payouts to creators when products are resold or
                      resold.
                    </p>
                  </div>
                </div>

                {/* Discovery Card */}
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                    <svg
                      width="57"
                      height="45"
                      viewBox="0 0 57 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="57" height="45" rx="14" fill="#E5E5E5" />
                      <path
                        d="M27.04 32.44C26.81 32.44 26.59 32.34 26.44 32.14L25.43 30.79C25.22 30.51 24.94 30.35 24.64 30.33C24.34 30.31 24.04 30.45 23.8 30.7C22.35 32.25 21.25 32.12 20.72 31.92C20.18 31.71 19.27 31.02 19.27 28.8V17.54C19.27 13.1 20.55 11.75 24.74 11.75H32.29C36.48 11.75 37.76 13.1 37.76 17.54V21.8C37.76 22.21 37.42 22.55 37.01 22.55C36.6 22.55 36.26 22.21 36.26 21.8V17.54C36.26 13.93 35.63 13.25 32.29 13.25H24.74C21.4 13.25 20.77 13.93 20.77 17.54V28.8C20.77 29.85 21.03 30.43 21.27 30.52C21.45 30.59 21.94 30.49 22.7 29.68C23.25 29.1 23.97 28.79 24.72 28.83C25.46 28.87 26.16 29.26 26.63 29.89L27.65 31.24C27.9 31.57 27.83 32.04 27.5 32.29C27.35 32.4 27.19 32.44 27.04 32.44Z"
                        fill="#292D32"
                      />
                      <path
                        d="M34.7 32.65C32.52 32.65 30.75 30.88 30.75 28.7C30.75 26.52 32.52 24.75 34.7 24.75C36.88 24.75 38.65 26.52 38.65 28.7C38.65 30.88 36.88 32.65 34.7 32.65ZM34.7 26.25C33.35 26.25 32.25 27.35 32.25 28.7C32.25 30.05 33.35 31.15 34.7 31.15C36.05 31.15 37.15 30.05 37.15 28.7C37.15 27.35 36.05 26.25 34.7 26.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M38.4999 33.2499C38.3099 33.2499 38.1199 33.1799 37.9699 33.0299L36.9699 32.0299C36.6799 31.7399 36.6799 31.2599 36.9699 30.9699C37.2599 30.6799 37.7399 30.6799 38.0299 30.9699L39.0299 31.9699C39.3199 32.2599 39.3199 32.7399 39.0299 33.0299C38.8799 33.1799 38.6899 33.2499 38.4999 33.2499Z"
                        fill="#292D32"
                      />
                      <path
                        d="M32.5 18.25H24.5C24.09 18.25 23.75 17.91 23.75 17.5C23.75 17.09 24.09 16.75 24.5 16.75H32.5C32.91 16.75 33.25 17.09 33.25 17.5C33.25 17.91 32.91 18.25 32.5 18.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M31.5 22.25H25.5C25.09 22.25 24.75 21.91 24.75 21.5C24.75 21.09 25.09 20.75 25.5 20.75H31.5C31.91 20.75 32.25 21.09 32.25 21.5C32.25 21.91 31.91 22.25 31.5 22.25Z"
                        fill="#292D32"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Discovery
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Search, recommendations, and marketing that connect
                      products with buyers.
                    </p>
                  </div>
                </div>

                {/* Marketplace Card */}
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                    <svg
                      width="57"
                      height="45"
                      viewBox="0 0 57 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="57" height="45" rx="14" fill="#E5E5E5" />
                      <path
                        d="M31.1998 33.25H25.7998C20.8598 33.25 18.7598 31.14 18.7598 26.21V21.72C18.7598 21.31 19.0998 20.97 19.5098 20.97C19.9198 20.97 20.2598 21.31 20.2598 21.72V26.21C20.2598 30.3 21.7098 31.75 25.7998 31.75H31.1898C35.2798 31.75 36.7298 30.3 36.7298 26.21V21.72C36.7298 21.31 37.0698 20.97 37.4798 20.97C37.8898 20.97 38.2298 21.31 38.2298 21.72V26.21C38.2398 31.14 36.1298 33.25 31.1998 33.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M28.5 23.25C27.4 23.25 26.4 22.82 25.69 22.03C24.98 21.24 24.65 20.21 24.76 19.11L25.43 12.43C25.47 12.05 25.79 11.75 26.18 11.75H30.85C31.24 11.75 31.56 12.04 31.6 12.43L32.27 19.11C32.38 20.21 32.05 21.24 31.34 22.03C30.6 22.82 29.6 23.25 28.5 23.25ZM26.85 13.25L26.25 19.26C26.18 19.93 26.38 20.56 26.8 21.02C27.65 21.96 29.35 21.96 30.2 21.02C30.62 20.55 30.82 19.92 30.75 19.26L30.15 13.25H26.85Z"
                        fill="#292D32"
                      />
                      <path
                        d="M34.81 23.25C32.78 23.25 30.97 21.61 30.76 19.59L30.06 12.58C30.04 12.37 30.11 12.16 30.25 12C30.39 11.84 30.59 11.75 30.81 11.75H33.86C36.8 11.75 38.17 12.98 38.58 16L38.86 18.78C38.98 19.96 38.62 21.08 37.85 21.93C37.08 22.78 36 23.25 34.81 23.25ZM31.64 13.25L32.26 19.44C32.39 20.69 33.55 21.75 34.81 21.75C35.57 21.75 36.25 21.46 36.74 20.93C37.22 20.4 37.44 19.69 37.37 18.93L37.09 16.18C36.78 13.92 36.05 13.25 33.86 13.25H31.64V13.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M22.14 23.25C20.95 23.25 19.87 22.78 19.1 21.93C18.33 21.08 17.97 19.96 18.09 18.78L18.36 16.03C18.78 12.98 20.15 11.75 23.09 11.75H26.14C26.35 11.75 26.55 11.84 26.7 12C26.85 12.16 26.91 12.37 26.89 12.58L26.19 19.59C25.98 21.61 24.17 23.25 22.14 23.25ZM23.09 13.25C20.9 13.25 20.17 13.91 19.85 16.2L19.58 18.93C19.5 19.69 19.73 20.4 20.21 20.93C20.69 21.46 21.37 21.75 22.14 21.75C23.4 21.75 24.57 20.69 24.69 19.44L25.31 13.25H23.09V13.25Z"
                        fill="#292D32"
                      />
                      <path
                        d="M31 33.25H26C25.59 33.25 25.25 32.91 25.25 32.5V30C25.25 27.9 26.4 26.75 28.5 26.75C30.6 26.75 31.75 27.9 31.75 30V32.5C31.75 32.91 31.41 33.25 31 33.25ZM26.75 31.75H30.25V30C30.25 28.74 29.76 28.25 28.5 28.25C27.24 28.25 26.75 28.74 26.75 30V31.75Z"
                        fill="#292D32"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Marketplace
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      The platform enabling transactions, payments, and product
                      delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - World Image */}
            <div className="relative flex justify-center lg:justify-end flex-1 order-1 lg:order-2">
              <div className="w-full">
                <Image
                  src="/world.png"
                  alt="World Map - Flyverr Ecosystem"
                  width={1200}
                  height={1200}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Are Saying Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-20 items-start">
            {/* Left Side - Title and Testimonial Slider */}
            <div className="space-y-6 lg:space-y-8">
              {/* Section Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                What Our Customers
                <br />
                Are Saying
              </h2>

              {/* Description - Show on mobile only */}
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 lg:hidden">
                Real feedback from people who trust and use Flyverr every day
              </p>

              {/* Testimonial Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-lg transition-all duration-500">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {testimonials[currentTestimonial].text}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[currentTestimonial].author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {testimonials[currentTestimonial].author}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? "bg-gray-900 dark:bg-white"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Description and Customer Location Map */}
            <div className="space-y-6 lg:space-y-8">
              {/* Description - Show on desktop only */}
              <p className="hidden lg:block text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Real feedback from people who trust and use Flyverr every day
              </p>

              {/* Customer Location Map */}
              <div className="relative flex justify-center lg:justify-end flex-1">
                <div className="w-full">
                  <Image
                    src="/map.png"
                    alt="Customer Locations - Global Reach"
                    width={1200}
                    height={900}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides & FAQs Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Main Title and CTA */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Guides & FAQs
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                  Explore our FAQs to learn how Flyverr works, how to get
                  support, and how to make the most of our marketplace
                </p>
              </div>
              <Button
                onClick={() => router.push("/faq")}
                className="w-full lg:w-auto bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-8 py-6 text-base font-semibold dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                Learn More
              </Button>
            </div>

            {/* Middle Column - From Our Help Center */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  From Our Help Center
                </h3>
                <div className="space-y-4">
                  {faqData.map((item, index) => (
                    <div
                      key={item.id}
                      className={
                        index < faqData.length - 1
                          ? "border-b border-gray-200 dark:border-gray-700"
                          : ""
                      }
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-2 -mx-2 transition-colors"
                      >
                        <span className="text-base text-gray-700 dark:text-gray-300 pr-4">
                          {item.question}
                        </span>
                        <span
                          className={`text-gray-900 dark:text-white text-xl font-bold transition-transform duration-200 ${
                            expandedItems[item.id] ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      {expandedItems[item.id] && (
                        <div className="pb-3 px-2 -mx-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Complete Guides */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Complete Guides
                </h3>
                <div className="space-y-4">
                  {guideData.map((item, index) => (
                    <div
                      key={item.id}
                      className={
                        index < guideData.length - 1
                          ? "border-b border-gray-200 dark:border-gray-700"
                          : ""
                      }
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-2 -mx-2 transition-colors"
                      >
                        <span className="text-base text-gray-700 dark:text-gray-300 pr-4">
                          {item.question}
                        </span>
                        <span
                          className={`text-gray-900 dark:text-white text-xl font-bold transition-transform duration-200 ${
                            expandedItems[item.id] ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      {expandedItems[item.id] && (
                        <div className="pb-3 px-2 -mx-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover. Connect. Grow. CTA Banner */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden h-80 lg:h-96 flex items-center justify-center">
            {/* Background Image */}
            <Image
              src="/banner.png"
              alt="Connect with Flyverr"
              fill
              className="object-cover"
              priority
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 text-center space-y-6 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Discover. Connect. Grow.
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                A marketplace designed to help you succeed with ease
              </p>
              <Button
                onClick={() => {
                  if (isAuthenticated) {
                    router.push("/user/dashboard");
                  } else {
                    router.push("/signup");
                  }
                }}
                className="bg-white hover:bg-gray-100 text-gray-900 rounded-full px-8 py-6 text-base font-semibold"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Top Section - Logo, Address, and Social Links */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-12">
            {/* Left - Logo, Address, Social */}
            <div className="space-y-6">
              {/* Logo and Tagline */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/logo.png"
                    alt="Flyverr Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Flyverr
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Digital Marketplace
                    </p>
                  </div>
                </div>

                {/* Address and Contact */}
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>(125) 5695-2731</p>
                  <p>1125 Mission Street San Francisco, CA 94103</p>
                  <p>info@Flyverr.com</p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-16">
                {/* Google */}
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="Google"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </a>

                {/* Twitter */}
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right - Navigation Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Products */}
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  Products
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Flyverr TRM
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Flyverr TRM
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Flyverr TRM
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Flyverr TRM
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Flyverr TRM
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Customers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  Support
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/faq"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Help center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Product status
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 mt-12 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2022 Flyverr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
