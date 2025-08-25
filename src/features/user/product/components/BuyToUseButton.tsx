import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { usePurchaseProduct } from "../hooks/usePurchaseProduct";
import { Download } from "lucide-react";
import withStripeOnboarding from "./withStripeOnboarding";

interface BuyToUseButtonProps {
  requireReady?: (action: () => void) => void; // injected by HOC
  licenseId?: string;
}

function BuyToUseButton({ requireReady, licenseId }: BuyToUseButtonProps) {
  const params = useParams();
  const productId = params.id as string;
  const [isBuyingToUse, setIsBuyingToUse] = useState(false);
  const { mutate: purchaseProduct } = usePurchaseProduct();

  const handleBuyToUse = () => {
    console.log("Buy to Use clicked for product:", productId);
    if (licenseId) {
      console.log("Buy to Use - License ID:", licenseId);
    }
    setIsBuyingToUse(true);

    const purchaseData: any = {
      purchaseType: "use",
      hasInsurance: false,
      paymentMethod: "stripe",
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
      },
      onError: () => {
        setIsBuyingToUse(false);
      },
    });
  };

  return (
    <Button
      className="w-full bg-flyverr-primary hover:bg-flyverr-primary/90 text-white py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
      onClick={() =>
        requireReady ? requireReady(handleBuyToUse) : handleBuyToUse()
      }
      disabled={isBuyingToUse}
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
  );
}

// Wrap with HOC and pass the action handler
export default withStripeOnboarding(BuyToUseButton);
