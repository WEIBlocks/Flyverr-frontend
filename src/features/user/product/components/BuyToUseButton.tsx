import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { usePurchaseProduct } from "../hooks/usePurchaseProduct";
import { Download } from "lucide-react";
import withStripeOnboarding from "./withStripeOnboarding";
import Modal from "@/components/Modal";
import { CreditCheckbox } from "@/components/CreditCheckbox";

interface BuyToUseButtonProps {
  requireReady?: (action: () => void) => void; // injected by HOC
  licenseId?: string;
  disabled?: boolean;
}

function BuyToUseButton({
  requireReady,
  licenseId,
  disabled = false,
}: BuyToUseButtonProps) {
  const params = useParams();
  const productId = params.id as string;
  const [isBuyingToUse, setIsBuyingToUse] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [useSignupCredit, setUseSignupCredit] = useState(false);
  const { mutate: purchaseProduct } = usePurchaseProduct();

  const handleBuyToUse = () => {
    if (disabled) return;
    console.log("Buy to Use clicked for product:", productId);
    if (licenseId) {
      console.log("Buy to Use - License ID:", licenseId);
    }
    setIsPurchaseModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    setIsBuyingToUse(true);

    const purchaseData: any = {
      purchaseType: "use",
      hasInsurance: false,
      paymentMethod: "stripe",
      useSignupCredit,
    };

    if (licenseId) {
      purchaseData.licenseId = licenseId;
    }

    const data = {
      id: productId,
      data: purchaseData,
    };

    purchaseProduct(data, {
      onSuccess: () => {
        setIsBuyingToUse(false);
        setIsPurchaseModalOpen(false);
      },
      onError: () => {
        setIsBuyingToUse(false);
      },
    });
  };

  const isDisabled = disabled || isBuyingToUse;

  return (
    <>
      <Button
        className={`w-full bg-flyverr-primary hover:bg-flyverr-primary/90 text-white py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 ${
          isDisabled ? "opacity-60 cursor-not-allowed hover:translate-y-0" : ""
        }`}
        onClick={() =>
          requireReady ? requireReady(handleBuyToUse) : handleBuyToUse()
        }
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {isBuyingToUse ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Buying...
          </div>
        ) : (
          <>
            <Download className="h-6 w-6 mr-3" />
            Buy to Use
          </>
        )}
      </Button>

      {/* Purchase Confirmation Modal */}
      {isPurchaseModalOpen && (
        <Modal size="sm">
          <div className="p-6">
            <div className="text-center mb-6">
              <Download className="h-16 w-16 text-flyverr-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-flyverr-text dark:text-white mb-2">
                Confirm Purchase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Review your purchase options before proceeding to payment.
              </p>
            </div>

            <div className="space-y-3">
              {/* Credit Checkbox */}
              <CreditCheckbox
                checked={useSignupCredit}
                onChange={setUseSignupCredit}
                disabled={isBuyingToUse}
              />

              <Button
                className="w-full bg-flyverr-primary hover:bg-flyverr-primary/90 text-white py-3 font-semibold"
                onClick={handleConfirmPurchase}
                disabled={isBuyingToUse}
              >
                <Download className="h-5 w-5 mr-2" />
                {isBuyingToUse ? "Processing..." : "Confirm Purchase"}
              </Button>

              <Button
                variant="ghost"
                className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => {
                  setIsPurchaseModalOpen(false);
                  setUseSignupCredit(false);
                }}
                disabled={isBuyingToUse}
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
export default withStripeOnboarding(BuyToUseButton);
