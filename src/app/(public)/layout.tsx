"use client";

import Navigation from "@/components/Navigation";
import StripeOnboardingAlert from "@/components/ui/StripeOnboardingAlert";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

/**
 * Public Layout with selective access control:
 * - Home page (/) - Protected (requires login)
 * - FAQ page (/faq) - Public (no login required)
 * - Marketplace page (/marketplace) - Public (no login required)
 * - Blog page (/blog) - Public (no login required)
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, mounted } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Wait for auth to be determined before making decisions
    if (isLoading || !mounted) return;

    // Only protect the home page (/) - require login for access
    // All other pages in this layout are public (faq, marketplace, blog)
    if (!isAuthenticated && pathname === "/") {
      console.log(
        "🔒 Access Control: User not authenticated, redirecting from home page (/) to marketplace"
      );
      router.push("/marketplace");
      return;
    }

    // Log successful access for debugging
    if (pathname === "/") {
      console.log(
        "✅ Access Control: Authenticated user accessing protected home page"
      );
    } else {
      console.log("🌐 Access Control: Public page accessed:", pathname);
    }

    // Allow rendering if auth check is complete
    setShouldRender(true);
  }, [isAuthenticated, isLoading, pathname, router, mounted]);

  // Don't render until we've determined auth status and mounted
  if (isLoading || !shouldRender || !mounted) {
    return (
      <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-flyverr-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className=" bg-flyverr-neutral dark:bg-gray-900">
        <div className="max-w-7xl mx-auto w-full">
          <StripeOnboardingAlert />
        </div>
      </div>
      {children}
    </div>
  );
}
