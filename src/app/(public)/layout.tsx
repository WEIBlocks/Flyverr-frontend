"use client"

import Navigation from "@/components/Navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Wait for auth to be determined before making decisions
    if (isLoading) return;

    // If user is not authenticated and trying to access restricted pages, redirect to marketplace
    if (!isAuthenticated && (pathname === '/' || pathname === '/blog' || pathname === '/faq')) {
      router.push('/marketplace');
      return;
    }

    // Allow rendering if auth check is complete
    setShouldRender(true);
  }, [isAuthenticated, isLoading, pathname, router]);

  // Don't render until we've determined auth status
  if (isLoading || !shouldRender) {
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
      {children}
    </div>
  );
}
