import React from "react";
import { useUserCredits } from "@/features/auth/hooks/useUserCredits";

interface CreditCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function CreditCheckbox({
  checked,
  onChange,
  disabled = false,
}: CreditCheckboxProps) {
  const { data: credits, isLoading, error } = useUserCredits();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="w-4 h-4 border-2 border-gray-300 rounded animate-pulse"></div>
        <span className="text-sm">Loading credit information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-sm text-red-600">
          Error loading credit information
        </div>
      </div>
    );
  }

  if (!credits) {
    return null; // Don't show if no credit data
  }

  // Don't show if user has already used credit or has no credits
  if (credits.has_used_credit || credits.available_credits <= 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
      <input
        type="checkbox"
        id="useCredit"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
      />
      <label
        htmlFor="useCredit"
        className="text-sm font-medium text-green-800 cursor-pointer"
      >
        Use ${credits.available_credits} signup credit
      </label>
      <div className="text-xs text-green-600">
        Save ${credits.available_credits} on this purchase
      </div>
    </div>
  );
}
