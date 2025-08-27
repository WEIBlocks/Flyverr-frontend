"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import Modal from "@/components/Modal";
import { ReviewActionModalProps, ReviewActionData } from "../reviews.types";

export const ReviewActionModal: React.FC<ReviewActionModalProps> = ({
  isOpen,
  onClose,
  review,
  action,
  onSubmit,
  isSubmitting,
}) => {
  const [adminNotes, setAdminNotes] = useState("");
  const [editedComment, setEditedComment] = useState("");

  // Reset form when modal opens with new review
  useEffect(() => {
    if (isOpen && review) {
      setAdminNotes("");
      setEditedComment(review.comment || "");
    }
  }, [isOpen, review]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: ReviewActionData = {
      approved: action === "approve",
      adminNotes: adminNotes.trim() || undefined,
      editedComment: editedComment.trim() || undefined,
    };
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 md:p-8">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">
            {action === "approve" ? "Approve Review" : "Reject Review"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Review Info */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Review by {review?.user?.username}
              </p>
              <p className="text-xs sm:text-sm font-medium">{review?.product?.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs sm:text-sm">{review?.rating}</span>
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
              </div>
            </div>

            {/* Admin Notes */}
            <div>
              <Label htmlFor="adminNotes" className="text-xs sm:text-sm font-medium">
                Admin Notes{" "}
                {action === "reject" && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                id="adminNotes"
                placeholder={
                  action === "reject"
                    ? "Please provide a reason for rejection..."
                    : "Optional notes..."
                }
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="mt-1 text-xs sm:text-sm"
                rows={3}
                required={action === "reject"}
              />
            </div>

            {/* Edit Comment */}
            <div>
              <Label htmlFor="editedComment" className="text-xs sm:text-sm font-medium">
                Edit Comment (Optional)
              </Label>
              <Textarea
                id="editedComment"
                placeholder="Edit the review comment if needed..."
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="mt-1 text-xs sm:text-sm"
                rows={3}
              />
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                Original: {review?.comment || "No comment"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 text-xs sm:text-sm px-3 py-2"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`flex-1 text-xs sm:text-sm px-3 py-2 ${
                  action === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? action === "approve"
                    ? "Approving..."
                    : "Rejecting..."
                  : action === "approve"
                  ? "Approve"
                  : "Reject"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewActionModal;
