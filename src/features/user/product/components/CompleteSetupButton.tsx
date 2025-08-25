import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { usePurchaseProduct } from "../hooks/usePurchaseProduct";
import { Download } from "lucide-react";
import withStripeOnboarding from "./withStripeOnboarding";

interface BuyToUseButtonProps {
  requireReady?: (action: () => void) => void; // injected by HOC
}

function CompleteSetupButton({ requireReady }: BuyToUseButtonProps) {
  const handleBuyToUse = () => {};

  return (
    <Button
      className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1"
      onClick={() =>
        requireReady ? requireReady(handleBuyToUse) : handleBuyToUse()
      }
    >
      Complete Setup
    </Button>
  );
}

// Wrap with HOC and pass the action handler
export default withStripeOnboarding(CompleteSetupButton);
