import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Modal from "@/components/Modal";
import { useAddReviews } from "../hooks/useAddReviews";
import { swal } from "@/lib/utils";
import { ErrorResponse } from "@/lib/types";
import { createUserFriendlyError } from "@/lib/errorUtils";

interface AddReviewModalProps {
  productId: string;
  onSuccess?: () => void;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost";
  buttonClassName?: string;
  buttonText?: string;
  showIcon?: boolean;
}

export default function AddReviewModal({
  productId,
  onSuccess,
  buttonVariant = "outline",
  buttonClassName = "",
  buttonText = "Add Review",
  showIcon = true,
}: AddReviewModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const { mutate: addReview, isPending: isAddingReview } = useAddReviews();

  const handleReviewSubmit = () => {
    if (reviewRating === 0) {
      swal("Error", "Please select a rating", "error");
      return;
    }

    addReview(
      {
        productId,
        data: {
          rating: reviewRating,
          comment: reviewComment,
        },
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setReviewRating(0);
          setReviewComment("");
          swal("Success", "Review submitted successfully!", "success");
          onSuccess?.();
        },
        onError: (error: Error) => {
          swal("Error", createUserFriendlyError(error), "error");
          return;
        },
      }
    );
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setReviewRating(0);
    setReviewComment("");
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant={buttonVariant}
        className={buttonClassName}
        onClick={() => setIsModalOpen(true)}
      >
        {showIcon && <Star className="h-4 w-4 mr-2" />}
        {buttonText}
      </Button>

      {/* Review Modal */}
      {isModalOpen && (
        <Modal size="md">
          <div className="p-6">
            <div className="text-center mb-6">
              <Star className="h-16 w-16 text-flyverr-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-flyverr-text dark:text-white mb-2">
                Add Your Review
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Share your experience with this product
              </p>
            </div>

            {/* Rating Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-flyverr-text dark:text-white mb-3">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      reviewRating >= star
                        ? "text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                        : "text-gray-300 dark:text-gray-600 hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                    }`}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        reviewRating >= star ? "fill-current" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {reviewRating === 0
                    ? "Select a rating"
                    : reviewRating === 1
                    ? "Poor"
                    : reviewRating === 2
                    ? "Fair"
                    : reviewRating === 3
                    ? "Good"
                    : reviewRating === 4
                    ? "Very Good"
                    : "Excellent"}
                </span>
              </div>
            </div>

            {/* Comment Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-flyverr-text dark:text-white mb-3">
                Comment (Optional)
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-flyverr-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-flyverr-primary focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleModalClose}
                className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReviewSubmit}
                disabled={reviewRating === 0 || isAddingReview}
                className="flex-1 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingReview ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
