import React, { useState } from "react";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { canPurchaseProducts } from "@/lib/stripeHelpers";
import { swal } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useOnboardStripe } from "@/features/user/payment/hooks/useOnboardStripe";
import Swal from "sweetalert2";
import { X, AlertCircle } from "lucide-react";
import { useGetStripeConnectStatus } from "../../payment/hooks/useGetStripeConnectStatus";
import { useGetMarketplaceProductDetail } from "@/features/marketplace/hooks";

// Country options for Stripe onboarding
const COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "PK", name: "Pakistan" },
  { code: "IN", name: "India" },
  { code: "CY", name: "Cyprus" },
  { code: "US", name: "United States" },
];

interface StripeOnboardingInjectedProps {
  // Call this with your action; it will run checks and then execute action if ready
  requireReady?: (action: () => void) => void;
}

export default function withStripeOnboarding<T extends object>(
  Component: React.ComponentType<T & StripeOnboardingInjectedProps> ,
  
) {
  return function StripeOnboardingWrapper(props: T) {
    const [showOnboardingModal, setShowOnboardingModal] = useState(false);
    const [showRedirectModal, setShowRedirectModal] = useState(false);
    const [onboardingUrl, setOnboardingUrl] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const productId = params.id as string;

    const { isAuthenticated } = useAuth();
    const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUser();
    
    const {
      data: product,
      isLoading: isProductLoading,
      isError: isProductError,
    } = useGetMarketplaceProductDetail(productId);
    const {
      data: stripeConnectStatus,
      isLoading: isStripeConnectStatusLoading,
      isError: isStripeConnectStatusError,
    } = useGetStripeConnectStatus();
    const router = useRouter();
    const { mutate: onboardStripeMutation } = useOnboardStripe();
    console.log("stripeConnectStatus", stripeConnectStatus);
    const requireReady = (action: () => void) => {
      // Check authentication first
      if (!isAuthenticated) {
        swal(
          "Please login to continue",
          "You must be logged in to perform this action",
          "info",
          () => {
            router.push("/login");
          }
        );
        return;
      }

      // Wait for user data to load
      if (isUserLoading || !currentUser) {
        return;
      }

   
      if (product && product.creator_id.toString() === currentUser.id.toString() ) {
        swal(
          "Cannot Purchase Own Product",
          "You cannot purchase your own product",
          "info"
        );
        return;
      }
      // Check if user can proceed (Stripe onboarded)
      if (!canPurchaseProducts(currentUser)) {
        // Show onboarding modal with country selection
        setShowOnboardingModal(true);
        return;
      }

      
      if ((isStripeConnectStatusLoading || isStripeConnectStatusError)) {
        Swal.fire({
          title: "Checking Stripe status...",
          text: isStripeConnectStatusError
            ? "Error checking Stripe status"
            : isStripeConnectStatusLoading
            ? "Please wait a moment"
            : "Please wait a moment",
          icon: "info",
          timer: 1000,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        return;
      }

      if (!stripeConnectStatus?.data?.charges_enabled) {
        Swal.fire({
          title: "Complete Stripe Onboarding",
          text: "Please complete your Stripe onboarding to add a product",
          icon: "info",
          confirmButtonText: "Complete Stripe Onboarding",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(stripeConnectStatus?.data?.link, "_blank");
          }
        });

        return;
      }

      // User can proceed, run the provided action
      action();
    };

    const handleCountrySelect = (countryCode: string) => {
      setSelectedCountry(countryCode);
    };

    const handleCompleteOnboarding = () => {
      if (!selectedCountry) {
        Swal.fire({
          title: "Country Required",
          icon: "warning",
          text: "Please select a country to continue with Stripe onboarding.",
        });
        return;
      }

      setIsLoading(true);
      onboardStripeMutation(
        { country: selectedCountry },
        {
          onSuccess: ({ data }: { data: any }) => {
            setIsLoading(false);
            if (data?.data?.onboarding_url) {
              console.log(
                "Onboarding URL received:",
                data?.data?.onboarding_url
              );
              setOnboardingUrl(data?.data?.onboarding_url);
              setShowOnboardingModal(false);
              setShowRedirectModal(true);
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
            setIsLoading(false);
            console.error("Failed to initiate Stripe onboarding:", error);
            Swal.fire({
              title: "Error",
              icon: "error",
              text: "Failed to initiate Stripe onboarding. Please try again.",
            });
          },
        }
      );
    };

    const handleRedirect = () => {
      window.open(onboardingUrl, "_blank");
      setShowRedirectModal(false);
    };

    return (
      <>
        <Component {...(props as T)} requireReady={requireReady} />

        {/* Stripe Onboarding Modal with Country Selection */}
        {showOnboardingModal && (
          <Modal size="lg">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Stripe Onboarding Required
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOnboardingModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300">
                      To continue on Flyverr, you need to complete your Stripe
                      account setup. This includes verifying your identity and
                      connecting your bank account.
                    </p>
                  </div>
                </div>

                {/* Country Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select your country *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                        className={`p-3 border rounded-lg text-left transition-all ${
                          selectedCountry === country.code
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                        }`}
                      >
                        <div className="font-medium">{country.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {country.code}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                    What you'll need:
                  </h3>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                    <li>• Government-issued ID for verification</li>
                    <li>• Business information (if applicable)</li>
                    <li>• Bank account details for payouts</li>
                    <li>• Social Security Number (US) or equivalent</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    What happens next:
                  </h3>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>
                      • You'll be redirected to Stripe's secure onboarding
                    </li>
                    <li>• Complete your account setup (takes 5-10 minutes)</li>
                    <li>• Return to Flyverr when finished</li>
                    <li>• Your account will be automatically verified</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => setShowOnboardingModal(false)}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleCompleteOnboarding}
                  disabled={!selectedCountry || isLoading}
                  className="bg-amber-600 hover:bg-amber-700 text-gray-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Setting up...
                    </>
                  ) : (
                    "Complete Setup"
                  )}
                </Button>
              </div>
            </div>
          </Modal>
        )}

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
  };
}
