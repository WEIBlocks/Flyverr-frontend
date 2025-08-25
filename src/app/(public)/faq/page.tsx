"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useGetFaqs } from "@/features/faqs/hooks";
import { FAQItem, FAQsByCategory } from "@/features/faqs/faqs.types";

// Category display names for better UI
const categoryDisplayNames: Record<string, string> = {
  general: "General",
  payment: "Payment & Fees",
  licensing: "Licensing & Insurance",
  technical: "Technical Support",
  account: "Account & Security",
};

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Fetch FAQs from API
  const {
    data: faqsResponse,
    isLoading,
    error,
  } = useGetFaqs(
    selectedCategory !== "all" ? { category: selectedCategory } : undefined
  );

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      // Force re-render when theme changes
      setMounted(false);

    };

    // Listen for storage changes (theme changes)
    window.addEventListener("storage", handleThemeChange);

    // Also listen for theme class changes on document
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  // Reset search when category changes
  useEffect(() => {
    setSearchTerm("");
  }, [selectedCategory]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Process FAQ data from API
  const faqsData = faqsResponse?.data?.faqs as FAQsByCategory | undefined;
  const categories = faqsResponse?.data?.categories || [];
  const totalFAQs = faqsResponse?.data?.total || 0;

  // Flatten FAQs for search functionality
  const allFAQs: FAQItem[] = faqsData ? Object.values(faqsData).flat() : [];

  // Filter FAQ items based on search
  const filteredFAQs = allFAQs.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const toggleItem = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-flyverr-primary/20 rounded-2xl mb-6 sm:mb-8 transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <HelpCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 text-flyverr-primary transition-transform duration-300" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-flyverr-primary mb-4 sm:mb-6 transition-all duration-500 leading-tight">
            FAQ Center
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-muted-foreground max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto leading-relaxed transition-all duration-500 px-4 font-medium">
            Find answers to common questions about drones, our marketplace, and
            everything Flyverr
          </p>
        </div>

        {/* Search and Category Filter Section */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 animate-slide-up">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === "all"
                    ? "bg-flyverr-primary text-white shadow-lg hover:bg-flyverr-primary/90"
                    : "bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-flyverr-primary text-white shadow-lg hover:bg-flyverr-primary/90"
                      : "bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {categoryDisplayNames[category] || category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 sm:py-20 md:mb-24 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-muted rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 text-flyverr-primary animate-spin" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 transition-all duration-300">
              Loading FAQs...
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md sm:max-w-lg md:max-w-xl mx-auto transition-all duration-300 px-4 font-medium">
              Please wait while we fetch the latest information.
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16 sm:py-20 md:mb-24 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-destructive/20 rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <HelpCircle className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 text-destructive" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 transition-all duration-300">
              Error Loading FAQs
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md sm:max-w-lg md:max-w-xl mx-auto transition-all duration-300 px-4 font-medium">
              We encountered an issue while loading the FAQs. Please try again
              later.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Results Count - Only show when not loading and no error */}
        {!isLoading && !error && (
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card text-card-foreground rounded-full shadow-md border border-border">
              <div className="w-2 h-2 bg-flyverr-secondary rounded-full"></div>
              <span className="text-sm sm:text-base font-medium transition-all duration-300">
                <span className="text-flyverr-primary font-bold">
                  {filteredFAQs.length}
                </span>{" "}
                question{filteredFAQs.length !== 1 ? "s" : ""} found
                {selectedCategory !== "all" && (
                  <span className="text-muted-foreground">
                    {" "}
                    in{" "}
                    {categoryDisplayNames[selectedCategory] || selectedCategory}
                  </span>
                )}
              </span>
            </div>
          </div>
        )}

        {/* FAQ Items - Only show when not loading and no error */}
        {!isLoading && !error && (
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            {selectedCategory === "all" && faqsData
              ? // Show FAQs grouped by category when viewing all
                categories.map((category) => {
                  const categoryFAQs = faqsData[category] || [];
                  if (categoryFAQs.length === 0) return null;

                  return (
                    <div key={category} className="space-y-4">
                      {/* Category Header */}
                      <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                          {categoryDisplayNames[category] || category}
                        </h2>
                        <div className="w-24 h-1 bg-flyverr-primary mx-auto rounded-full"></div>
                      </div>

                      {/* Category FAQs */}
                      {categoryFAQs.map((item, index) => {
                        const isExpanded = expandedItem === item.id;

                        return (
                          <Card
                            key={item.id}
                            className={`transition-all duration-500 ease-in-out hover:shadow-xl border-2 rounded-xl sm:rounded-2xl hover:rounded-2xl sm:hover:rounded-3xl bg-card text-card-foreground shadow-md hover:shadow-2xl ${
                              isExpanded
                                ? "border-flyverr-primary shadow-xl bg-flyverr-primary/5"
                                : "border-border hover:border-flyverr-primary/60 hover:shadow-xl"
                            }`}
                            style={{
                              animationDelay: `${index * 50}ms`,
                            }}
                          >
                            <CardContent className="p-0">
                              <div
                                className="p-6 sm:p-7 md:p-8 cursor-pointer transition-all duration-300 hover:bg-accent/50 rounded-xl sm:rounded-2xl"
                                onClick={() => toggleItem(item.id)}
                              >
                                <div className="flex items-start justify-between gap-3 sm:gap-4">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground leading-relaxed pr-2 sm:pr-4 md:pr-8 transition-colors duration-300 hover:text-flyverr-primary">
                                      {item.question}
                                    </h3>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <div
                                      className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform shadow-md ${
                                        isExpanded
                                          ? "bg-flyverr-primary text-white rotate-180 shadow-lg ring-2 ring-flyverr-primary/30"
                                          : "bg-muted text-muted-foreground hover:bg-flyverr-primary hover:text-white hover:shadow-lg hover:ring-2 hover:ring-flyverr-primary/20"
                                      }`}
                                    >
                                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform duration-500" />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                  isExpanded
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                              >
                                <div className="px-6 sm:px-7 md:px-8 pb-6 sm:pb-7 md:pb-8 border-t border-border">
                                  <div className="pt-4 sm:pt-5">
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed transition-all duration-300 font-medium">
                                      {item.answer}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  );
                })
              : // Show filtered FAQs when searching or viewing specific category
                filteredFAQs.map((item, index) => {
                  const isExpanded = expandedItem === item.id;

                  return (
                    <Card
                      key={item.id}
                      className={`transition-all duration-500 ease-in-out  border-2 rounded-xl sm:rounded-2xl hover:rounded-2xl sm:hover:rounded-3xl bg-card text-card-foreground shadow-md hover:shadow-2xl ${
                        isExpanded
                          ? "border-flyverr-primary shadow-xl bg-flyverr-primary/5"
                          : "border-border hover:border-flyverr-primary/60 hover:shadow-xl"
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <CardContent className="p-0">
                        <div
                          className="p-6 sm:p-7 md:p-8 cursor-pointer transition-all duration-300 hover:bg-accent/50 rounded-xl sm:rounded-2xl"
                          onClick={() => toggleItem(item.id)}
                        >
                          <div className="flex items-start justify-between gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground leading-relaxed pr-2 sm:pr-4 md:pr-8 transition-colors duration-300 hover:text-flyverr-primary">
                                {item.question}
                              </h3>
                            </div>
                            <div className="flex-shrink-0">
                              <div
                                className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform shadow-md ${
                                  isExpanded
                                    ? "bg-flyverr-primary text-white rotate-180 shadow-lg ring-2 ring-flyverr-primary/30"
                                    : "bg-muted text-muted-foreground hover:bg-flyverr-primary hover:text-white hover:shadow-lg hover:ring-2 hover:ring-flyverr-primary/20"
                                }`}
                              >
                                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform duration-500" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isExpanded
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-6 sm:px-7 md:px-8 pb-6 sm:pb-7 md:pb-8 border-t border-border">
                            <div className="pt-4 sm:pt-5">
                              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed transition-all duration-300 font-medium">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
          </div>
        )}

        {/* No Results - Only show when not loading, no error, and no FAQs found */}
        {!isLoading && !error && filteredFAQs.length === 0 && (
          <div className="text-center py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-muted rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <HelpCircle className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 text-muted-foreground transition-transform duration-300" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 transition-all duration-300">
              No questions found
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md sm:max-w-lg md:max-w-xl mx-auto transition-all duration-300 px-4 font-medium">
              {searchTerm
                ? `No questions match your search "${searchTerm}"`
                : selectedCategory !== "all"
                ? `No questions found in ${
                    categoryDisplayNames[selectedCategory] || selectedCategory
                  } category`
                : "No questions are currently available."}
            </p>
            {(searchTerm || selectedCategory !== "all") && (
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-6 px-6 py-3 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Contact Support */}
        {/* <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32 animate-slide-up">
          <Card className="bg-gradient-to-r from-flyverr-primary to-flyverr-secondary border-0 shadow-xl transition-all duration-500 hover:shadow-2xl rounded-lg sm:rounded-xl hover:rounded-xl sm:hover:rounded-2xl">
            <CardContent className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white/20 rounded-full mb-4 sm:mb-6 transition-all duration-500 hover:bg-white/30">
                <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 text-white transition-transform duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 transition-all duration-300">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto transition-all duration-300">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button className="bg-white text-flyverr-primary hover:bg-gray-100 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg">
                  Contact Support
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base transition-all duration-300 hover:shadow-lg">
                  Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
