"use client";
import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetCurrentUser } from "@/features/auth/hooks";
import LoadingSpinner from "@/components/ui/loading-spinner";

const ConnectReturnPage = () => {
  const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUser();

  if (isUserLoading) {
    return (
      <LoadingSpinner 
        text="Loading..."
        description="Please wait while we verify your account."
      />
    );
  }

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden text-center">
          {/* Success Icon */}
          <div className="p-8 sm:p-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-flyverr-primary rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>

            {/* Success Message */}
            <h1 className="text-2xl sm:text-3xl font-bold text-flyverr-text dark:text-white mb-4">
              Stripe Connect Onboarding Complete!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8">
              You're all set. You can now return to Flyverr.
            </p>

            {/* Return Button */}
            <Link href="/user/dashboard">
              <Button className="w-full bg-flyverr-primary hover:bg-flyverr-primary/90 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <span>Return to Flyverr</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectReturnPage;
