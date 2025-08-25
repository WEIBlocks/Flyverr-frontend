"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, CreditCard, AlertCircle } from "lucide-react";
import { shouldShowStripeAlert, dismissStripeAlert } from "@/lib/stripeHelpers";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useAuth } from "@/contexts/AuthContext";
import CompleteSetupButton from "./CompleteSetupButton";

export default function StripeOnboardingAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const { data: currentUser, isRefetching , isLoading } = useGetCurrentUser();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Use helper function to determine if alert should be shown
    setShowAlert(shouldShowStripeAlert(isLoading ? null : currentUser));
  }, [currentUser, isRefetching]);

  const handleDismiss = () => {
    setShowAlert(false);
    dismissStripeAlert();
  };

  const handleOnboardingSuccess = () => {
    // Hide the alert after successful onboarding initiation
    setShowAlert(false);
  };

  if (!showAlert || !isAuthenticated) {
    return null;
  }

  return (
    <div className="border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 rounded-md p-4 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 my-2">
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
                <CompleteSetupButton
                  size="sm"
                 
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1"
                >
                  Complete Setup
                </CompleteSetupButton>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDismiss}
                  disabled={false}
                  className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/30 text-xs px-3 py-1"
                >
                  Remind me later
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="text-amber-600 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-900/30 p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
