"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle, X } from "lucide-react";
import CompleteSetupButton from "./CompleteSetupButton";
import Modal from "../Modal";

interface StripeOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StripeOnboardingModal({
  isOpen,
  onClose,
}: StripeOnboardingModalProps) {
  const handleOnboardingSuccess = () => {
    // Close the modal after successful onboarding initiation
    onClose();
  };

  const handleOnboardingError = (error: any) => {
    console.error("Failed to initiate Stripe onboarding:", error);
    // You can show error toast here if needed
  };

  if (!isOpen) return null;

  return (
    <Modal>
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
            onClick={onClose}
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
                To create and sell products on Flyverr, you need to complete
                your Stripe account setup. This includes verifying your identity
                and connecting your bank account.
              </p>
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
            <h3 className="font-medium text-blue-800 dark:text-amber-200 mb-2">
              What happens next:
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• You'll be redirected to Stripe's secure onboarding</li>
              <li>• Complete your account setup (takes 5-10 minutes)</li>
              <li>• Return to Flyverr to start selling products</li>
              <li>• Your account will be automatically verified</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
          >
            Cancel
          </Button>

          <CompleteSetupButton className="bg-amber-600 hover:bg-amber-700 text-white">
            Complete Setup
          </CompleteSetupButton>
        </div>
      </div>
    </Modal>
  );
}
