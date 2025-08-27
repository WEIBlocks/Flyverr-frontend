"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, CreditCard, AlertCircle } from "lucide-react";
import { shouldShowStripeAlert, dismissStripeAlert } from "@/lib/stripeHelpers";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useAuth } from "@/contexts/AuthContext";
import CompleteSetupButton from "@/features/user/product/components/CompleteSetupButton";

export default function StripeOnboardingAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const {
    data: currentUser,
    isRefetching,
    isLoading,
    refetch,
  } = useGetCurrentUser();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Use helper function to determine if alert should be shown
    setShowAlert(shouldShowStripeAlert(isLoading ? null : currentUser));
  }, [currentUser, isRefetching]);

  const handleDismiss = () => {
    setShowAlert(false);
    dismissStripeAlert();
  };

  if (!showAlert || !isAuthenticated) {
    return null;
  }

  return (
    <div className="border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 rounded-md p-4 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 my-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-amber-800 dark:text-amber-200">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-4 h-4" />
                <span className="font-medium">
                  Complete Your Stripe Onboarding
                </span>
              </div>
              <p className="text-sm">
                To start selling products and receiving payments, you need to
                complete your Stripe account setup. This includes verifying your
                identity and connecting your bank account.
              </p>
              <div className="flex items-center space-x-3 mt-3">
                <CompleteSetupButton />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => refetch()}
                  disabled={isRefetching}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/30 text-xs px-3 py-1"
                >
                  {isRefetching ? (
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Refreshing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Refresh Profile</span>
                    </div>
                  )}
                </Button>
                {/* <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDismiss}
                  disabled={false}
                  className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/30 text-xs px-3 py-1"
                >
                  Remind me later
                </Button> */}
              </div>
            </div>
          </div>
        </div>
        {/* <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="text-amber-600 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-900/30 p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button> */}
      </div>
    </div>
  );
}
