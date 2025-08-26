import { useState } from "react";
import { usePurchaseProduct } from "../hooks/usePurchaseProduct";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp } from "lucide-react";
import Modal from "@/components/Modal";
import { ProductDetail } from "@/features/marketplace/marketplace.types";
import withStripeOnboarding from "./withStripeOnboarding";

interface BuyToResellButtonProps {
  product: ProductDetail;
  requireReady?: (action: () => void) => void; // injected by HOC
  licenseId?: string;
  disabled?: boolean;
}

function BuyToResellButton({
  product,
  requireReady,
  licenseId,
  disabled = false,
}: BuyToResellButtonProps) {
  const params = useParams();
  const productId = params.id as string;
  const [selectedPurchaseType, setSelectedPurchaseType] = useState<
    string | null
  >(null);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [isBuyingToResell, setIsBuyingToResell] = useState(false);
  const { mutate: purchaseProduct } = usePurchaseProduct();

  const handleBuyToResell = () => {
    if (disabled) return;
    // Show insurance modal for resell
    if (licenseId) {
      console.log("Buy to Resell - License ID:", licenseId);
    }
    setSelectedPurchaseType("resell");
    setIsInsuranceModalOpen(true);
  };

  const handleInsuranceChoice = (hasInsurance: boolean) => {
    if (!selectedPurchaseType) return;

    // Set loading state for resell
    if (selectedPurchaseType === "resell") {
      setIsBuyingToResell(true);
    }

    // Prepare purchase data with license ID if available
    const purchaseData: any = {
      purchaseType: selectedPurchaseType,
      hasInsurance,
      paymentMethod: "stripe",
    };

    if (licenseId) {
      purchaseData.licenseId = licenseId;
    }

    // Call purchase with insurance choice
    purchaseProduct(
      {
        id: productId,
        data: purchaseData,
      },
      {
        onSuccess: () => {
          setIsBuyingToResell(false);
        },
        onError: () => {
          setIsBuyingToResell(false);
        },
      }
    );

    // Close modal and reset
    setIsInsuranceModalOpen(false);
    setSelectedPurchaseType(null);
  };

  const isDisabled = disabled || isBuyingToResell;

  return (
    <>
      <Button
        variant="outline"
        className={`w-full bg-transparent dark:bg-transparent border-2 border-flyverr-secondary text-flyverr-secondary dark:text-flyverr-secondary hover:bg-flyverr-secondary hover:text-white dark:hover:bg-flyverr-secondary dark:hover:text-white py-4 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 ${isDisabled ? "opacity-60 cursor-not-allowed hover:translate-y-0" : ""}`}
        onClick={() => (requireReady ? requireReady(handleBuyToResell) : handleBuyToResell())}
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {isBuyingToResell ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-flyverr-secondary mr-2"></div>
            Buying...
          </div>
        ) : (
          <>
            <TrendingUp className="h-6 w-6 mr-3" />
            Buy to Resell
          </>
        )}
      </Button>

      {/* Insurance Modal */}
      {isInsuranceModalOpen && (
        <Modal size="sm">
          <div className="p-6">
            <div className="text-center mb-6">
              <Shield className="h-16 w-16 text-flyverr-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-flyverr-text dark:text-white mb-2">
                Resell Protection Insurance
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Protect your investment with our resell insurance. If the
                product doesn't sell, we'll refund your fee.
              </p>
            </div>

            <div className="bg-flyverr-accent/10 dark:bg-flyverr-accent/20 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-flyverr-text dark:text-white">
                  Base Price:
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ${product.current_price}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-flyverr-text dark:text-white">
                  Insurance Fee (5%):
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ${(product.current_price * 0.05).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-2">
                <span className="text-sm font-bold text-flyverr-text dark:text-white">
                  Total Price:
                </span>
                <span className="text-sm font-bold text-flyverr-accent">
                  ${(product.current_price * 1.05).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-flyverr-accent hover:bg-flyverr-accent/90 text-white py-3 font-semibold"
                onClick={() => handleInsuranceChoice(true)}
              >
                <Shield className="h-5 w-5 mr-2" />
                Yes, Add Insurance (+5%)
              </Button>

              <Button
                variant="outline"
                className="w-full text-flyverr-secondary hover:bg-flyverr-secondary hover:text-white py-3 font-semibold border border-flyverr-secondary dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-white"
                onClick={() => handleInsuranceChoice(false)}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                No Insurance, Proceed
              </Button>

              <Button
                variant="ghost"
                className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => {
                  setIsInsuranceModalOpen(false);
                  setSelectedPurchaseType(null);
                }}
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

// Wrap with HOC and pass the action handler
export default withStripeOnboarding(BuyToResellButton);
