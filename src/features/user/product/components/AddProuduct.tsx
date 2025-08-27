import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import withStripeOnboarding from "./withStripeOnboarding";
import AddProductModal from "./AddProductModal";

interface AddProductButtonProps {
  requireReady?: (action: () => void) => void; // injected by HOC
}

function AddProductButton({ requireReady }: AddProductButtonProps) {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleAddProductClick = () => {
    setIsAddProductModalOpen(true);
  };

  return (
    <>
      <Button
        onClick={() =>
          requireReady
            ? requireReady(handleAddProductClick)
            : handleAddProductClick()
        }
        className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Product
      </Button>
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </>
  );
}

// Wrap with HOC and pass the action handler
export default withStripeOnboarding(AddProductButton );
