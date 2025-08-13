"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductEditRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  useEffect(() => {
    // Redirect to the main product page which is now an edit form
    router.replace(`/user/products/${productId}`);
  }, [productId, router]);

  return (
    <div className="p-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-flyverr-primary mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Redirecting to edit page...</p>
      </div>
    </div>
  );
}
