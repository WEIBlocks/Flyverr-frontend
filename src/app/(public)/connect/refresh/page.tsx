"use client";
import React from "react";
import {
  AlertCircle,
  ArrowRight,
  ExternalLink,
  CreditCard,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CompleteSetupButton from "@/features/user/product/components/CompleteSetupButton";
import { useGetCurrentUser } from "@/features/auth/hooks";
import LoadingSpinner from "@/components/ui/loading-spinner";

const RefreshPage = () => {
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
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Onboarding Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-flyverr-primary to-flyverr-secondary p-6 text-white text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Complete Your Onboarding
            </h1>
            <p className="text-white/90 text-lg">
              Your Stripe Connect setup needs to be completed
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Status Message */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Onboarding Incomplete
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    Your Stripe Connect account setup is not complete. You need
                    to finish the onboarding process to receive payments.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-flyverr-text dark:text-white mb-4">
                Why Complete Onboarding?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-12 h-12 bg-flyverr-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-6 h-6 text-flyverr-primary" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Receive Payments
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get paid directly to your bank account
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-12 h-12 bg-flyverr-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-flyverr-primary" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Secure & Compliant
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bank-level security with Stripe
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-12 h-12 bg-flyverr-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-flyverr-primary" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Fast Setup
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete in just a few minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <CompleteSetupButton className="w-full" />

              <Button
                asChild
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-xl"
              >
                <Link href="/user/dashboard">
                  <span>Return to Dashboard</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Need help? Contact our support team at{" "}
                <a
                  href="mailto:support@flyverr.com"
                  className="text-flyverr-primary hover:underline"
                >
                  support@flyverr.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefreshPage;
