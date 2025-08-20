"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useOnboardStripe } from "@/features/user/payment/hooks/useOnboardStripe";
import Modal from "@/components/Modal";
import Swal from "sweetalert2";

interface CompleteSetupButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export default function CompleteSetupButton({
  variant = "default",
  size = "default",
  className = "",
  children = "Complete Setup",
}: CompleteSetupButtonProps) {
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [onboardingUrl, setOnboardingUrl] = useState<string>("");
  const onboardStripeMutation = useOnboardStripe();

  const handleCompleteOnboarding = () => {
    onboardStripeMutation.mutate(undefined, {
      onSuccess: ({ data }: { data: any }) => {
        if (data?.data?.onboarding_url) {
          console.log("data", data?.data?.onboarding_url);

          // Store the onboarding URL and show redirect modal
          setOnboardingUrl(data?.data?.onboarding_url);
          setShowRedirectModal(true);
          //   closeModal(); // Close the parent modal
        } else {
          console.error("Invalid onboarding URL received");
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Invalid onboarding URL received",
          });
        }
      },
      onError: (error) => {
        console.error("Failed to initiate Stripe onboarding:", error);
      },
    });
  };

  const handleRedirect = () => {
    window.open(onboardingUrl, "_blank");
    setShowRedirectModal(false);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleCompleteOnboarding}
        disabled={onboardStripeMutation.isPending}
        className={className}
      >
        {onboardStripeMutation.isPending ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            Setting up...
          </>
        ) : (
          children
        )}
      </Button>

      {/* Redirect Modal */}
      {showRedirectModal && (
        <Modal size="sm">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to Complete Setup!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your Stripe account is ready. Click below to complete your
                onboarding process.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                What happens next:
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• You'll be redirected to Stripe's secure onboarding</li>
                <li>• Complete your account setup (takes 5-10 minutes)</li>
                <li>• Return to Flyverr when finished</li>
                <li>
                  • <strong>Refresh the page</strong> to update your status
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                onClick={handleRedirect}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Continue to Stripe Onboarding
              </Button>

              <Button
                variant="ghost"
                className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowRedirectModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
