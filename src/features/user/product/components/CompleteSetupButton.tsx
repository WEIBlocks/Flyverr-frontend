import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { usePurchaseProduct } from "../hooks/usePurchaseProduct";
import { Download } from "lucide-react";
import withStripeOnboarding from "./withStripeOnboarding";
import { cn } from "@/lib/utils";

interface BuyToUseButtonProps {
  requireReady?: (action: () => void) => void; // injected by HOC
  className?: string;
}

function CompleteSetupButton({ requireReady, className }: BuyToUseButtonProps) {
  const handleBuyToUse = () => {};

  return (
    <Button
      className={cn(
        "bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1 ",
        className
      )}
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
